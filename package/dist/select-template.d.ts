import type { Template } from './templates';
export declare const isTmpFlagSelected: () => boolean;
export declare const getPositionalArguments: () => string[];
export declare const getDirectoryArgument: () => string | null;
export declare const isFlagSelected: Template | {
    homePageLabel: string;
    shortName: string;
    org: string;
    repoName: string;
    description: string;
    longerDescription: string;
    cliId: "editor-starter";
    defaultBranch: string;
    previewURL: string;
} | undefined;
export declare const selectTemplate: () => Promise<Template | {
    homePageLabel: string;
    shortName: string;
    org: string;
    repoName: string;
    description: string;
    longerDescription: string;
    cliId: "editor-starter";
    defaultBranch: string;
    previewURL: string;
}>;
