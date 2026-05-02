export const PreviewEngine = {
    async load() {
        const iframe = document.getElementById("preview-frame");
        if (!window.VFS || !VFS.db) {
            window.TerminalCore.print("VFS not ready yet.");
            return;
        }

        const files = await VFS.getAllFiles();
        const indexFile = files.find(f => f.path.endsWith("index.html"));

        if (!indexFile) {
            window.TerminalCore.print("No index.html found. Create one first.");
            iframe.srcdoc = "<h1>No index.html found</h1>";
            return;
        }

        const html = this._injectAssets(indexFile.content, files);
        iframe.srcdoc = html;
        window.TerminalCore.print("Preview loaded.");
    },

    _injectAssets(html, files) {
        const cssLinks = files
            .filter(f => f.path.endsWith(".css"))
            .map(f => `<style data-path="${f.path}">\n${f.content}\n</style>`)
            .join("\n");

        const jsScripts = files
            .filter(f => f.path.endsWith(".js"))
            .map(f => `<script data-path="${f.path}">\n${f.content}\n</script>`)
            .join("\n");

        return html.replace("</head>", `${cssLinks}\n</head>`)
                   .replace("</body>", `${jsScripts}\n</body>`);
    }
};
