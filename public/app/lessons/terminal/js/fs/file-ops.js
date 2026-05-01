export const VFS = {
    db: null,

    init() {
        const request = indexedDB.open("terminalVFS", 1);

        request.onupgradeneeded = (e) => {
            const db = e.target.result;
            db.createObjectStore("files", { keyPath: "path" });
        };

        request.onsuccess = (e) => {
            this.db = e.target.result;
        };
    },

    save(path, content) {
        const tx = this.db.transaction("files", "readwrite");
        tx.objectStore("files").put({ path, content });
    },

    load(path, callback) {
        const tx = this.db.transaction("files", "readonly");
        const req = tx.objectStore("files").get(path);
        req.onsuccess = () => callback(req.result?.content || "");
    }
};
