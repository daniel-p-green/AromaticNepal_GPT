"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = prompt;
exports.selectAsync = selectAsync;
const prompts_1 = __importDefault(require("prompts"));
function prompt(questions, { nonInteractiveHelp, ...options } = {}) {
    return (0, prompts_1.default)([questions], {
        onCancel() {
            throw new Error();
        },
        ...options,
    });
}
async function selectAsync(questions) {
    const { value } = await prompt({
        limit: 11,
        ...questions,
        onRender() {
            if (this.firstRender) {
                // Ensure the initial state isn't on a disabled item.
                while (this.choices[this.cursor].disabled) {
                    this.cursor++;
                    if (this.cursor > this.choices.length - 1)
                        break;
                }
                this.fire();
                // Without this, the value will be `0` instead of a string.
                this.value = (this.choices[this.cursor] || {}).value;
                // Support up arrow and `k` key -- no looping
                this.up = () => {
                    let next = this.cursor;
                    while (true) {
                        if (next <= 0)
                            break;
                        next--;
                        if (!this.choices[next].disabled)
                            break;
                    }
                    if (!this.choices[next].disabled &&
                        next !== this.cursor) {
                        this.moveCursor(next);
                        this.render();
                    }
                    else {
                        this.bell();
                    }
                };
                // Support down arrow and `j` key -- no looping
                this.down = () => {
                    let next = this.cursor;
                    while (true) {
                        if (next >= this.choices.length - 1)
                            break;
                        next++;
                        if (!this.choices[next].disabled)
                            break;
                    }
                    if (!this.choices[next].disabled &&
                        next !== this.cursor) {
                        this.moveCursor(next);
                        this.render();
                    }
                    else {
                        this.bell();
                    }
                };
                // Support tab -- looping
                this.next = () => {
                    let next = this.cursor;
                    let i = 0;
                    while (i < this.choices.length) {
                        i++;
                        next = (next + 1) % this.choices.length;
                        if (!this.choices[next].disabled)
                            break;
                    }
                    if (this.choices[next].disabled) {
                        // unexpected
                        this.bell();
                    }
                    else {
                        this.moveCursor(next);
                        this.render();
                    }
                };
            }
        },
        name: 'value',
        type: 'select',
    });
    return value !== null && value !== void 0 ? value : null;
}
