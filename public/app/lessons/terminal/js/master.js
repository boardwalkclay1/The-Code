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


// ============================================================
// TERMINAL 1 → TERMINAL 2 SYNC
// ============================================================

function flickerScreen() {
    const el = document.body;
    el.style.transition = "none";
    el.style.opacity = "0.2";
    setTimeout(() => {
        el.style.opacity = "1";
        setTimeout(() => {
            el.style.opacity = "0.4";
            setTimeout(() => {
                el.style.opacity = "1";
                el.style.transition = "";
            }, 120);
        }, 120);
    }, 120);
}

async function runUnlockSequence() {
    TerminalCore.print("");
    TerminalCore.print("initializing unlock sequence...");
    flickerScreen();
    await new Promise(r => setTimeout(r, 300));

    TerminalCore.print("verifying access...");
    await new Promise(r => setTimeout(r, 300));

    TerminalCore.print("activating gateway...");
    flickerScreen();
    await new Promise(r => setTimeout(r, 300));

    TerminalCore.print("");
    TerminalCore.print("redirecting to terminal 2...");
    await new Promise(r => setTimeout(r, 500));

    window.location.href = "./terminal2/terminal2.html";
}


// ============================================================
// EXTEND TERMINAL 1 COMMANDS
// ============================================================

CommandRouter.register("code", async args => {
    const sub = args.trim().toLowerCase();

    if (sub === "unlock") {
        await runUnlockSequence();
        return;
    }

    TerminalCore.print("unknown code command.");
});


// ============================================================
// INITIALIZE EVERYTHING
// ============================================================

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

    // 5. Tips Engine
    TipsEngine.load([
        "HTML is the skeleton. CSS is the style. JS is the brain.",
        "A clean project creates a clean mind.",
        "Small steps build big skills.",
        "You make the rules. This is your code.",
        "PWAs can be installed and work offline."
    ]);

    TerminalCore.print("Workbench initialized.");
    TerminalCore.print("type: code unlock");
});
