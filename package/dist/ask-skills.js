"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.askSkills = void 0;
const make_link_1 = require("./hyperlinks/make-link");
const prompts_1 = __importDefault(require("./prompts"));
const askSkills = async () => {
    const link = (0, make_link_1.makeHyperlink)({
        text: 'agent skills',
        url: 'https://remotion.dev/docs/ai/skills',
        fallback: 'agent skills',
    });
    const { answer } = await (0, prompts_1.default)({
        type: 'toggle',
        name: 'answer',
        message: `Add ${link}?`,
        initial: true,
        active: 'Yes',
        inactive: 'No',
    });
    return answer;
};
exports.askSkills = askSkills;
