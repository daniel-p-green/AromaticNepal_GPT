"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPackageManagerVersionOrNull = exports.getPackageManagerVersion = exports.getDevCommand = exports.getUpgradeCommand = exports.getRenderCommand = exports.getRunCommand = exports.getInstallCommand = exports.selectPackageManager = void 0;
const node_child_process_1 = require("node:child_process");
const node_path_1 = __importDefault(require("node:path"));
const log_1 = require("./log");
const shouldUseBun = () => {
    var _a, _b;
    if (((_a = process.env._) === null || _a === void 0 ? void 0 : _a.endsWith('/bin/bun')) ||
        ((_b = process.env._) === null || _b === void 0 ? void 0 : _b.endsWith('/bin/bunx'))) {
        return true;
    }
    return false;
};
const shouldUseYarn = () => {
    var _a, _b;
    return Boolean(((_a = process.env.npm_execpath) === null || _a === void 0 ? void 0 : _a.includes('yarn.js')) ||
        ((_b = process.env.npm_config_user_agent) === null || _b === void 0 ? void 0 : _b.includes('yarn')));
};
const shouldUsePnpm = () => {
    if (__dirname.includes(node_path_1.default.join('.pnpm', 'create-video'))) {
        return true;
    }
    if (!process.env.npm_config_argv) {
        return false;
    }
    try {
        const conf = JSON.parse(process.env.npm_config_argv);
        return conf.remain[0] === 'dlx';
    }
    catch (_a) {
        return false;
    }
};
const selectPackageManager = () => {
    if (shouldUseYarn()) {
        return 'yarn';
    }
    if (shouldUsePnpm()) {
        return 'pnpm';
    }
    if (shouldUseBun()) {
        return 'bun';
    }
    return 'npm';
};
exports.selectPackageManager = selectPackageManager;
const getInstallCommand = (manager) => {
    if (manager === 'npm') {
        return `npm i`;
    }
    if (manager === 'yarn') {
        return `yarn`;
    }
    if (manager === 'pnpm') {
        return `pnpm i`;
    }
    if (manager === 'bun') {
        return `bun install`;
    }
};
exports.getInstallCommand = getInstallCommand;
const getStartCommand = (manager) => {
    if (manager === 'npm') {
        return `npm run dev`;
    }
    if (manager === 'yarn') {
        return `yarn dev`;
    }
    if (manager === 'pnpm') {
        return `pnpm run dev`;
    }
    if (manager === 'bun') {
        return `bun run dev`;
    }
};
const getRunCommand = (manager) => {
    if (manager === 'npm') {
        return `npm run`;
    }
    if (manager === 'yarn') {
        return `yarn run`;
    }
    if (manager === 'pnpm') {
        return `pnpm run`;
    }
    if (manager === 'bun') {
        return `bun run`;
    }
    throw new TypeError('unknown package manager');
};
exports.getRunCommand = getRunCommand;
const getRenderCommand = (manager) => {
    if (manager === 'npm') {
        return `npx remotion render`;
    }
    if (manager === 'yarn') {
        return `yarn remotion render`;
    }
    if (manager === 'pnpm') {
        return `pnpm exec remotion render`;
    }
    if (manager === 'bun') {
        return `bunx remotion render`;
    }
    throw new TypeError('unknown package manager');
};
exports.getRenderCommand = getRenderCommand;
const getUpgradeCommand = (manager) => {
    if (manager === 'npm') {
        return `npx remotion upgrade`;
    }
    if (manager === 'yarn') {
        return `yarn remotion upgrade`;
    }
    if (manager === 'pnpm') {
        return `pnpm exec remotion upgrade`;
    }
    if (manager === 'bun') {
        return `bunx remotion upgrade`;
    }
    throw new TypeError('unknown package manager');
};
exports.getUpgradeCommand = getUpgradeCommand;
const getDevCommand = (manager, template) => {
    if (template.cliId === 'react-router' ||
        template.cliId === 'next' ||
        template.cliId === 'next-tailwind' ||
        template.cliId === 'next-pages-dir') {
        return `${(0, exports.getRunCommand)(manager)} dev`;
    }
    return getStartCommand(manager);
};
exports.getDevCommand = getDevCommand;
const getPackageManagerVersion = (manager) => {
    const cmd = manager === 'npm' ? 'npm -v --loglevel=error' : `${manager} -v`;
    return new Promise((resolve, reject) => {
        (0, node_child_process_1.exec)(cmd, (error, stdout, stderr) => {
            if (error) {
                reject(error);
                return;
            }
            if (stderr) {
                reject(stderr);
                return;
            }
            resolve(stdout.trim());
        });
    });
};
exports.getPackageManagerVersion = getPackageManagerVersion;
const getPackageManagerVersionOrNull = async (manager) => {
    try {
        const version = await (0, exports.getPackageManagerVersion)(manager);
        return version;
    }
    catch (_a) {
        log_1.Log.warn(`Could not determine the version of ${manager}.`);
        return null;
    }
};
exports.getPackageManagerVersionOrNull = getPackageManagerVersionOrNull;
