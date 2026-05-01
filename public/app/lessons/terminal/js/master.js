import { TerminalCore } from "./core/terminal-core.js";
import { CommandRouter } from "./core/command-router.js";
import { HelpSystem } from "./core/help-system.js";
import { TipsEngine } from "./core/tips-engine.js";
import { VFS } from "./fs/vfs.js";
import { FileOps } from "./fs/file-ops.js";
import { PreviewEngine } from "./preview/preview-engine.js";
import { LessonLoader } from "./lessons/lesson-loader.js";
import { LessonSearch } from "./lessons/lesson-search.js";

window.TerminalCore = TerminalCore;
window.CommandRouter = CommandRouter;
window.HelpSystem = HelpSystem;
window.TipsEngine = TipsEngine;
window.VFS = VFS;
window.FileOps = FileOps;
window.PreviewEngine = PreviewEngine;
window.LessonLoader = LessonLoader;
window.LessonSearch = LessonSearch;

window.addEventListener("DOMContentLoaded", () => {
    VFS.init();
    TerminalCore.init(
        document.getElementById("terminal-output"),
        document.getElementById("terminal-input")
    );
});
