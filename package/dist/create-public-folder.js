"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPublicFolder = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const createPublicFolder = (projectRoot) => {
    const target = (0, path_1.join)(projectRoot, 'public');
    if ((0, fs_1.existsSync)(target)) {
        return;
    }
    (0, fs_1.mkdirSync)(target);
};
exports.createPublicFolder = createPublicFolder;
