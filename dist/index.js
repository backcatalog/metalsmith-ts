"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const typescript_1 = __importDefault(require("typescript"));
/**
 * Get a file's extension.
 *
 * @param {String} filePath
 * @return {String}
 */
function getFileExt(filePath) {
    return filePath.split('.').pop() || '';
}
/**
 * Check if file is `.ts`.
 *
 * @param {String} filePath
 * @return {Boolean}
 */
function isTypescript(filePath) {
    return getFileExt(filePath) === 'ts';
}
/**
 * Transpile TypeScript.
 *
 * @param {Buffer} contents
 * @param {ts.TranspileOptions} transpileOptions
 * @return {String}
 */
function transpile(contents, transpileOptions = {}) {
    return typescript_1.default.transpileModule(contents.toString(), transpileOptions).outputText;
}
/**
 * Metalsmith plugin to handle `.ts` files.
 *
 * @return {Metalsmith.Plugin}
 */
exports.default = (options) => (files, metalsmith, done) => {
    setImmediate(done);
    Object.keys(files).forEach((file) => {
        // do nothing for non .ts files
        if (!isTypescript(file))
            return;
        let dir = path_1.dirname(file);
        const parentDir = dir.split('/').shift();
        if (parentDir && (options === null || options === void 0 ? void 0 : options.outputDir)) {
            dir = dir.replace(parentDir, options.outputDir);
        }
        const js = `${path_1.basename(file, path_1.extname(file))}.js`;
        const _file = path_1.join(dir, js);
        const data = files[file];
        data.contents = Buffer.from(transpile(files[file].contents, options === null || options === void 0 ? void 0 : options.transpileOptions));
        // eslint-disable-next-line no-param-reassign
        delete files[file];
        // eslint-disable-next-line no-param-reassign
        files[_file] = data;
    });
};
