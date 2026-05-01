export const PreviewEngine = {
    load() {
        window.TerminalCore.print("Loading preview...");
        const iframe = document.getElementById("preview-frame");

        // For now, load a blank page
        iframe.srcdoc = "<h1>Preview Coming Soon</h1>";
    }
};
