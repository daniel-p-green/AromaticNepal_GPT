export declare const checkGitAvailability: (cwd: string, commandToCheck: string, argsToCheck: string[]) => Promise<{
    type: "no-git-repo";
} | {
    type: "is-git-repo";
    location: string;
} | {
    type: "git-not-installed";
}>;
export declare const init: () => Promise<void>;
