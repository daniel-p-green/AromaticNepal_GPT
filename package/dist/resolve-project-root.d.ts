import type { Template } from './templates';
export declare const resolveProjectRoot: (options?: {
    directoryArgument?: string | null;
    selectedTemplate?: Template;
}) => Promise<{
    projectRoot: string;
    folderName: string;
}>;
