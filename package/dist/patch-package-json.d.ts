import type { PackageManager } from './pkg-managers';
export declare const patchPackageJson: ({ projectRoot, projectName, latestRemotionVersion, packageManager, addTailwind, }: {
    projectRoot: string;
    projectName: string;
    latestRemotionVersion: string;
    packageManager: PackageManager;
    addTailwind: boolean;
}, { getPackageJson, setPackageJson, }?: {
    getPackageJson?: ((filename: string) => string) | undefined;
    setPackageJson?: ((filename: string, content: string) => void) | undefined;
}) => void;
