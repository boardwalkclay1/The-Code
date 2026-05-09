// public/courses/terminal-3/js/engine.js
// Terminal 3 — Master Terminal Engine (Corrected + Final Build)

const Terminal3 = (() => {

  // ------------------------------------------------------------
  // STATE
  // ------------------------------------------------------------
  const state = {
    cwd: "/",
    fs: { "/": { type: "dir", children: {} } },
    history: [],
    helpPages: {},
    definitions: {},
    actions: {},
    unlocked: false,
    currentCourse: null,
    helpMode: false,
    activeHelpId: null,
    git: {
      initialized: false,
      branch: "main",
      staged: [],
      commits: [],
      remotes: {}
    }
  };

  // ------------------------------------------------------------
  // UI HOOKS (NO PRINTING — FIXED)
  // ------------------------------------------------------------
  const ui = {
    print: (text) => console.log(text),
    clear: () => console.clear(),
    openPanel: () => {},          // FIXED: no duplicate output
    updatePreview: () => {},      // FIXED
    updateFilePanel: () => {},    // FIXED
    showPagedText: (title, text) => {
      ui.clear();
      ui.print(`=== ${title} ===`);
      ui.print(text);
      ui.print("\nPress Ctrl+C to exit.");
    }
  };

  // ------------------------------------------------------------
  // PATH + FS HELPERS
  // ------------------------------------------------------------
  function normalizePath(p) {
    if (!p || p === ".") return state.cwd;
    if (p.startsWith("/")) return p;
    if (state.cwd === "/") return `/${p}`;
    return `${state.cwd}/${p}`;
  }

  function ensureDir(path) {
    if (!state.fs[path]) state.fs[path] = { type: "dir", children: {} };
  }

  function ensureFile(path) {
    if (!state.fs[path]) state.fs[path] = { type: "file", content: "" };
  }

  function listDir(path) {
    ensureDir(path);
    return Object.keys(state.fs[path].children || {});
  }

  function getFileContent(path) {
    ensureFile(path);
    return state.fs[path].content;
  }

  function setFileContent(path, content) {
    ensureFile(path);
    state.fs[path].content = content;
  }

  // ------------------------------------------------------------
  // PLACEHOLDER REPLACER (FIXED: supports {course}, real newlines)
  // ------------------------------------------------------------
  function replacePlaceholders(text, extras = {}) {
    if (!text) return "";

    return text
      .replace(/\\n/g, "\n")                       // FIXED: real newlines
      .replace(/\{cwd\}/g, state.cwd)
      .replace(/\{course\}/g, state.currentCourse || "(none)")   // FIXED
      .replace(/\{directory_list\}/g, listDir(state.cwd).join("\n"))
      .replace(/\{history\}/g, state.history.join("\n"))
      .replace(/\{current_date\}/g, new Date().toString())
      .replace(/\{project_list\}/g, (extras.project_list || []).join("\n"))
      .replace(/\{file_content\}/g, extras.file_content || "")
      .replace(/\{help_page_1\}/g, state.helpPages.help1 || "")
      .replace(/\{help_page_2\}/g, state.helpPages.help2 || "")
      .replace(/\{help_page_3\}/g, state.helpPages.help3 || "")
      .replace(/\{help_page_4\}/g, state.helpPages.help4 || "")
      .replace(/\{help_page_5\}/g, state.helpPages.help5 || "")
      .replace(/\{help_page_6\}/g, state.helpPages.help6 || "")
      .replace(/\{help_page_7\}/g, state.helpPages.help7 || "")
      .replace(/\{help_page_8\}/g, state.helpPages.help8 || "")
      .replace(/\{help_page_9\}/g, state.helpPages.help9 || "")
      .replace(/\{help_page_10\}/g, state.helpPages.help10 || "");
  }

  // ------------------------------------------------------------
  // TXT LOADING
  // ------------------------------------------------------------
  async function loadTXT(path) {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`Failed to load ${path}`);
    return await res.text();
  }

  // ------------------------------------------------------------
  // PARSE command.txt
  // ------------------------------------------------------------
  function parseCommandTxt(raw) {
    const lines = raw.split(/\r?\n/);
    let currentSection = null;
    let buffer = [];

    for (let rawLine of lines) {
      const line = rawLine.replace(/\r/g, "");

      const helpMatch = line.match(/^#\s*HELP\s*PAGE\s*(\d+)/i);
      if (helpMatch) {
        if (currentSection && buffer.length)
          state.helpPages[currentSection] = buffer.join("\n").trim();

        currentSection = `help${helpMatch[1]}`;
        buffer = [];
        continue;
      }

      const defMatch = line.match(/^([^:]+)::\s*(.+)$/);
      if (defMatch) {
        const cmd = defMatch[1].trim();
        const def = defMatch[2].trim();
        state.definitions[cmd] = def;
        if (currentSection) buffer.push(`${cmd} :: ${def}`);
        continue;
      }

      if (line.trim() === "" || line.trim().startsWith("#")) {
        if (currentSection && buffer.length && line.trim() === "")
          buffer.push("");
        continue;
      }

      if (currentSection) buffer.push(line);
    }

    if (currentSection && buffer.length)
      state.helpPages[currentSection] = buffer.join("\n").trim();
  }

  // ------------------------------------------------------------
  // PARSE command-output.txt
  // ------------------------------------------------------------
  function parseOutputTxt(raw) {
    const lines = raw.split(/\r?\n/);
    let i = 0;

    while (i < lines.length) {
      let line = lines[i].replace(/\r/g, "");

      if (!line.trim() || line.trim().startsWith("#")) {
        i++;
        continue;
      }

      const headerMatch = line.match(/^([^:]+)::\s*([^:]+)::\s*(.*)$/);
      if (!headerMatch) {
        i++;
        continue;
      }

      const cmd = headerMatch[1].trim();
      const action = headerMatch[2].trim();
      let data = headerMatch[3] || "";
      i++;

      while (i < lines.length) {
        const next = lines[i].replace(/\r/g, "");
        if (next.trim() === "") {
          i++;
          break;
        }
        const nextHeader = next.match(/^([^:]+)::\s*([^:]+)::\s*(.*)$/);
        if (nextHeader) break;
        data += "\n" + next;
        i++;
      }

      state.actions[cmd] = { action, data: data.trim() };
    }
  }

  // ------------------------------------------------------------
  // ACTION EXECUTION
  // ------------------------------------------------------------
  async function executeActionFor(cmd, actionObj, rawArgs = "") {
    const action = actionObj.action;
    let data = actionObj.data || "";
    const args = rawArgs.trim().split(/\s+/).filter(Boolean);

    const printData = (d, extras) => {
      ui.print(replacePlaceholders(d, extras));
    };

    switch (action) {
      case "print":
        printData(data, {});
        break;

      case "screen":
        const id = data.trim();
        const content = state.helpPages[id];
        if (content) {
          ui.showPagedText(id.toUpperCase(), content);
          state.helpMode = true;
          state.activeHelpId = id;
        } else {
          ui.print(`[No help page found: ${id}]`);
        }
        break;

      case "ui":
        if (data === "CLEAR_SCREEN") {
          ui.clear();
          ui.print("Screen cleared.");
        }
        else if (data === "OPEN_PANEL") ui.openPanel();
        else if (data === "UPDATE_PREVIEW") ui.updatePreview();
        break;

      case "fs":
        handleFSAction(data, args);
        break;

      case "nav":
        handleNavAction(data, args);
        break;

      case "git":
        handleGitAction(data, args);
        break;

      default:
        ui.print(`[Unknown action type: ${action}]`);
    }
  }

  // ------------------------------------------------------------
  // FILESYSTEM ACTIONS
  // ------------------------------------------------------------
  function handleFSAction(data, args) {
    if (data.startsWith("CHANGE_DIRECTORY:")) {
      const path = data.split(":")[1] || args[0] || "";
      const p = normalizePath(path);
      ensureDir(p);
      state.cwd = p;
      ui.print(`Moved to ${p}`);
      return;
    }

    if (data.startsWith("CREATE_FILE:")) {
      const name = data.split(":")[1] || args[0];
      if (!name) return ui.print("touch: missing file name");
      const path = normalizePath(name);
      ensureFile(path);
      state.fs[state.cwd].children[name] = { type: "file", path };
      ui.print(`File created: ${name}`);
      return;
    }

    if (data.startsWith("MAKE_DIRECTORY:")) {
      const name = data.split(":")[1] || args[0];
      if (!name) return ui.print("mkdir: missing folder name");
      const path = normalizePath(name);
      ensureDir(path);
      state.fs[state.cwd].children[name] = { type: "dir", path };
      ui.print(`Folder created: ${name}`);
      return;
    }

    if (data.startsWith("DELETE_FILE:")) {
      const name = data.split(":")[1] || args[0];
      if (!name) return ui.print("rm: missing file name");
      delete state.fs[normalizePath(name)];
      delete state.fs[state.cwd].children[name];
      ui.print(`File deleted: ${name}`);
      return;
    }

    if (data.startsWith("REMOVE_DIRECTORY:")) {
      const name = data.split(":")[1] || args[0];
      if (!name) return ui.print("rmdir: missing folder name");
      delete state.fs[normalizePath(name)];
      delete state.fs[state.cwd].children[name];
      ui.print(`Folder removed: ${name}`);
      return;
    }

    ui.print(`[fs] Unknown FS action: ${data}`);
  }

  // ------------------------------------------------------------
  // NAVIGATION ACTIONS
  // ------------------------------------------------------------
  function handleNavAction(data, args) {
    if (data.startsWith("SET_COURSE:")) {
      const course = data.split(":")[1] || args[0];
      state.currentCourse = course;
      ui.print(`Active course set to: ${course}`);
      return;
    }

    if (data.startsWith("OPEN_SECTION:")) {
      const section = data.split(":")[1] || args[0];
      ui.print(`Opening: ${section}`);
      return;
    }

    ui.print(`[nav] Unknown nav action: ${data}`);
  }

  // ------------------------------------------------------------
  // GIT ACTIONS
  // ------------------------------------------------------------
  function handleGitAction(data, args) {
    if (data === "INIT") {
      state.git.initialized = true;
      state.git.staged = [];
      state.git.commits = [];
      ui.print("Initialized empty Git repository.");
      return;
    }

    if (data === "STATUS") {
      ui.print(JSON.stringify(state.git, null, 2));
      return;
    }

    if (data.startsWith("ADD:")) {
      const file = data.split(":")[1] || args[0];
      if (!file) return ui.print("git add: missing file");
      state.git.staged.push(file);
      ui.print(`Staged ${file}`);
      return;
    }

    if (data.startsWith("COMMIT:")) {
      const msg = data.split(":")[1] || args.join(" ") || "commit";
      state.git.commits.push({
        message: msg,
        files: [...state.git.staged],
        branch: state.git.branch,
        time: new Date().toISOString()
      });
      state.git.staged = [];
      ui.print(`Committed: ${msg}`);
      return;
    }

    if (data === "LOG") {
      ui.print(
        state.git.commits
          .map((c, i) => `${i + 1}. [${c.branch}] ${c.message} (${c.time})`)
          .join("\n") || "No commits yet."
      );
      return;
    }

    ui.print(`[git] Unknown git action: ${data}`);
  }

  // ------------------------------------------------------------
  // EXECUTE COMMAND
  // ------------------------------------------------------------
  async function execute(input) {
    if (!input || !input.trim()) return;

    ui.print("$ " + input);
    state.history.push(input);

    if (state.helpMode) {
      ui.print("You are in a help screen. Press Ctrl+C to exit.");
      return;
    }

    const parts = input.trim().split(/\s+/);
    const base = parts[0];
    const rest = parts.slice(1).join(" ");

    if (state.actions[base]) {
      await executeActionFor(base, state.actions[base], rest);
      return;
    }

    const candidates = Object.keys(state.actions).filter(
      k => input === k || input.startsWith(k + " ")
    );

    if (candidates.length) {
      candidates.sort((a, b) => b.length - a.length);
      const key = candidates[0];
      const args = input.slice(key.length).trim();
      await executeActionFor(key, state.actions[key], args);
      return;
    }

    if (state.definitions[base]) {
      ui.print(`${base} :: ${state.definitions[base]}`);
      return;
    }

    ui.print(`Unknown command: ${base}. Type help or help1.`);
  }

  // ------------------------------------------------------------
  // CTRL+C
  // ------------------------------------------------------------
  function handleCtrlC() {
    if (state.helpMode) {
      state.helpMode = false;
      state.activeHelpId = null;
      ui.clear();
      ui.print("Exited help.");
      return;
    }
    ui.print("^C");
  }

  // ------------------------------------------------------------
  // INIT
  // ------------------------------------------------------------
  async function init(opts = {}) {
    const commandPath = opts.commandTxt || "/courses/terminal-3/txt/command.txt";
    const outputPath = opts.outputTxt || "/courses/terminal-3/txt/command-output.txt";

    try {
      const [cmdRaw, outRaw] = await Promise.all([
        loadTXT(commandPath),
        loadTXT(outputPath)
      ]);

      parseCommandTxt(cmdRaw);
      parseOutputTxt(outRaw);

      ensureDir("/");

      ui.print("Terminal 3 ready.");
      ui.print("Type help1–help10 to view command pages.");
    } catch (e) {
      ui.print("Terminal 3 initialization failed: " + e.message);
      throw e;
    }
  }

  // ------------------------------------------------------------
  // REGISTER UI
  // ------------------------------------------------------------
  function registerUI(hooks = {}) {
    if (hooks.print) ui.print = hooks.print;
    if (hooks.clear) ui.clear = hooks.clear;
    if (hooks.openPanel) ui.openPanel = hooks.openPanel;
    if (hooks.updatePreview) ui.updatePreview = hooks.updatePreview;
    if (hooks.updateFilePanel) ui.updateFilePanel = hooks.updateFilePanel;
    if (hooks.showPagedText) ui.showPagedText = hooks.showPagedText;
  }

  // ------------------------------------------------------------
  // GET STATE
  // ------------------------------------------------------------
  function getState() {
    return JSON.parse(JSON.stringify(state));
  }

  // ------------------------------------------------------------
  // EXPORT
  // ------------------------------------------------------------
  return {
    init,
    execute,
    handleCtrlC,
    registerUI,
    getState
  };

})();

window.Terminal3 = Terminal3;
