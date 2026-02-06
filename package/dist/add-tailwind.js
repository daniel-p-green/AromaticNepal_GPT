"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTailwindToConfig = exports.addTailwindRootCss = exports.addPostcssConfig = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const addPostcssConfig = (projectRoot) => {
    const postcssConfigMjs = path_1.default.join(projectRoot, 'postcss.config.mjs');
    fs_1.default.writeFileSync(postcssConfigMjs, `
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
`.trim() + '\n');
};
exports.addPostcssConfig = addPostcssConfig;
const addTailwindRootCss = (projectRoot) => {
    const rootFileTsx = path_1.default.join(projectRoot, 'src', 'Root.tsx');
    const rootFileJsx = path_1.default.join(projectRoot, 'src', 'Root.jsx');
    const indexCss = path_1.default.join(projectRoot, 'src', 'index.css');
    const rootFile = fs_1.default.existsSync(rootFileTsx) ? rootFileTsx : rootFileJsx;
    if (!fs_1.default.existsSync(rootFile)) {
        throw new Error('No Root file found');
    }
    const root = fs_1.default.readFileSync(rootFile, 'utf-8');
    const newFile = `import "./index.css";\n${root}`;
    fs_1.default.writeFileSync(rootFile, newFile);
    const css = `@import "tailwindcss";\n`;
    fs_1.default.writeFileSync(indexCss, css);
};
exports.addTailwindRootCss = addTailwindRootCss;
const addTailwindToConfig = (projectRoot) => {
    const configFileTs = path_1.default.join(projectRoot, 'remotion.config.ts');
    const configFileJs = path_1.default.join(projectRoot, 'remotion.config.js');
    const configFile = fs_1.default.existsSync(configFileTs) ? configFileTs : configFileJs;
    if (!fs_1.default.existsSync(configFile)) {
        throw new Error('No remotion.config.ts file found');
    }
    const config = fs_1.default.readFileSync(configFile, 'utf-8');
    const lines = config.trim().split('\n');
    let lineNo = 0;
    let lastImportLine = 0;
    for (const line of lines) {
        if (line.startsWith('import ')) {
            lastImportLine = lineNo;
        }
        lineNo++;
    }
    const headerLines = lines.slice(0, lastImportLine + 1);
    const tailLines = lines.slice(lastImportLine + 1);
    const newLines = [
        ...headerLines,
        `import { enableTailwind } from '@remotion/tailwind-v4';`,
        ...tailLines,
        'Config.overrideWebpackConfig(enableTailwind);',
    ];
    fs_1.default.writeFileSync(configFile, newLines.join('\n') + '\n');
};
exports.addTailwindToConfig = addTailwindToConfig;
