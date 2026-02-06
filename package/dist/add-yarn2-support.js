"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createYarnYmlFile = void 0;
const node_fs_1 = require("node:fs");
const node_path_1 = __importDefault(require("node:path"));
const log_1 = require("./log");
const createYarnYmlFile = ({ projectRoot, pkgManagerVersion, pkgManager, }) => {
    if (pkgManager !== 'yarn') {
        return;
    }
    if (!pkgManagerVersion) {
        return;
    }
    const majorVersion = pkgManagerVersion[0];
    const majorVersionNumber = Number(majorVersion);
    if (majorVersionNumber < 2) {
        return;
    }
    log_1.Log.info('Remotion has no support for automatically installing the Yarn PnP modules yet.');
    log_1.Log.info('Creating .yarnrc.yml file to disable Yarn PnP.');
    const yarnrcYml = `nodeLinker: node-modules\n`;
    (0, node_fs_1.writeFileSync)(node_path_1.default.join(projectRoot, '.yarnrc.yml'), yarnrcYml);
};
exports.createYarnYmlFile = createYarnYmlFile;
