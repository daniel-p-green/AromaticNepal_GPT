"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateVideoInternals = void 0;
const list_of_remotion_packages_1 = require("./list-of-remotion-packages");
const templates_1 = require("./templates");
exports.CreateVideoInternals = {
    FEATURED_TEMPLATES: templates_1.FEATURED_TEMPLATES,
    listOfRemotionPackages: list_of_remotion_packages_1.listOfRemotionPackages,
};
exports.default = () => {
    throw new Error('create-video is a CLI tool only. Run `npx create-video@latest`, `pnpm create video` or `yarn create video` instead!');
};
