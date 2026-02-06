"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.openInEditorFlow = void 0;
const node_path_1 = __importDefault(require("node:path"));
const log_1 = require("./log");
const open_in_editor_1 = require("./open-in-editor");
const prompts_1 = __importDefault(require("./prompts"));
const openInEditorFlow = async (projectRoot) => {
    const editors = await (0, open_in_editor_1.guessEditor)();
    const [guiEditor] = editors.filter((e) => !(0, open_in_editor_1.isTerminalEditor)(e.command));
    if (!guiEditor) {
        return;
    }
    const displayName = (0, open_in_editor_1.getDisplayNameForEditor)(guiEditor.command);
    const { answer } = await (0, prompts_1.default)({
        message: `💻 Open in ${displayName}?`,
        initial: true,
        type: 'toggle',
        name: 'answer',
        active: 'Yes',
        inactive: 'No',
    });
    if (answer) {
        await (0, open_in_editor_1.launchEditor)({
            colNumber: 1,
            editor: guiEditor,
            fileName: projectRoot,
            vsCodeNewWindow: true,
            lineNumber: 1,
        });
        if ((0, open_in_editor_1.isVsCodeDerivative)(guiEditor.command)) {
            await new Promise((resolve) => {
                setTimeout(resolve, 1000);
            });
            await (0, open_in_editor_1.launchEditor)({
                colNumber: 1,
                editor: guiEditor,
                fileName: node_path_1.default.join(projectRoot, 'README.md'),
                vsCodeNewWindow: false,
                lineNumber: 1,
            });
        }
    }
    log_1.Log.info();
};
exports.openInEditorFlow = openInEditorFlow;
