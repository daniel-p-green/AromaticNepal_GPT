"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveProjectRoot = void 0;
const chalk_1 = __importDefault(require("chalk"));
const node_fs_1 = __importDefault(require("node:fs"));
const promises_1 = require("node:fs/promises");
const node_os_1 = require("node:os");
const node_path_1 = __importDefault(require("node:path"));
const log_1 = require("./log");
const mkdirp_1 = require("./mkdirp");
const prompts_1 = __importDefault(require("./prompts"));
const select_template_1 = require("./select-template");
const validate_name_1 = require("./validate-name");
function assertValidName(folderName) {
    const validation = (0, validate_name_1.validateName)(folderName);
    if (typeof validation === 'string') {
        throw new Error(`Cannot create an app named ${chalk_1.default.red(`"${folderName}"`)}. ${validation}`);
    }
}
function assertFolderEmptyAsync(projectRoot) {
    const conflicts = node_fs_1.default
        .readdirSync(projectRoot)
        .filter((file) => !/\.iml$/.test(file));
    if (conflicts.length > 0) {
        log_1.Log.newLine();
        log_1.Log.error(`Something already exists at "${projectRoot}"`);
        log_1.Log.error('Try using a new directory name, or moving these files.');
        log_1.Log.newLine();
        return { exists: true };
    }
    return { exists: false };
}
const resolveProjectRoot = async (options) => {
    if ((0, select_template_1.isTmpFlagSelected)()) {
        log_1.Log.info('Creating the video in a temporary directory.');
        const randomName = `remotion-video-${Math.random().toString(36).slice(2)}`;
        const randomRoot = node_path_1.default.join((0, node_os_1.tmpdir)(), randomName);
        (0, mkdirp_1.mkdirp)(randomRoot);
        return { projectRoot: randomRoot, folderName: randomName };
    }
    let projectName = '';
    let directlyCreateInCurrentDir = false;
    // If a directory argument was provided, use it directly
    if (options === null || options === void 0 ? void 0 : options.directoryArgument) {
        projectName = options.directoryArgument;
    }
    else {
        // Print selected template info before prompting for directory
        if ((options === null || options === void 0 ? void 0 : options.selectedTemplate) && select_template_1.isFlagSelected) {
            log_1.Log.info(`Selected template: ${chalk_1.default.blue(options.selectedTemplate.shortName)}`);
        }
        try {
            const currentMs = Date.now();
            const hour = 60 * 60 * 1000;
            const dirCreateMs = (await (0, promises_1.stat)(process.cwd())).ctimeMs;
            const fileList = await (0, promises_1.readdir)(process.cwd());
            const fileCount = fileList.filter((f) => !f.startsWith('.')).length;
            if (fileCount === 0 && currentMs - dirCreateMs < hour) {
                // User seems to have created a new directory which is empty, and cd'd into it. Let's create the project here!
                directlyCreateInCurrentDir = true;
            }
            if (directlyCreateInCurrentDir) {
                projectName = process.cwd();
            }
            else {
                const { answer } = await (0, prompts_1.default)({
                    type: 'text',
                    name: 'answer',
                    message: 'Directory to create your project',
                    initial: 'my-video',
                    validate: (name) => {
                        const validation = (0, validate_name_1.validateName)(node_path_1.default.basename(node_path_1.default.resolve(name)));
                        if (typeof validation === 'string') {
                            return 'Invalid project name: ' + validation;
                        }
                        return true;
                    },
                });
                if (typeof answer === 'string') {
                    projectName = answer.trim();
                }
            }
        }
        catch (error) {
            // Handle the aborted message in a custom way.
            if (error.code !== 'ABORTED') {
                throw error;
            }
        }
    }
    const projectRoot = node_path_1.default.resolve(projectName);
    const folderName = node_path_1.default.basename(projectRoot);
    if (!directlyCreateInCurrentDir) {
        // if a folder is already created, no point of checking if it's valid
        assertValidName(folderName);
        (0, mkdirp_1.mkdirp)(projectRoot);
    }
    if (assertFolderEmptyAsync(projectRoot).exists) {
        return (0, exports.resolveProjectRoot)(options);
    }
    return { projectRoot, folderName };
};
exports.resolveProjectRoot = resolveProjectRoot;
