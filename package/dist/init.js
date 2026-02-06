"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = exports.checkGitAvailability = void 0;
const chalk_1 = __importDefault(require("chalk"));
const execa_1 = __importDefault(require("execa"));
const node_path_1 = __importDefault(require("node:path"));
const add_tailwind_1 = require("./add-tailwind");
const add_yarn2_support_1 = require("./add-yarn2-support");
const ask_skills_1 = require("./ask-skills");
const ask_tailwind_1 = require("./ask-tailwind");
const create_public_folder_1 = require("./create-public-folder");
const degit_1 = require("./degit");
const make_link_1 = require("./hyperlinks/make-link");
const install_skills_1 = require("./install-skills");
const latest_remotion_version_1 = require("./latest-remotion-version");
const log_1 = require("./log");
const open_in_editor_flow_1 = require("./open-in-editor-flow");
const patch_package_json_1 = require("./patch-package-json");
const patch_readme_1 = require("./patch-readme");
const pkg_managers_1 = require("./pkg-managers");
const prompts_1 = __importDefault(require("./prompts"));
const resolve_project_root_1 = require("./resolve-project-root");
const select_template_1 = require("./select-template");
const gitExists = (commandToCheck, argsToCheck) => {
    try {
        execa_1.default.sync(commandToCheck, argsToCheck);
        return true;
    }
    catch (_a) {
        return false;
    }
};
const checkGitAvailability = async (cwd, commandToCheck, argsToCheck) => {
    if (!gitExists(commandToCheck, argsToCheck)) {
        return { type: 'git-not-installed' };
    }
    try {
        const result = await (0, execa_1.default)('git', ['rev-parse', '--show-toplevel'], {
            cwd,
        });
        return { type: 'is-git-repo', location: result.stdout };
    }
    catch (_a) {
        return {
            type: 'no-git-repo',
        };
    }
};
exports.checkGitAvailability = checkGitAvailability;
const getGitStatus = async (root) => {
    // not in git tree, so let's init
    try {
        await (0, execa_1.default)('git', ['init'], { cwd: root });
        await (0, execa_1.default)('git', ['add', '--all'], { cwd: root, stdio: 'ignore' });
        await (0, execa_1.default)('git', ['commit', '-m', 'Create new Remotion video'], {
            cwd: root,
            stdio: 'ignore',
        });
        await (0, execa_1.default)('git', ['branch', '-M', 'main'], {
            cwd: root,
            stdio: 'ignore',
        });
    }
    catch (e) {
        log_1.Log.error('Error creating git repository:', e);
        log_1.Log.error('Project has been created nonetheless.');
        // no-op -- this is just a convenience and we don't care if it fails
    }
};
const init = async () => {
    log_1.Log.info(`Welcome to ${chalk_1.default.blue('Remotion')}!`);
    // Get directory argument if provided
    const directoryArgument = (0, select_template_1.getDirectoryArgument)();
    // Select template first
    const selectedTemplate = await (0, select_template_1.selectTemplate)();
    // If Editor Starter (paid) is selected, show purchase link and exit
    if (selectedTemplate.cliId === 'editor-starter') {
        log_1.Log.newLine();
        log_1.Log.info(`${chalk_1.default.yellow('Editor Starter is a paid template.')}\nGet it here: ${chalk_1.default.underline(selectedTemplate.previewURL)}`);
        log_1.Log.newLine();
        return;
    }
    // Then resolve project root with template info and directory argument
    const { projectRoot, folderName } = await (0, resolve_project_root_1.resolveProjectRoot)({
        directoryArgument,
        selectedTemplate,
    });
    const result = await (0, exports.checkGitAvailability)(projectRoot, 'git', ['--version']);
    if (result.type === 'git-not-installed') {
        log_1.Log.error('Git is not installed or not in the path. Install Git to continue.');
        process.exit(1);
    }
    if (result.type === 'is-git-repo') {
        const { shouldContinue } = await (0, prompts_1.default)({
            type: 'toggle',
            name: 'shouldContinue',
            message: `You are already inside a Git repo (${node_path_1.default.resolve(result.location)}).\nThis might lead to a Git Submodule being created. Do you want to continue?`,
            initial: false,
            active: 'Yes',
            inactive: 'No',
        });
        if (!shouldContinue) {
            process.exit(1);
        }
    }
    const latestRemotionVersionPromise = (0, latest_remotion_version_1.getLatestRemotionVersion)();
    const shouldOverrideTailwind = selectedTemplate.allowEnableTailwind
        ? await (0, ask_tailwind_1.askTailwind)()
        : false;
    const shouldInstallSkills = await (0, ask_skills_1.askSkills)();
    const pkgManager = (0, pkg_managers_1.selectPackageManager)();
    const pkgManagerVersion = await (0, pkg_managers_1.getPackageManagerVersionOrNull)(pkgManager);
    try {
        await (0, degit_1.degit)({
            repoOrg: selectedTemplate.org,
            repoName: selectedTemplate.repoName,
            dest: projectRoot,
        });
        (0, patch_readme_1.patchReadmeMd)(projectRoot, pkgManager, selectedTemplate);
        if (shouldOverrideTailwind) {
            (0, add_tailwind_1.addTailwindToConfig)(projectRoot);
            (0, add_tailwind_1.addPostcssConfig)(projectRoot);
            (0, add_tailwind_1.addTailwindRootCss)(projectRoot);
        }
        (0, create_public_folder_1.createPublicFolder)(projectRoot);
        const latestVersion = await latestRemotionVersionPromise;
        (0, patch_package_json_1.patchPackageJson)({
            projectRoot,
            projectName: folderName,
            latestRemotionVersion: latestVersion,
            packageManager: pkgManager,
            addTailwind: shouldOverrideTailwind,
        });
    }
    catch (e) {
        log_1.Log.error(e);
        log_1.Log.error('Error with template cloning. Aborting');
        process.exit(1);
    }
    (0, add_yarn2_support_1.createYarnYmlFile)({
        pkgManager,
        pkgManagerVersion,
        projectRoot,
    });
    await getGitStatus(projectRoot);
    if (shouldInstallSkills) {
        await (0, install_skills_1.installSkills)(projectRoot);
    }
    const relativeToCurrent = node_path_1.default.relative(process.cwd(), projectRoot);
    const cdToFolder = relativeToCurrent.startsWith('.')
        ? projectRoot
        : relativeToCurrent;
    log_1.Log.info();
    log_1.Log.info(`Copied to ${chalk_1.default.blue(cdToFolder)}.`);
    log_1.Log.info();
    log_1.Log.info('Get started by running:');
    if (cdToFolder !== '') {
        log_1.Log.info(' ' + chalk_1.default.blue(`cd ${cdToFolder}`));
    }
    log_1.Log.info(' ' + chalk_1.default.blue((0, pkg_managers_1.getInstallCommand)(pkgManager)));
    log_1.Log.info(' ' + chalk_1.default.blue((0, pkg_managers_1.getDevCommand)(pkgManager, selectedTemplate)));
    log_1.Log.info('');
    log_1.Log.info('To render a video, run:');
    log_1.Log.info(' ' + chalk_1.default.blue((0, pkg_managers_1.getRenderCommand)(pkgManager)));
    log_1.Log.info('');
    log_1.Log.info('Links to get you started:');
    log_1.Log.info(' ' +
        chalk_1.default.blue((0, make_link_1.makeHyperlink)({
            text: 'remotion.dev/docs',
            url: 'https://www.remotion.dev/docs',
            fallback: 'https://www.remotion.dev/docs',
        })));
    log_1.Log.info(' ' +
        chalk_1.default.blue((0, make_link_1.makeHyperlink)({
            text: 'remotion.dev/prompts',
            url: 'https://www.remotion.dev/prompts',
            fallback: 'https://www.remotion.dev/prompts',
        })));
    log_1.Log.info();
    log_1.Log.info('Remotion is free for teams of up to 3.');
    log_1.Log.info('Adopting Remotion in your company? Visit ' +
        chalk_1.default.blue((0, make_link_1.makeHyperlink)({
            text: 'remotion.pro/license',
            url: 'https://remotion.pro/license',
            fallback: 'https://www.remotion.pro/license',
        })));
    log_1.Log.info();
    await (0, open_in_editor_flow_1.openInEditorFlow)(projectRoot);
};
exports.init = init;
