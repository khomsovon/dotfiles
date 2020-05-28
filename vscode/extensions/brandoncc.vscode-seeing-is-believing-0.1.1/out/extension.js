"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode_1 = require("vscode");
const seeing_is_believing_1 = require("./lib/seeing_is_believing");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    const verifyRuby = function () {
        const activeEditor = vscode_1.window.activeTextEditor;
        if (!activeEditor) {
            return;
        }
        return activeEditor.document.languageId === "ruby";
    };
    const disposableToggleMarks = vscode_1.commands.registerCommand("seeing-is-believing.toggle-marks", function () {
        if (!verifyRuby()) {
            return new Promise((_, rej) => rej("Seeing is Believing can only process Ruby files"));
        }
        return seeing_is_believing_1.default.toggleMarks();
    });
    const disposableRun = vscode_1.commands.registerCommand("seeing-is-believing.run", function () {
        if (!verifyRuby()) {
            return new Promise((_, rej) => rej("Seeing is Believing can only process Ruby files"));
        }
        return seeing_is_believing_1.default.run();
    });
    const disposableClean = vscode_1.commands.registerCommand("seeing-is-believing.clean", function () {
        if (!verifyRuby()) {
            return new Promise((_, rej) => rej("Seeing is Believing can only process Ruby files"));
        }
        return seeing_is_believing_1.default.clean();
    });
    context.subscriptions.push(disposableToggleMarks);
    context.subscriptions.push(disposableRun);
    context.subscriptions.push(disposableClean);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map