"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const child_process_1 = require("child_process");
const editor_selections_1 = require("./editor_selections");
const line_transformer_1 = require("./line_transformer");
const vscode_2 = require("vscode");
const os = require("os");
const applyTransformations = (selections) => {
    const editor = vscode_1.window.activeTextEditor;
    const editorSelections = (editor === null || editor === void 0 ? void 0 : editor.selections) || [];
    let replaceRange;
    if (!vscode_1.window.activeTextEditor) {
        return Promise.reject("There is no active editor");
    }
    return vscode_1.window.activeTextEditor
        .edit(function (editBuilder) {
        selections.forEach(function (selectionGroup) {
            selectionGroup.forEach(function (line) {
                if (!line.transformedText) {
                    return;
                }
                replaceRange = new vscode_1.Range(line.number, 0, line.number, line.length);
                editBuilder.replace(replaceRange, line.transformedText);
            });
        });
    })
        .then(() => {
        if (!editor) {
            return;
        }
        editor.selections = editorSelections;
    }, () => { });
};
const callExecutable = (args) => {
    var _a;
    const command = SeeingIsBelieving.command;
    const proc = child_process_1.spawn(command, args, { shell: /^win/.test(os.platform()) });
    const editor = vscode_1.window.activeTextEditor;
    const text = (_a = editor === null || editor === void 0 ? void 0 : editor.document) === null || _a === void 0 ? void 0 : _a.getText();
    const editorSelections = editor === null || editor === void 0 ? void 0 : editor.selections;
    let stdout = "";
    let stderr = "";
    if (!editor) {
        return Promise.resolve();
    }
    return new Promise((res, rej) => {
        proc.on("error", () => {
            vscode_1.window.showErrorMessage(`Command '${command}' does not exist. Is it installed?`);
            rej(`Command '${command}' does not exist. Is it installed?`);
        });
        proc.stdout.on("data", data => {
            stdout += data;
        });
        proc.stderr.on("data", data => {
            stderr += data;
        });
        proc.on("close", () => {
            if (stderr) {
                vscode_1.window.showErrorMessage(`Seeing is Believing encountered an error: ${stderr}`);
                if (configuration("halt-run-on-error")) {
                    rej(`Seeing is Believing encountered an error: ${stderr}`);
                    return;
                }
            }
            if (!text) {
                return Promise.resolve();
            }
            const textLines = text.split(/\r?\n/);
            const textLinesCount = textLines.length;
            const lastLineLength = textLines[textLinesCount - 1].length;
            return editor
                .edit(builder => {
                builder.replace(new vscode_1.Range(0, 0, textLinesCount, lastLineLength), stdout);
            })
                .then(() => {
                if (editorSelections) {
                    editor.selections = editorSelections;
                }
            }, () => { })
                .then(result => res(result), error => rej(error));
        });
        proc.stdin.write(text);
        proc.stdin.end();
    });
};
const configuration = (key) => vscode_2.workspace.getConfiguration("seeing-is-believing").get(key);
const SeeingIsBelieving = {
    command: "seeing_is_believing",
    args: function (command) {
        switch (command) {
            case "run":
                let argList = [
                    "--alignment-strategy",
                    "chunk",
                    "--number-of-captures",
                    "300",
                    "--line-length",
                    "1000",
                    "--timeout",
                    "12",
                    "--local-cwd",
                    "--ignore-unknown-flags"
                ];
                if (this.anyLinesAreMarked() ||
                    !configuration("annotate-all-if-none-are-marked")) {
                    argList.push("--xmpfilter-style");
                }
                if (this.documentFileName()) {
                    if (/^win/.test(os.platform())) {
                        // If the OS is windows, the command gets piped to a shell. When
                        // that happens we need to wrap the path in double quotes to
                        // preserve proper handling of spaces.
                        argList.push("--as", `"${this.documentFileName()}"`);
                    }
                    else {
                        argList.push("--as", this.documentFileName() || "");
                    }
                }
                return argList;
            case "clean":
                return ["--timeout", "12", "--clean"];
            default:
                return [];
        }
    },
    run: function () {
        return callExecutable(this.args("run"));
    },
    clean: function () {
        if (this.textIsSelected()) {
            const selections = this.getCurrentSelections();
            selections.forEach(function (selectionGroup) {
                selectionGroup.forEach(function (line) {
                    const transformer = line_transformer_1.default(line, "remove_mark");
                    transformer.transform();
                });
            });
            return applyTransformations(selections);
        }
        else {
            return callExecutable(this.args("clean"));
        }
    },
    getCurrentSelections: function () {
        if (!vscode_1.window.activeTextEditor) {
            return [];
        }
        return editor_selections_1.default(vscode_1.window.activeTextEditor).get();
    },
    textIsSelected: function () {
        if (!vscode_1.window.activeTextEditor) {
            return false;
        }
        const selections = vscode_1.window.activeTextEditor.selections;
        return (selections.length > 1 || selections[0].start.isBefore(selections[0].end));
    },
    anyLinesAreMarked: function () {
        if (!vscode_1.window.activeTextEditor) {
            return false;
        }
        const text = vscode_1.window.activeTextEditor.document.getText();
        return text.match(line_transformer_1.default.markText);
    },
    documentHasFileName: function () {
        var _a, _b;
        return !((_b = (_a = vscode_1.window === null || vscode_1.window === void 0 ? void 0 : vscode_1.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.document) === null || _b === void 0 ? void 0 : _b.isUntitled);
    },
    documentFileName: function () {
        var _a, _b;
        return this.documentHasFileName()
            ? (_b = (_a = vscode_1.window === null || vscode_1.window === void 0 ? void 0 : vscode_1.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.document) === null || _b === void 0 ? void 0 : _b.fileName : null;
    },
    toggleMarks: function () {
        const selections = this.getCurrentSelections();
        const addingMark = !selections.annotated;
        selections.forEach(function (selectionGroup) {
            selectionGroup.forEach(function (line) {
                const transformer = line_transformer_1.default(line, addingMark ? "add_mark" : "remove_mark");
                transformer.transform();
            });
        });
        return applyTransformations(selections);
    }
};
exports.default = SeeingIsBelieving;
//# sourceMappingURL=seeing_is_believing.js.map