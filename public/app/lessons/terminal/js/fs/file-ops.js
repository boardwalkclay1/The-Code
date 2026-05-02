export const FileOps = {
    currentPath: "/",

    ls() {
        VFS.getAllFiles().then(files => {
            const here = files.filter(f => f.path.startsWith(this.currentPath));
            if (!here.length) {
                TerminalCore.print("No files here.");
                return;
            }
            here.forEach(f => TerminalCore.print(f.path));
        });
    },

    cd(args) {
        const target = args[0] || "/";
        this.currentPath = target.endsWith("/") ? target : target + "/";
        TerminalCore.print(`Moved to ${this.currentPath}`);
    },

    new(args) {
        const type = args[0];
        const name = args[1];

        if (!type || !name) {
            TerminalCore.print("Usage: new file <name> OR new folder <name>");
            return;
        }

        if (type === "file") {
            VFS.save(`${this.currentPath}${name}`, "");
            TerminalCore.print(`Created file ${name}`);
        } else if (type === "folder") {
            VFS.save(`${this.currentPath}${name}/`, "__folder__");
            TerminalCore.print(`Created folder ${name}/`);
        } else {
            TerminalCore.print("Unknown type. Use: file or folder");
        }

        if (window.FileTree) FileTree.refresh();
    },

    open(args) {
        const file = args[0];
        if (!file) {
            TerminalCore.print("Usage: open <file>");
            return;
        }
        const fullPath = `${this.currentPath}${file}`;
        VFS.load(fullPath, (content) => {
            TerminalCore.print(`Opening ${fullPath}`);
            Editor.load(file, content);
        });
    },

    delete(args) {
        const file = args[0];
        if (!file) {
            TerminalCore.print("Usage: delete <file>");
            return;
        }
        const fullPath = `${this.currentPath}${file}`;
        const tx = VFS.db.transaction("files", "readwrite");
        tx.objectStore("files").delete(fullPath);
        TerminalCore.print(`Deleted ${fullPath}`);
        if (window.FileTree) FileTree.refresh();
    },

    rename(args) {
        const oldName = args[0];
        const newName = args[1];
        if (!oldName || !newName) {
            TerminalCore.print("Usage: rename <old> <new>");
            return;
        }
        const oldPath = `${this.currentPath}${oldName}`;
        const newPath = `${this.currentPath}${newName}`;

        VFS.load(oldPath, (content) => {
            VFS.save(newPath, content);
            const tx = VFS.db.transaction("files", "readwrite");
            tx.objectStore("files").delete(oldPath);
            TerminalCore.print(`Renamed ${oldPath} to ${newPath}`);
            if (window.FileTree) FileTree.refresh();
        });
    },

    tree() {
        VFS.getAllFiles().then(files => {
            TerminalCore.print("Project tree:");
            files.forEach(f => TerminalCore.print(" - " + f.path));
        });
    }
};
