// ======================================================
// TERMINAL 3 – COURSES ENGINE
// Reads command.txt + command-output.txt
// Executes real actions based on ACTION::DATA
// ======================================================

const Terminal3 = (() => {

    // ======================================================
    // STATE
    // ======================================================
    const state = {
        cwd: "/",
        fs: {},                 // virtual filesystem
        history: [],
        helpMode: false,
        activeHelp: null,
        commands: {},           // command -> definition
        actions: {},            // command -> { action, data }
        currentCourse: null,
    };

    // ======================================================
    // UI HOOKS (YOU CONNECT THESE TO YOUR HTML)
    // ======================================================
    const ui = {
        print: (msg) => console.log(msg),
        clear: () => console.clear(),
        updatePreview: () => console.log("[PREVIEW UPDATED]"),
        openPanel: () => console.log("[PANEL OPENED]"),
        updateFilePanel: () => console.log("[FILE PANEL UPDATED]"),
    };

    // ======================================================
    // TXT LOADER
    // ======================================================
    async function loadTXT(path) {
        const res = await fetch(path);
        return await res.text();
    }

    // ======================================================
    // PARSE command.txt (command :: definition)
    // ======================================================
    function parseCommandDefinitions(raw) {
        const lines = raw.split("\n");
        lines.forEach(line => {
            if (!line.trim() || line.startsWith("#")) return;
            const [cmd, def] = line.split("::").map(s => s.trim());
            if (cmd && def) state.commands[cmd] = def;
        });
    }

    // ======================================================
    // PARSE command-output.txt (command :: ACTION :: DATA)
    // ======================================================
    function parseCommandActions(raw) {
        const lines = raw.split("\n");
        lines.forEach(line => {
            if (!line.trim() || line.startsWith("#")) return;
            const parts = line.split("::").map(s => s.trim());
            if (parts.length < 3) return;

            const cmd = parts[0];
            const action = parts[1];
            const data = parts.slice(2).join("::");

            state.actions[cmd] = { action, data };
        });
    }

    // ======================================================
    // FILESYSTEM ENGINE
    // ======================================================
    function ensureDir(path) {
        if (!state.fs[path]) state.fs[path] = { type: "dir", children: {} };
    }

    function ensureFile(path) {
        if (!state.fs[path]) state.fs[path] = { type: "file", content: "" };
    }

    function normalize(path) {
        if (!path || path === ".") return state.cwd;
        if (path.startsWith("/")) return path;
        if (state.cwd === "/") return `/${path}`;
        return `${state.cwd}/${path}`;
    }

    function listDir(path) {
        ensureDir(path);
        return Object.keys(state.fs[path].children || {});
    }

    // ======================================================
    // ACTION EXECUTION ENGINE
    // ======================================================
    async function executeAction(cmd, action, data) {

        switch (action) {

            // -------------------------
            // PRINT
            // -------------------------
            case "print":
                if (data === "CURRENT_DIRECTORY") return ui.print(state.cwd);
                if (data === "LIST_DIRECTORY") return ui.print(listDir(state.cwd).join("  "));
                if (data.startsWith("FILE_CONTENT:")) {
                    const file = data.split(":")[1];
                    const path = normalize(file);
                    ensureFile(path);
                    return ui.print(state.fs[path].content);
                }
                if (data === "COMMAND_HISTORY") return ui.print(state.history.join("\n"));
                if (data === "WHEREAMI") return ui.print(`Course: ${state.currentCourse || "none"} | Directory: ${state.cwd}`);
                if (data === "COURSE_INFO") return ui.print(`Current course: ${state.currentCourse}`);
                if (data === "GUIDE") return ui.print("Guidance coming from course logic...");
                if (data === "FILESYSTEM_MAP") return ui.print(JSON.stringify(state.fs, null, 2));
                if (data === "GIT_MAP") return ui.print(JSON.stringify(gitState, null, 2));
                if (data === "BASH_MAP") return ui.print("Bash map coming soon...");
                return ui.print(data);
            
            // -------------------------
            // FILESYSTEM
            // -------------------------
            case "fs":
                if (data.startsWith("CHANGE_DIRECTORY:")) {
                    const path = normalize(data.split(":")[1]);
                    ensureDir(path);
                    state.cwd = path;
                    return ui.print(`Moved to ${path}`);
                }
                if (data.startsWith("MAKE_DIRECTORY:")) {
                    const name = data.split(":")[1];
                    const path = normalize(name);
                    ensureDir(path);
                    state.fs[state.cwd].children[name] = { type: "dir", path };
                    return ui.print(`Created folder ${name}`);
                }
                if (data.startsWith("REMOVE_DIRECTORY:")) {
                    const name = data.split(":")[1];
                    delete state.fs[state.cwd].children[name];
                    return ui.print(`Removed folder ${name}`);
                }
                if (data.startsWith("CREATE_FILE:")) {
                    const name = data.split(":")[1];
                    const path = normalize(name);
                    ensureFile(path);
                    state.fs[state.cwd].children[name] = { type: "file", path };
                    return ui.print(`Created file ${name}`);
                }
                if (data.startsWith("DELETE_FILE:")) {
                    const name = data.split(":")[1];
                    delete state.fs[state.cwd].children[name];
                    return ui.print(`Deleted file ${name}`);
                }
                if (data.startsWith("SAVE_PROJECT")) return ui.print("Project saved.");
                if (data.startsWith("LOAD_PROJECT")) return ui.print("Project loaded.");
                if (data.startsWith("NEW_PROJECT")) return ui.print("New project created.");
                if (data.startsWith("LIST_PROJECTS")) return ui.print("Project list coming soon...");
                if (data.startsWith("SAVE_CHECKPOINT")) return ui.print("Checkpoint saved.");
                break;

            // -------------------------
            // UI
            // -------------------------
            case "ui":
                if (data === "CLEAR_SCREEN") return ui.clear();
                if (data === "OPEN_PANEL") return ui.openPanel();
                if (data === "UPDATE_PREVIEW") return ui.updatePreview();
                if (data.startsWith("PAGED_VIEW:")) return ui.print("Paged view coming...");
                break;

            // -------------------------
            // HELP SCREENS
            // -------------------------
            case "screen":
                state.helpMode = true;
                state.activeHelp = data;
                ui.clear();
                return ui.print(`[HELP SCREEN: ${data}] (Load helpX.txt here)`);

            // -------------------------
            // COURSE NAVIGATION
            // -------------------------
            case "nav":
                if (data.startsWith("SET_COURSE:")) {
                    state.currentCourse = data.split(":")[1];
                    return ui.print(`Course set to ${state.currentCourse}`);
                }
                if (data.startsWith("OPEN_SECTION:")) {
                    const section = data.split(":")[1];
                    return ui.print(`Opening section: ${section}`);
                }
                if (data.startsWith("START_FLOW:")) {
                    const level = data.split(":")[1];
                    return ui.print(`Starting flow at level: ${level}`);
                }
                if (data === "NEXT_STEP") return ui.print("Next step...");
                if (data === "PREVIOUS_STEP") return ui.print("Going back...");
                break;

            // -------------------------
            // GIT ENGINE
            // -------------------------
            case "git":
                return executeGit(data);

            default:
                return ui.print(`Unknown action: ${action}`);
        }
    }

    // ======================================================
    // GIT SIMULATION ENGINE
    // ======================================================
    const gitState = {
        initialized: false,
        branch: "main",
        staged: [],
        commits: []
    };

    function executeGit(data) {
        if (data === "INIT") {
            gitState.initialized = true;
            gitState.staged = [];
            gitState.commits = [];
            return ui.print("Initialized empty Git repository.");
        }
        if (data === "STATUS") {
            return ui.print(JSON.stringify(gitState, null, 2));
        }
        if (data.startsWith("ADD:")) {
            const file = data.split(":")[1];
            gitState.staged.push(file);
            return ui.print(`Staged ${file}`);
        }
        if (data.startsWith("COMMIT:")) {
            const msg = data.split(":")[1];
            gitState.commits.push({ msg, files: [...gitState.staged] });
            gitState.staged = [];
            return ui.print(`Committed: ${msg}`);
        }
        if (data === "LOG") {
            return ui.print(JSON.stringify(gitState.commits, null, 2));
        }
        return ui.print(`Git action: ${data}`);
    }

    // ======================================================
    // EXECUTE COMMAND
    // ======================================================
    async function execute(input) {
        if (!input.trim()) return;

        state.history.push(input);

        if (state.helpMode) {
            ui.print("Press Ctrl+C to exit help.");
            return;
        }

        const cmd = input.split(" ")[0];

        if (!state.actions[cmd]) {
            return ui.print(`Unknown command: ${cmd}`);
        }

        const { action, data } = state.actions[cmd];

        await executeAction(cmd, action, data);
    }

    // ======================================================
    // CTRL+C
    // ======================================================
    function handleCtrlC() {
        if (state.helpMode) {
            state.helpMode = false;
            state.activeHelp = null;
            ui.clear();
            ui.print("Exited help.");
            return;
        }
        ui.print("^C");
    }

    // ======================================================
    // INITIALIZER
    // ======================================================
    async function init() {
        const cmdRaw = await loadTXT("/public/courses/terminal-3/txt/command.txt");
        const outRaw = await loadTXT("/public/courses/terminal-3/txt/command-output.txt");

        parseCommandDefinitions(cmdRaw);
        parseCommandActions(outRaw);

        ui.print("Terminal 3 Ready.");
    }

    // ======================================================
    // PUBLIC API
    // ======================================================
    return {
        init,
        execute,
        handleCtrlC,
        getState: () => state
    };

})();

window.Terminal3 = Terminal3;
