"use strict";
/* global describe, beforeEach, afterEach, it, context */
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const chai_1 = require("chai");
const sinon = require("sinon");
const path = require("path");
require("../../extension");
const seeing_is_believing_1 = require("../../lib/seeing_is_believing");
function sampleFileUri(fileName) {
    return vscode_1.Uri.file(path.join(__dirname, "..", "..", "..", "src", "test", "samples", fileName));
}
function openFile(fileName, doneCallback) {
    return vscode_1.workspace.openTextDocument(sampleFileUri(fileName)).then(function (doc) {
        return vscode_1.window.showTextDocument(doc).then(() => {
            return vscode_1.commands.executeCommand("cursorTop");
        }, () => doneCallback(new Error("Unable to show document")));
    }, function () {
        return doneCallback(new Error("Unable to open " + fileName));
    });
}
function getActiveDocument() {
    var _a;
    const document = (_a = vscode_1.window === null || vscode_1.window === void 0 ? void 0 : vscode_1.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.document;
    if (!document) {
        throw new Error("document is undefined");
    }
    return document;
}
describe("Integration tests", function () {
    afterEach(function (done) {
        vscode_1.commands.executeCommand("workbench.action.closeActiveEditor").then(function () {
            setTimeout(done, 100); // We get failures if we don't allow a little time after closing
        }, function () {
            done(new Error("Failed to close active editor"));
        });
    });
    describe("commands", function () {
        it("work in ruby files", function (done) {
            const spy = sinon.spy(vscode_1.window, "showErrorMessage");
            openFile("sample.rb", done).then(function () {
                vscode_1.commands.executeCommand("seeing-is-believing.toggle-marks").then(function () {
                    chai_1.expect(spy.notCalled).to.equal(true);
                    spy.restore();
                    done();
                }, function () {
                    spy.restore();
                    done(new Error("Failed to execute command"));
                });
            }, function () {
                spy.restore();
                done(new Error("Failed to open file"));
            });
        });
        const extensionCommands = ["toggle-marks", "clean", "run"];
        extensionCommands.forEach(function (command) {
            it(`won't run seeing-is-believing.${command} in other files`, function (done) {
                openFile("sample.js", done).then(function () {
                    vscode_1.commands.executeCommand(`seeing-is-believing.${command}`).then(function () {
                        done("Should have failed to execute command");
                    }, function (error) {
                        chai_1.expect(error).to.equal("Seeing is Believing can only process Ruby files");
                        done();
                    });
                }, function () {
                    done(new Error("Failed to open file"));
                });
            });
        });
    });
    describe("annotations", function () {
        describe("adding", function () {
            beforeEach(function (done) {
                openFile("sample.rb", done).then(function () {
                    done();
                }, function () {
                    done(new Error("Failed to open file"));
                });
            });
            it("adds the annotation mark to the current line", function (done) {
                const document = getActiveDocument();
                vscode_1.commands.executeCommand("seeing-is-believing.toggle-marks").then(function () {
                    chai_1.expect(document.lineAt(0).text).to.equal('first_name = "Jordan"  # =>');
                    done();
                }, function () {
                    done(new Error("Failed to execute command"));
                });
            });
            context("some lines are annotated", function () {
                it("adds the annotation mark to unmarked lines in the same selection group", function (done) {
                    const document = getActiveDocument();
                    vscode_1.commands.executeCommand("cursorTop").then(function () {
                        vscode_1.commands.executeCommand("cursorDown").then(function () {
                            vscode_1.commands.executeCommand("cursorDown").then(function () {
                                vscode_1.commands
                                    .executeCommand("seeing-is-believing.toggle-marks")
                                    .then(function () {
                                    chai_1.expect(document.lineAt(0).text).to.equal('first_name = "Jordan"');
                                    chai_1.expect(document.lineAt(1).text).to.equal('last_name = "Simone"');
                                    chai_1.expect(document.lineAt(2).text).to.equal('dob = "1/23/80"  # =>');
                                    vscode_1.commands.executeCommand("cursorUpSelect").then(function () {
                                        vscode_1.commands.executeCommand("cursorUpSelect").then(function () {
                                            vscode_1.commands
                                                .executeCommand("seeing-is-believing.toggle-marks")
                                                .then(function () {
                                                chai_1.expect(document.lineAt(0).text).to.equal('first_name = "Jordan"  # =>');
                                                chai_1.expect(document.lineAt(1).text).to.equal('last_name = "Simone"   # =>');
                                                chai_1.expect(document.lineAt(2).text).to.equal('dob = "1/23/80"        # =>');
                                                done();
                                            }, function () {
                                                done(new Error("Failed to execute command"));
                                            });
                                        }, function () {
                                            done(new Error("Failed to execute command"));
                                        });
                                    }, function () {
                                        done(new Error("Failed to execute command"));
                                    });
                                }, function () {
                                    done(new Error("Failed to execute command"));
                                });
                            }, function () {
                                done(new Error("Failed to execute command"));
                            });
                        }, function () {
                            done(new Error("Failed to execute command"));
                        });
                    }, function () {
                        done(new Error("Failed to execute command"));
                    });
                });
                it("adds the annotation mark to unmarked lines in the other selection groups", function (done) {
                    const document = getActiveDocument();
                    vscode_1.commands.executeCommand("cursorTop").then(function () {
                        vscode_1.commands.executeCommand("seeing-is-believing.toggle-marks").then(function () {
                            chai_1.expect(document.lineAt(0).text).to.equal('first_name = "Jordan"  # =>');
                            chai_1.expect(document.lineAt(1).text).to.equal('last_name = "Simone"');
                            chai_1.expect(document.lineAt(2).text).to.equal('dob = "1/23/80"');
                            vscode_1.commands
                                .executeCommand("editor.action.insertCursorBelow")
                                .then(function () {
                                vscode_1.commands.executeCommand("cursorRightSelect").then(function () {
                                    vscode_1.commands
                                        .executeCommand("seeing-is-believing.toggle-marks")
                                        .then(function () {
                                        chai_1.expect(document.lineAt(0).text).to.equal('first_name = "Jordan"  # =>');
                                        chai_1.expect(document.lineAt(1).text).to.equal('last_name = "Simone"  # =>');
                                        done();
                                    }, function () {
                                        done(new Error("Failed to execute command"));
                                    });
                                }, function () {
                                    done(new Error("Failed to execute command"));
                                });
                            }, function () {
                                done(new Error("Failed to execute command"));
                            });
                        }, function () {
                            done(new Error("Failed to execute command"));
                        });
                    }, function () {
                        done(new Error("Failed to execute command"));
                    });
                });
            });
            context("adds the annotation mark to multiple lines", function () {
                it("aligns marks in the same selection group", function (done) {
                    const document = getActiveDocument();
                    vscode_1.commands.executeCommand("cursorTop").then(function () {
                        vscode_1.commands.executeCommand("cursorDownSelect").then(function () {
                            vscode_1.commands.executeCommand("cursorDownSelect").then(function () {
                                vscode_1.commands
                                    .executeCommand("seeing-is-believing.toggle-marks")
                                    .then(function () {
                                    chai_1.expect(document.lineAt(0).text).to.equal('first_name = "Jordan"  # =>');
                                    chai_1.expect(document.lineAt(1).text).to.equal('last_name = "Simone"   # =>');
                                    chai_1.expect(document.lineAt(2).text).to.equal('dob = "1/23/80"        # =>');
                                    done();
                                }, function () {
                                    done(new Error("Failed to execute command"));
                                });
                            }, function () {
                                done(new Error("Failed to execute command"));
                            });
                        }, function () {
                            done(new Error("Failed to execute command"));
                        });
                    }, function () {
                        done(new Error("Failed to execute command"));
                    });
                });
                it("does not align different selection groups", function (done) {
                    const document = getActiveDocument();
                    vscode_1.commands.executeCommand("cursorTop").then(function () {
                        vscode_1.commands.executeCommand("editor.action.insertCursorBelow").then(function () {
                            vscode_1.commands
                                .executeCommand("editor.action.insertCursorBelow")
                                .then(function () {
                                vscode_1.commands
                                    .executeCommand("seeing-is-believing.toggle-marks")
                                    .then(function () {
                                    chai_1.expect(document.lineAt(0).text).to.equal('first_name = "Jordan"  # =>');
                                    chai_1.expect(document.lineAt(1).text).to.equal('last_name = "Simone"  # =>');
                                    chai_1.expect(document.lineAt(2).text).to.equal('dob = "1/23/80"  # =>');
                                    done();
                                }, function () {
                                    done(new Error("Failed to execute command"));
                                });
                            }, function () {
                                done(new Error("Failed to execute command"));
                            });
                        }, function () {
                            done(new Error("Failed to execute command"));
                        });
                    }, function () {
                        done(new Error("Failed to execute command"));
                    });
                });
            });
        });
        describe("removing", function () {
            beforeEach(function (done) {
                openFile("sample-marked.rb", done).then(function () {
                    done();
                }, function () {
                    done(new Error("Failed to open file"));
                });
            });
            it("removes the annotation from the current line", function (done) {
                const document = getActiveDocument();
                vscode_1.commands.executeCommand("cursorTop").then(function () {
                    vscode_1.commands.executeCommand("seeing-is-believing.toggle-marks").then(function () {
                        chai_1.expect(document.lineAt(0).text).to.equal('first_name = "Jordan"');
                        done();
                    }, function () {
                        done(new Error("Failed to execute command"));
                    });
                }, function () {
                    done(new Error("Failed to execute command"));
                });
            });
            it("removes the annotation from multiple lines", function (done) {
                const document = getActiveDocument();
                vscode_1.commands.executeCommand("cursorTop").then(function () {
                    vscode_1.commands.executeCommand("editor.action.insertCursorBelow").then(function () {
                        vscode_1.commands
                            .executeCommand("seeing-is-believing.toggle-marks")
                            .then(function () {
                            chai_1.expect(document.lineAt(0).text).to.equal('first_name = "Jordan"');
                            chai_1.expect(document.lineAt(1).text).to.equal('last_name = "Simone"');
                            done();
                        }, function () {
                            done(new Error("Failed to execute command"));
                        });
                    }, function () {
                        done(new Error("Failed to execute command"));
                    });
                }, function () {
                    done(new Error("Failed to execute command"));
                });
            });
        });
    });
    describe("require relative files", function () {
        beforeEach(function (done) {
            openFile("requirer.rb", done).then(function () {
                done();
            }, function () {
                done(new Error("Failed to open file"));
            });
        });
        it("works properly", function (done) {
            const firstLine = () => getActiveDocument()
                .getText()
                .split(/\r?\n/)[0];
            chai_1.expect(firstLine()).to.eq("require_relative 'requiree'");
            vscode_1.commands.executeCommand("seeing-is-believing.run").then(function () {
                chai_1.expect(firstLine()).to.eq("require_relative 'requiree'  # => true");
                done();
            }, function () {
                done(new Error("Failed to execute command"));
            });
        });
    });
    describe("run and clean", function () {
        beforeEach(function (done) {
            openFile("sample.rb", done).then(function () {
                done();
            }, function () {
                done(new Error("Failed to open file"));
            });
        });
        it("displays an error if the executable is unavailable", function (done) {
            const spy = sinon.spy(vscode_1.window, "showErrorMessage");
            const cachedCommand = seeing_is_believing_1.default.command;
            seeing_is_believing_1.default.command = "fake_command";
            vscode_1.commands.executeCommand("seeing-is-believing.run").then(function () {
                spy.restore();
                seeing_is_believing_1.default.command = cachedCommand;
                done(new Error("Should have failed to execute command"));
            }, function () {
                chai_1.expect(spy.calledWith(`Command 'fake_command' does not exist. Is it installed?`)).to.equal(true);
                spy.restore();
                seeing_is_believing_1.default.command = cachedCommand;
                done();
            });
        });
        it("updates the document text and then cleans it", function (done) {
            const lines = () => getActiveDocument()
                .getText()
                .split(/\r?\n/);
            const linesWithText = () => lines().filter(line => line.trim() !== "");
            const lastLineWithText = () => linesWithText()[linesWithText().length - 1];
            chai_1.expect(lastLineWithText()).to.eq('puts "My name is #{first_name} and I was born #{dob}"');
            vscode_1.commands.executeCommand("seeing-is-believing.run").then(function () {
                chai_1.expect(lastLineWithText()).to.eq("# >> My name is Jordan and I was born 1/23/80");
                vscode_1.commands.executeCommand("seeing-is-believing.clean").then(function () {
                    chai_1.expect(lastLineWithText()).to.eq('puts "My name is #{first_name} and I was born #{dob}"');
                    done();
                }, function () {
                    done(new Error("Failed to execute command"));
                });
            }, function () {
                done(new Error("Failed to execute command"));
            });
        });
        context("xmpfilter-style is disabled if none marked", function () {
            it("annotates the whole document if no lines are marked", function (done) {
                const document = getActiveDocument();
                const stub = sinon.stub(vscode_1.workspace, "getConfiguration");
                // @ts-ignore
                stub.withArgs("seeing-is-believing").returns({
                    get(key) {
                        if (key === "annotate-all-if-none-are-marked") {
                            return true;
                        }
                        else {
                            throw new Error("Wrong key was attempted to be retrieved");
                        }
                    }
                });
                vscode_1.commands.executeCommand("seeing-is-believing.run").then(function () {
                    chai_1.expect(document.lineAt(0).text).to.eq('first_name = "Jordan"  # => "Jordan"');
                    chai_1.expect(document.lineAt(1).text).to.eq('last_name = "Simone"   # => "Simone"');
                    chai_1.expect(document.lineAt(2).text).to.eq('dob = "1/23/80"        # => "1/23/80"');
                    chai_1.expect(document.lineAt(3).text).to.eq("");
                    chai_1.expect(document.lineAt(4).text).to.eq('puts "My name is #{first_name} and I was born #{dob}"  # => nil');
                    chai_1.expect(document.lineAt(5).text).to.eq("");
                    chai_1.expect(document.lineAt(6).text).to.eq("# >> My name is Jordan and I was born 1/23/80");
                    stub.restore();
                    done();
                }, function () {
                    stub.restore();
                    done(new Error("Failed to execute command"));
                });
            });
            it("only annotates marked lines if any are marked", function (done) {
                const document = getActiveDocument();
                const stub = sinon.stub(vscode_1.workspace, "getConfiguration");
                // @ts-ignore
                stub.withArgs("seeing-is-believing").returns({
                    get: function (key) {
                        if (key === "annotate-all-if-none-are-marked") {
                            return true;
                        }
                        else {
                            done(new Error("Wrong key was attempted to be retrieved"));
                        }
                    }
                });
                vscode_1.commands.executeCommand("cursorTop").then(function () {
                    vscode_1.commands.executeCommand("cursorDownSelect").then(function () {
                        vscode_1.commands
                            .executeCommand("seeing-is-believing.toggle-marks")
                            .then(function () {
                            vscode_1.commands.executeCommand("seeing-is-believing.run").then(function () {
                                chai_1.expect(document.lineAt(0).text).to.eq('first_name = "Jordan"  # => "Jordan"');
                                chai_1.expect(document.lineAt(1).text).to.eq('last_name = "Simone"   # => "Simone"');
                                chai_1.expect(document.lineAt(2).text).to.eq('dob = "1/23/80"');
                                chai_1.expect(document.lineAt(3).text).to.eq("");
                                chai_1.expect(document.lineAt(4).text).to.eq('puts "My name is #{first_name} and I was born #{dob}"');
                                chai_1.expect(document.lineAt(5).text).to.eq("");
                                chai_1.expect(document.lineAt(6).text).to.eq("# >> My name is Jordan and I was born 1/23/80");
                                stub.restore();
                                done();
                            }, function () {
                                stub.restore();
                                done(new Error("Failed to execute command"));
                            });
                        }, function () {
                            stub.restore();
                            done(new Error("Failed to execute command"));
                        });
                    }, function () {
                        stub.restore();
                        done(new Error("Failed to execute command"));
                    });
                }, function () {
                    stub.restore();
                    done(new Error("Failed to execute command"));
                });
            });
        });
        it("cleans selected lines", function (done) {
            const document = getActiveDocument();
            vscode_1.commands.executeCommand("cursorTop").then(function () {
                vscode_1.commands.executeCommand("cursorDownSelect").then(function () {
                    vscode_1.commands.executeCommand("cursorDownSelect").then(function () {
                        vscode_1.commands
                            .executeCommand("seeing-is-believing.toggle-marks")
                            .then(function () {
                            chai_1.expect(document.lineAt(0).text).to.equal('first_name = "Jordan"  # =>');
                            chai_1.expect(document.lineAt(1).text).to.equal('last_name = "Simone"   # =>');
                            chai_1.expect(document.lineAt(2).text).to.equal('dob = "1/23/80"        # =>');
                            vscode_1.commands.executeCommand("cursorTop").then(function () {
                                vscode_1.commands.executeCommand("cursorDownSelect").then(function () {
                                    vscode_1.commands
                                        .executeCommand("seeing-is-believing.clean")
                                        .then(function () {
                                        chai_1.expect(document.lineAt(0).text).to.equal('first_name = "Jordan"');
                                        chai_1.expect(document.lineAt(1).text).to.equal('last_name = "Simone"');
                                        chai_1.expect(document.lineAt(2).text).to.equal('dob = "1/23/80"        # =>');
                                        done();
                                    }, function () {
                                        done(new Error("Failed to execute command"));
                                    });
                                }, function () {
                                    done(new Error("Failed to execute command"));
                                });
                            }, function () {
                                done(new Error("Failed to execute command"));
                            });
                        }, function () {
                            done(new Error("Failed to execute command"));
                        });
                    }, function () {
                        done(new Error("Failed to execute command"));
                    });
                }, function () {
                    done(new Error("Failed to execute command"));
                });
            }, function () {
                done(new Error("Failed to execute command"));
            });
        });
    });
});
//# sourceMappingURL=extension.test.js.map