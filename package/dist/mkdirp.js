"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mkdirp = mkdirp;
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
function mkdirp(dir) {
    const parent = node_path_1.default.dirname(dir);
    if (parent === dir)
        return;
    mkdirp(parent);
    try {
        node_fs_1.default.mkdirSync(dir);
    }
    catch (err) {
        if (err.code !== 'EEXIST')
            throw err;
    }
}
