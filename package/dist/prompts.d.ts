import type { Options, PromptObject } from 'prompts';
import prompts from 'prompts';
export type Question<V extends string = string> = PromptObject<V> & {
    optionsPerPage?: number;
};
export type NamelessQuestion = Omit<Question<'value'>, 'name' | 'type'>;
type PromptOptions = {
    nonInteractiveHelp?: string;
} & Options;
export default function prompt(questions: Question, { nonInteractiveHelp, ...options }?: PromptOptions): Promise<prompts.Answers<string>>;
export declare function selectAsync(questions: NamelessQuestion): Promise<unknown>;
export {};
