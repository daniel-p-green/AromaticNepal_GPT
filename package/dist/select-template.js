"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectTemplate = exports.isFlagSelected = exports.getDirectoryArgument = exports.getPositionalArguments = exports.isTmpFlagSelected = void 0;
const chalk_1 = __importDefault(require("chalk"));
const minimist_1 = __importDefault(require("minimist"));
const make_link_1 = require("./hyperlinks/make-link");
const prompts_1 = require("./prompts");
const templates_1 = require("./templates");
const ALL_TEMPLATES = [...templates_1.FEATURED_TEMPLATES, ...templates_1.PAID_TEMPLATES];
const parsed = (0, minimist_1.default)(process.argv.slice(2), {
    boolean: [...ALL_TEMPLATES.map((f) => f.cliId), 'tmp'],
    string: ['_'],
});
const isTmpFlagSelected = () => parsed.tmp;
exports.isTmpFlagSelected = isTmpFlagSelected;
const getPositionalArguments = () => parsed._;
exports.getPositionalArguments = getPositionalArguments;
const getDirectoryArgument = () => {
    const positionalArgs = (0, exports.getPositionalArguments)();
    return positionalArgs.length > 0 ? positionalArgs[0] || null : null;
};
exports.getDirectoryArgument = getDirectoryArgument;
exports.isFlagSelected = ALL_TEMPLATES.find((f) => {
    return parsed[f.cliId];
});
const selectTemplate = async () => {
    if (exports.isFlagSelected) {
        return exports.isFlagSelected;
    }
    return (await (0, prompts_1.selectAsync)({
        message: 'Choose a template:',
        optionsPerPage: 20,
        choices: ALL_TEMPLATES.map((template) => {
            return {
                value: template,
                title: `${chalk_1.default.blue(template.shortName)}${template.cliId === 'editor-starter'
                    ? ' ' + chalk_1.default.yellow('(Paid)')
                    : ''}${chalk_1.default.reset(` ${chalk_1.default.gray(template.description.trim())} ${chalk_1.default.gray((0, make_link_1.makeHyperlink)({
                    text: '(?)',
                    url: template.cliId === 'editor-starter'
                        ? `${template.previewURL}`
                        : `https://remotion.dev/templates/${template.cliId}`,
                    fallback: '',
                }))}`)}`,
            };
        }),
    }));
};
exports.selectTemplate = selectTemplate;
