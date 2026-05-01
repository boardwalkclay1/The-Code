export const CommandRouter = {
    run(command) {
        const [cmd, ...args] = command.split(" ");

        // File system commands
        if (window.FileOps[cmd]) return window.FileOps[cmd](args);

        // Help system
        if (cmd === "-help") return window.HelpSystem.show();

        // Lesson search
        if (cmd === "lesson") return window.LessonLoader.handle(args);

        // Tips
        if (cmd === "tip") return window.TipsEngine.show(args);

        // Preview
        if (cmd === "preview") return window.PreviewEngine.load();

        // Unknown
        window.TerminalCore.print("Unknown command. Type -help for assistance.");
    }
};
