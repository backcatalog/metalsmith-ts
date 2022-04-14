# metalsmith-ts

A [Metalsmith](https://metalsmith.io) plugin for transpiling TypeScript files.

## Install

```bash
yarn add -D metalsmith-ts
```

## Usage

```javascript
const metalsmith = require('metalsmith');
const markdown = require('@metalsmith/markdown');
const layouts = require('@metalsmith/layouts');
const typescript = require('metalsmith-ts');

metalsmith(__dirname)
    .metadata({
        sitename: 'My Site',
    })
    .source('src')
    .destination('build')
    .use(markdown())
    .use(
        typescript({
            outputDir: 'js/',
        })
    )
    .use(
        layouts({
            suppressNoFilesError: true,
        })
    )
    .build((err) => {
        if (err) throw err;
    });
```

## Options

### outputDir (Optional)

The directory (relative to destination) where files will end up.

### transpileOptions (Optional)

Object passed to TypeScript's `transpileModule()` function. Click [here](https://github.com/microsoft/TypeScript/blob/6a4cb30a5f33c641a7942098a58a0b298d6c7508/src/services/transpile.ts#L2) for available options.

## Notes

-   Only files ending in `.ts` will be processed.
-   Files outside the source directory are ignored.
