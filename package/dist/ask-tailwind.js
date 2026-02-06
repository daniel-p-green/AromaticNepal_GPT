"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.askTailwind = void 0;
const prompts_1 = __importDefault(require("./prompts"));
const askTailwind = async () => {
    const { answer } = await (0, prompts_1.default)({
        type: 'toggle',
        name: 'answer',
        message: 'Add TailwindCSS?',
        initial: true,
        active: 'Yes',
        inactive: 'No',
    });
    return answer;
};
exports.askTailwind = askTailwind;
