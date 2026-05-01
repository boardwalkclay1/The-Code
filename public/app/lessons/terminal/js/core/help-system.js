export const HelpSystem = {
    show() {
        window.TerminalCore.print("Available Commands:");
        window.TerminalCore.print("ls, cd, new, open, delete, rename, tree");
        window.TerminalCore.print("preview - Load your project");
        window.TerminalCore.print("lesson search <word> - Search lessons");
        window.TerminalCore.print("tip - Show a learning tip");
        window.TerminalCore.print("Use commands -all for full list.");
    }
};
