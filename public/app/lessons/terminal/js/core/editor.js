export const Editor = {
    currentFile: null,
    area: null,

    init() {
        this.area = document.getElementById("editor-area");

        this.area.addEventListener("input", () => {
            if (this.currentFile) {
                VFS.save(this.currentFile, this.area.value);
            }
        });
    },

    load(file, content) {
        this.currentFile = FileOps.currentPath + file;
        this.area.value = content;
    }
};
