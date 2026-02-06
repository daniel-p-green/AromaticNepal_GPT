"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.installSkills = void 0;
const execa_1 = __importDefault(require("execa"));
const log_1 = require("./log");
const installSkills = async (projectRoot) => {
    const command = process.platform === 'win32' ? 'npx.cmd' : 'npx';
    try {
        await (0, execa_1.default)(command, ['-y', '--loglevel=error', 'skills@1.2.0', 'add', 'remotion-dev/skills'], {
            cwd: projectRoot,
            stdio: 'inherit',
        });
    }
    catch (e) {
        log_1.Log.error('Error installing skills:', e);
        log_1.Log.error('You can install them manually by running:');
        log_1.Log.error('  npx skills add remotion-dev/skills');
    }
};
exports.installSkills = installSkills;
