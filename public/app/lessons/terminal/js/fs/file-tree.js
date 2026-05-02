export const FileTree = {
    container: null,

    init() {
        this.container = document.getElementById("tree-content");
        this.refresh();
    },

    async refresh() {
        if (!VFS.db) return;
        const files = await VFS.getAllFiles();
        this.container.innerHTML = "";

        const ul = document.createElement("ul");
        ul.className = "tree-root";

        files.forEach(file => {
            if (file.path.endsWith("/")) return; // folder marker
            const li = document.createElement("li");
            li.textContent = file.path;
            li.addEventListener("click", () => {
                const parts = file.path.split("/");
                const name = parts.pop();
                FileOps.currentPath = parts.join("/") + (parts.length ? "/" : "/");
                VFS.load(file.path, (content) => {
                    Editor.load(name, content);
                    TerminalCore.print(`Opened ${file.path} from tree.`);
                });
            });
            ul.appendChild(li);
        });

        this.container.appendChild(ul);
    }
};
