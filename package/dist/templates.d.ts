type DynamicTemplate = {
    type: 'video';
    promoVideo: {
        muxId: string;
        width: number;
        height: number;
    };
} | {
    type: 'image';
    promoBanner: {
        src: string;
        width: number;
        height: number;
    };
};
export type Template = {
    shortName: string;
    description: string;
    org: string;
    repoName: string;
    homePageLabel: string;
    longerDescription: string;
    cliId: 'hello-world' | 'javascript' | 'blank' | 'next' | 'next-tailwind' | 'next-pages-dir' | 'react-router' | 'three' | 'still' | 'tts' | 'google-tts' | 'audiogram' | 'music-visualization' | 'prompt-to-video' | 'skia' | 'overlay' | 'stargazer' | 'tiktok' | 'code-hike' | 'render-server' | 'recorder' | 'prompt-to-motion-graphics';
    defaultBranch: string;
    featuredOnHomePage: string | null;
    previewURL: string | null;
    templateInMonorepo: string;
    allowEnableTailwind: boolean;
    contributedBy: string | null;
    showStackblitz: boolean;
} & DynamicTemplate;
export declare const FEATURED_TEMPLATES: Template[];
export declare const PAID_TEMPLATES: {
    homePageLabel: string;
    shortName: string;
    org: string;
    repoName: string;
    description: string;
    longerDescription: string;
    cliId: "editor-starter";
    defaultBranch: string;
    previewURL: string;
}[];
export {};
