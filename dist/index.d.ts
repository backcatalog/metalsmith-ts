import ts from 'typescript';
import Metalsmith from 'metalsmith';
interface IOptions {
    outputDir?: string;
    transpileOptions?: ts.TranspileOptions;
}
declare const _default: (options?: IOptions | undefined) => Metalsmith.Plugin;
/**
 * Metalsmith plugin to handle `.ts` files.
 *
 * @return {Metalsmith.Plugin}
 */
export default _default;
