"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchPackageJson = void 0;
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const list_of_remotion_packages_1 = require("./list-of-remotion-packages");
const patchPackageJson = ({ projectRoot, projectName, latestRemotionVersion, packageManager, addTailwind, }, { getPackageJson = (filename) => node_fs_1.default.readFileSync(filename, 'utf-8'), setPackageJson = (filename, content) => node_fs_1.default.writeFileSync(filename, content), } = {}) => {
    const fileName = node_path_1.default.join(projectRoot, 'package.json');
    const contents = getPackageJson(fileName);
    const packageJson = JSON.parse(contents);
    const { name, dependencies, devDependencies, scripts, ...others } = packageJson;
    const [newDependencies, newDevDependencies] = [
        dependencies,
        devDependencies !== null && devDependencies !== void 0 ? devDependencies : {},
    ].map((depsField) => {
        return Object.keys(depsField)
            .map((d) => {
            if (list_of_remotion_packages_1.listOfRemotionPackages.includes(d)) {
                return [d, latestRemotionVersion];
            }
            return [d, depsField[d]];
        })
            .reduce((a, b) => {
            return { ...a, [b[0]]: b[1] };
        }, {});
    });
    const updateScripts = (scriptsToUpdate) => {
        for (const [key, value] of Object.entries(scriptsToUpdate)) {
            scriptsToUpdate[key] = value.replace(/remotion\b/g, 'remotionb');
        }
        return scriptsToUpdate;
    };
    // update scripts to use "remotionb" instead of "remotion" if Bun is used
    // matching '@' as well to prevent conflicts with similarly named packages.
    const newScripts = packageManager.startsWith('bun')
        ? updateScripts(scripts)
        : scripts;
    const newDependenciesWithTailwind = addTailwind
        ? {
            ...newDependencies,
            '@remotion/tailwind-v4': latestRemotionVersion,
            tailwindcss: '4.0.0',
        }
        : newDependencies;
    const newPackageJson = JSON.stringify({
        name: projectName,
        ...others,
        dependencies: newDependenciesWithTailwind,
        devDependencies: newDevDependencies,
        scripts: newScripts,
        ...(addTailwind ? { sideEffects: ['*.css'] } : {}),
    }, undefined, 2);
    setPackageJson(fileName, newPackageJson);
};
exports.patchPackageJson = patchPackageJson;
