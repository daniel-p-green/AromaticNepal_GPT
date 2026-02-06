import type { PackageManager } from './pkg-managers';
export declare const createYarnYmlFile: ({ projectRoot, pkgManagerVersion, pkgManager, }: {
    projectRoot: string;
    pkgManagerVersion: string | null;
    pkgManager: PackageManager;
}) => void;
