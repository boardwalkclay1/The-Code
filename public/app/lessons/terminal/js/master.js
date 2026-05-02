// CORE
import { TerminalCore } from "./core/terminal-core.js";
import { CommandRouter } from "./core/command-router.js";
import { HelpSystem } from "./core/help-system.js";
import { TipsEngine } from "./core/tips-engine.js";
import { Editor } from "./core/editor.js";

// FILE SYSTEM
import { VFS } from "./fs/vfs.js";
import { FileOps } from "./fs/file-ops.js";
import { FileTree } from "./fs/file-tree.js";

// PREVIEW
import { PreviewEngine } from "./preview/preview-engine.js";

// LESSONS
import { LessonLoader } from "./lessons/lesson-loader.js";
import { LessonSearch } from "./lessons/lesson-search.js";


// MAKE EVERYTHING GLOBAL FOR TERMINAL ACCESS
window.TerminalCore = TerminalCore;
window.CommandRouter = CommandRouter;
window.HelpSystem = HelpSystem;
window.TipsEngine = TipsEngine;

window.VFS = VFS;
window.FileOps = FileOps;
window.FileTree = FileTree;

window.PreviewEngine = PreviewEngine;

window.LessonLoader = LessonLoader;
window.LessonSearch = LessonSearch;

window.Editor = Editor;


// INITIALIZE EVERYTHING
window.addEventListener("DOMContentLoaded", () => {

    // 1. Virtual File System
    VFS.init();

    // 2. Editor
    Editor.init();

    // 3. Terminal
    TerminalCore.init(
        document.getElementById("terminal-output"),
        document.getElementById("terminal-input")
    );

    // 4. File Tree (slight delay to allow DB to initialize)
    setTimeout(() => {
        FileTree.init();
        TerminalCore.print("File system ready.");
    }, 300);

    // 5. Tips Engine (placeholder until lessons load tips)
    TipsEngine.load([
        "HTML is the skeleton. CSS is the style. JS is the brain.",
        "A clean project creates a clean mind.",
        "Small steps build big skills.",
        "You make the rules. This is your code.",
        "PWAs can be installed and work offline."
    ]);

    TerminalCore.print("Workbench initialized.");
});
