"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchReadmeMd = void 0;
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const pkg_managers_1 = require("./pkg-managers");
const patchReadmeMd = (projectRoot, packageManager, template) => {
    const fileName = node_path_1.default.join(projectRoot, 'README.md');
    const contents = node_fs_1.default.readFileSync(fileName, 'utf8');
    const newContents = contents
        .split('\n')
        .map((c) => {
        if (c.startsWith('npm install') || c.startsWith('npm i')) {
            return (0, pkg_managers_1.getInstallCommand)(packageManager);
        }
        if (c.startsWith('npm run dev')) {
            return (0, pkg_managers_1.getDevCommand)(packageManager, template);
        }
        if (c.startsWith('npx remotion render')) {
            return (0, pkg_managers_1.getRenderCommand)(packageManager);
        }
        if (c.startsWith('npx remotion upgrade')) {
            return (0, pkg_managers_1.getUpgradeCommand)(packageManager);
        }
        if (c.startsWith('npm run ')) {
            return (0, pkg_managers_1.getRunCommand)(packageManager) + c.replace('npm run', '');
        }
        return c;
    })
        .join('\n');
    node_fs_1.default.writeFileSync(fileName, newContents);
};
exports.patchReadmeMd = patchReadmeMd;
