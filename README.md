# Projects-2021-editor

This is the code for the editor project as outlined in [Ideas and Projects for 2021](https://publishing-project.rivendellweb.net/ideas-and-projects-for-2021/).

The idea is to Explore [Electron](https://www.electronjs.org/), [Monaco](https://microsoft.github.io/monaco-editor/) (the editor behind VS Code) and how they work together (or not) to build a smaller code editor with special features.

Some of the goals for the project (updated from the post to reflect new knowledge).

1. Use the code from the [electron-esm-webpack](https://github.com/microsoft/monaco-editor-samples/tree/master/electron-esm-webpack) example in the [monaco-editor-sample](https://github.com/microsoft/monaco-editor-samples/) repository
2. Switch the code to use [Typescript](https://www.typescriptlang.org/)
3. User the [Monaco](https://github.com/Microsoft/monaco-editor) text editor as the core editor the project. This way we leverage all the languages Monaco supports with specific emphasis on:
   * Markdown
   * CSS
   * SCSS
   * HTML
   * XML
   * Javascript
4. Research the best way to integrate Monaco into an Electron application
5. Use Electron's built-in menus and event handlers to interact with the native file system
6. Export Markdown to HTML
7. Allow packaging of content into zipped bundles, [epub3](http://idpf.org/epub/30/), and [web bundles](https://web.dev/web-bundles/)
8. Research what it would take to convert the web bundler tool and the ebook manifest generator into [WASM](https://webassembly.org/) so it can be used directly in the app
