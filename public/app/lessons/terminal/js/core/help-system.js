export const HelpSystem = {
    show() {
        TerminalCore.print("Core Commands:");
        TerminalCore.print("  ls                - List files");
        TerminalCore.print("  cd <path>         - Change directory");
        TerminalCore.print("  new file <name>   - Create a file");
        TerminalCore.print("  new folder <name> - Create a folder");
        TerminalCore.print("  open <file>       - Open a file in the editor");
        TerminalCore.print("  delete <file>     - Delete a file");
        TerminalCore.print("  rename <o> <n>    - Rename a file");
        TerminalCore.print("  tree              - Show project tree");
        TerminalCore.print("  preview           - Load project in preview");
        TerminalCore.print("  lesson search <w> - Search lessons");
        TerminalCore.print("  tip               - Show a learning tip");
        TerminalCore.print("  clear             - Clear terminal output");
    }
};
