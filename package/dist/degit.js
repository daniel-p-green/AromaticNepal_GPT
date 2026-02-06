"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.degit = void 0;
exports.fetch = fetch;
const https_1 = __importDefault(require("https"));
const node_fs_1 = __importDefault(require("node:fs"));
const node_os_1 = require("node:os");
const node_path_1 = __importDefault(require("node:path"));
const tar_1 = __importDefault(require("tar"));
const mkdirp_1 = require("./mkdirp");
function fetch(url, dest) {
    return new Promise((resolve, reject) => {
        https_1.default
            .get(url, (response) => {
            const code = response.statusCode;
            if (code >= 400) {
                reject(new Error(`Network request to ${url} failed with code ${code} (${response.statusMessage})`));
            }
            else if (code >= 300) {
                fetch(response.headers.location, dest)
                    .then(resolve)
                    .catch(reject);
            }
            else {
                response
                    .pipe(node_fs_1.default.createWriteStream(dest))
                    .on('finish', () => resolve())
                    .on('error', reject);
            }
        })
            .on('error', reject);
    });
}
function untar(file, dest) {
    return tar_1.default.extract({
        file,
        strip: 1,
        C: dest,
    }, []);
}
const degit = async ({ repoOrg, repoName, dest, }) => {
    const base = node_path_1.default.join((0, node_os_1.tmpdir)(), '.degit');
    const dir = node_path_1.default.join(base, repoOrg, repoName);
    const file = `${dir}/HEAD.tar.gz`;
    const url = `https://github.com/${repoOrg}/${repoName}/archive/HEAD.tar.gz`;
    (0, mkdirp_1.mkdirp)(node_path_1.default.dirname(file));
    await fetch(url, file);
    (0, mkdirp_1.mkdirp)(dest);
    await untar(file, dest);
    node_fs_1.default.unlinkSync(file);
};
exports.degit = degit;
