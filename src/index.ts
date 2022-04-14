import {basename, dirname, extname, join} from 'path';
import ts from 'typescript';
import Metalsmith from 'metalsmith';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RaggedyAny = any;

/**
 * Get a file's extension.
 *
 * @param {String} filePath
 * @return {String}
 */
function getFileExt(filePath: string): string {
    return filePath.split('.').pop() || '';
}

/**
 * Check if file is `.ts`.
 *
 * @param {String} filePath
 * @return {Boolean}
 */
function isTypescript(filePath: string): boolean {
    return getFileExt(filePath) === 'ts';
}

/**
 * Transpile TypeScript.
 *
 * @param {Buffer} contents
 * @param {ts.TranspileOptions} transpileOptions
 * @return {String}
 */
function transpile(
    contents: Buffer,
    transpileOptions: ts.TranspileOptions = {}
): string {
    return ts.transpileModule(contents.toString(), transpileOptions).outputText;
}

interface IOptions {
    outputDir?: string;
    transpileOptions?: ts.TranspileOptions;
}

/**
 * Metalsmith plugin to handle `.ts` files.
 *
 * @return {Metalsmith.Plugin}
 */
export default (options?: IOptions): Metalsmith.Plugin =>
    (files, metalsmith, done): void => {
        setImmediate(done as RaggedyAny);

        Object.keys(files).forEach((file) => {
            // do nothing for non .ts files
            if(!isTypescript(file)) return;

            let dir = dirname(file);
            const parentDir = dir.split('/').shift();

            if(parentDir && options?.outputDir) {
                dir = dir.replace(parentDir, options.outputDir);
            }

            const js = `${basename(file, extname(file))}.js`;
            const _file = join(dir, js);
            const data = files[file];

            data.contents = Buffer.from(
                transpile(files[file].contents, options?.transpileOptions)
            );

            // eslint-disable-next-line no-param-reassign
            delete files[file];

            // eslint-disable-next-line no-param-reassign
            files[_file] = data;
        });
    };
