// public/courses/terminal-3/js/engine.js
// Terminal 3 Engine (TXT-driven, executes logic)
// Loads: /courses/terminal-3/txt/command.txt
//        /courses/terminal-3/txt/command-output.txt
// Exposes: init(), execute(input), handleCtrlC(), registerUI(hooks), getState()

const Terminal3 = (() => {
  // -------------------------
  // State
  // -------------------------
  const state = {
    cwd: "/",
    fs: { "/": { type: "dir", children: {} } },
    history: [],
    helpPages: {},            // help1..help10 content (string)
    definitions: {},          // command -> definition
    actions: {},              // command -> { action, data }
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

  // -------------------------
  // UI hooks (override with registerUI)
  // -------------------------
  const ui = {
    print: (text) => { console.log(text); },
    clear: () => { console.clear(); },
    openPanel: () => { ui.print("[PANEL OPENED]"); },
    updatePreview: () => { ui.print("[PREVIEW UPDATED]"); },
    updateFilePanel: () => { ui.print("[FILE PANEL UPDATED]"); },
    showPagedText: (title, text) => {
      ui.clear();
      ui.print(`=== ${title} ===`);
      ui.print(text);
      ui.print("\nPress Ctrl+C to exit.");
    }
  };

  // -------------------------
  // Helpers
  // -------------------------
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

  function setFileContent(path, content) {
    ensureFile(path);
    state.fs[path].content = content;
  }

  function getFileContent(path) {
    ensureFile(path);
    return state.fs[path].content;
  }

  function replacePlaceholders(text, extras = {}) {
    if (!text) return "";
    return text
      .replace(/\{cwd\}/g, state.cwd)
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

  // -------------------------
  // TXT loaders & parsers
  // -------------------------
  async function loadTXT(path) {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`Failed to load ${path}`);
    return await res.text();
  }

  function parseCommandTxt(raw) {
    // Parse definitions and help pages from single command.txt
    // Sections marked by lines like: "# HELP PAGE X (helpX)"
    const lines = raw.split(/\r?\n/);
    let currentSection = null;
    let buffer = [];
    for (let rawLine of lines) {
      const line = rawLine.replace(/\r/g, "");
      const helpMatch = line.match(/^#\s*HELP\s*PAGE\s*(\d+)\s*\(help(\d+)\)/i);
      const helpHeader = line.match(/^#\s*HELP\s*PAGE\s*(\d+)/i);
      if (helpMatch || helpHeader) {
        if (currentSection && buffer.length) {
          state.helpPages[currentSection] = buffer.join("\n").trim();
        }
        currentSection = `help${helpMatch ? helpMatch[1] : (helpHeader ? helpHeader[1] : "")}`;
        buffer = [];
        continue;
      }
      // definition lines: command :: definition
      const defMatch = line.match(/^([^:]+)::\s*(.+)$/);
      if (defMatch) {
        const cmd = defMatch[1].trim();
        const def = defMatch[2].trim();
        state.definitions[cmd] = def;
        // also if inside a help section, append the same line to buffer
        if (currentSection) buffer.push(`${cmd} :: ${def}`);
        continue;
      }
      // blank or comment lines
      if (line.trim() === "" || line.trim().startsWith("#")) {
        if (currentSection && buffer.length && line.trim() === "") {
          // preserve blank lines inside help page
          buffer.push("");
        }
        continue;
      }
      // fallback: if inside help section, append raw line
      if (currentSection) buffer.push(line);
    }
    if (currentSection && buffer.length) {
      state.helpPages[currentSection] = buffer.join("\n").trim();
    }
  }

  function parseOutputTxt(raw) {
    // Parse entries of the form:
    // command :: action :: data (data may be multi-line until blank line)
    const lines = raw.split(/\r?\n/);
    let i = 0;
    while (i < lines.length) {
      let line = lines[i].replace(/\r/g, "");
      if (!line.trim() || line.trim().startsWith("#")) { i++; continue; }
      const headerMatch = line.match(/^([^:]+)::\s*([^:]+)::\s*(.*)$/);
      if (!headerMatch) { i++; continue; }
      const cmd = headerMatch[1].trim();
      const action = headerMatch[2].trim();
      let data = headerMatch[3] || "";
      i++;
      // collect following non-header lines as part of data until blank line or next header
      while (i < lines.length) {
        const next = lines[i].replace(/\r/g, "");
        if (next.trim() === "") { i++; break; }
        const nextHeader = next.match(/^([^:]+)::\s*([^:]+)::\s*(.*)$/);
        if (nextHeader) break;
        data += "\n" + next;
        i++;
      }
      state.actions[cmd] = { action, data: data.trim() };
    }
  }

  // -------------------------
  // Action executors
  // -------------------------
  async function executeActionFor(cmd, actionObj, rawArgs = "") {
    const action = actionObj.action;
    let data = actionObj.data || "";
    // allow inline overrides: if user typed "git add file.txt" we want to use args
    const args = rawArgs.trim().split(/\s+/).filter(Boolean);
    // helper to print processed data
    const printData = (d, extras) => {
      const out = replacePlaceholders(d, extras);
      ui.print(out);
    };

    switch (action) {
      case "print": {
        // data may contain placeholders or multi-line content
        // if data contains tokens like {file_content} and args[0] is file, load it
        let extras = {};
        if (data.includes("{file_content}") && args[0]) {
          const path = normalizePath(args[0]);
          extras.file_content = getFileContent(path);
        }
        if (data.includes("{project_list}")) {
          extras.project_list = Object.keys(state.fs).filter(p => p !== "/");
        }
        printData(data, extras);
        break;
      }

      case "screen": {
        // data is help-index or helpX or cheatsheet etc.
        const id = data.trim();
        if (id === "help-index") {
          const index = Object.keys(state.helpPages).sort().map(k => `${k}`).join("\n");
          ui.showPagedText("HELP INDEX", index);
          state.helpMode = true;
          state.activeHelpId = "index";
          return;
        }
        const content = state.helpPages[id];
        if (content) {
          ui.showPagedText(id.toUpperCase(), content);
          state.helpMode = true;
          state.activeHelpId = id;
        } else {
          ui.print(`[No help page found: ${id}]`);
        }
        break;
      }

      case "fs": {
        // data examples: CREATE_FILE:{name} or CHANGE_DIRECTORY:{path}
        if (data.startsWith("CHANGE_DIRECTORY:")) {
          const path = data.split(":")[1] || args[0] || "";
          const p = normalizePath(path);
          ensureDir(p);
          state.cwd = p;
          ui.print(`Moved to ${p}`);
          ui.updateFilePanel();
          return;
        }
        if (data.startsWith("MAKE_DIRECTORY:")) {
          const name = data.split(":")[1] || args[0];
          if (!name) return ui.print("mkdir: missing folder name");
          const path = normalizePath(name);
          ensureDir(path);
          // register in parent
          const parent = state.cwd;
          state.fs[parent].children[name] = { type: "dir", path };
          ui.print(`Folder created: ${name}`);
          ui.updateFilePanel();
          return;
        }
        if (data.startsWith("REMOVE_DIRECTORY:")) {
          const name = data.split(":")[1] || args[0];
          if (!name) return ui.print("rmdir: missing folder name");
          delete state.fs[normalizePath(name)];
          delete state.fs[state.cwd].children[name];
          ui.print(`Folder removed: ${name}`);
          ui.updateFilePanel();
          return;
        }
        if (data.startsWith("CREATE_FILE:")) {
          const name = data.split(":")[1] || args[0];
          if (!name) return ui.print("touch: missing file name");
          const path = normalizePath(name);
          ensureFile(path);
          state.fs[state.cwd].children[name] = { type: "file", path };
          ui.print(`File created: ${name}`);
          ui.updateFilePanel();
          return;
        }
        if (data.startsWith("DELETE_FILE:")) {
          const name = data.split(":")[1] || args[0];
          if (!name) return ui.print("rm: missing file name");
          delete state.fs[normalizePath(name)];
          delete state.fs[state.cwd].children[name];
          ui.print(`File deleted: ${name}`);
          ui.updateFilePanel();
          return;
        }
        if (data.startsWith("SAVE_PROJECT")) {
          // simple serialization to localStorage
          try {
            localStorage.setItem("terminal3_fs", JSON.stringify(state.fs));
            ui.print("Project saved successfully.");
          } catch (e) {
            ui.print("Project save failed.");
          }
          return;
        }
        if (data.startsWith("LOAD_PROJECT")) {
          try {
            const raw = localStorage.getItem("terminal3_fs");
            if (raw) {
              state.fs = JSON.parse(raw);
              ui.print("Project loaded.");
              ui.updateFilePanel();
            } else {
              ui.print("No saved project found.");
            }
          } catch (e) {
            ui.print("Project load failed.");
          }
          return;
        }
        if (data.startsWith("NEW_PROJECT")) {
          state.fs = { "/": { type: "dir", children: {} } };
          state.cwd = "/";
          ui.print("New project created.");
          ui.updateFilePanel();
          return;
        }
        if (data.startsWith("LIST_PROJECTS")) {
          // placeholder: list keys in localStorage that match terminal3
          const keys = Object.keys(localStorage).filter(k => k.startsWith("terminal3_project_"));
          ui.print("Saved projects:\n" + (keys.join("\n") || "(none)"));
          return;
        }
        if (data.startsWith("SAVE_CHECKPOINT")) {
          ui.print("Checkpoint saved.");
          return;
        }
        ui.print(`[fs] Unknown fs action: ${data}`);
        break;
      }

      case "ui": {
        if (data === "CLEAR_SCREEN") { ui.clear(); return; }
        if (data === "OPEN_PANEL") { ui.openPanel(); return; }
        if (data === "UPDATE_PREVIEW") { ui.updatePreview(); return; }
        if (data === "PAGED_VIEW:") { ui.print("[Paged view placeholder]"); return; }
        ui.print(`[ui] Unknown UI action: ${data}`);
        break;
      }

      case "nav": {
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
        if (data.startsWith("START_FLOW:")) {
          const level = data.split(":")[1] || args[0];
          ui.print(`Starting flow at level: ${level}`);
          return;
        }
        if (data === "NEXT_STEP") { ui.print("Next step..."); return; }
        if (data === "PREVIOUS_STEP") { ui.print("Going back..."); return; }
        ui.print(`[nav] Unknown nav action: ${data}`);
        break;
      }

      case "git": {
        // data examples: INIT, STATUS, ADD:{file}, COMMIT:{message}, LOG
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
          const msg = data.split(":")[1] || args.slice(1).join(" ") || "commit";
          state.git.commits.push({ message: msg, files: [...state.git.staged], branch: state.git.branch, time: new Date().toISOString() });
          state.git.staged = [];
          ui.print(`Committed: ${msg}`);
          return;
        }
        if (data === "LOG") {
          ui.print(state.git.commits.map((c, i) => `${i+1}. [${c.branch}] ${c.message} (${c.time})`).join("\n") || "No commits yet.");
          return;
        }
        ui.print(`[git] ${data}`);
        break;
      }

      default:
        ui.print(`[Unknown action type: ${action}]`);
    }
  }

  // -------------------------
  // Command execution entry
  // -------------------------
  async function execute(input) {
    if (!input || !input.trim()) return;
    state.history.push(input);
    // Ctrl+C is handled separately via handleCtrlC
    if (state.helpMode) {
      ui.print("You are in a help screen. Press Ctrl+C to exit.");
      return;
    }

    // parse command and args
    const parts = input.trim().split(/\s+/);
    const base = parts[0];
    const rest = parts.slice(1).join(" ");

    // exact match first
    if (state.actions[base]) {
      await executeActionFor(base, state.actions[base], rest);
      return;
    }

    // try to match multi-word commands (e.g., "git add", "apps explain")
    // attempt longest match by checking prefixes
    const candidates = Object.keys(state.actions).filter(k => input.startsWith(k + " ") || input === k);
    if (candidates.length) {
      // choose longest key
      candidates.sort((a,b) => b.length - a.length);
      const key = candidates[0];
      const args = input.slice(key.length).trim();
      await executeActionFor(key, state.actions[key], args);
      return;
    }

    // fallback: check definitions for help-like queries
    if (state.definitions[base]) {
      ui.print(`${base} :: ${state.definitions[base]}`);
      return;
    }

    ui.print(`Unknown command: ${base}. Type help or help1.`);
  }

  // -------------------------
  // Ctrl+C handler
  // -------------------------
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

  // -------------------------
  // Public API: init
  // -------------------------
  async function init(opts = {}) {
    // opts.paths: { commandTxt, outputTxt }
    const commandPath = (opts && opts.commandTxt) || "/courses/terminal-3/txt/command.txt";
    const outputPath = (opts && opts.outputTxt) || "/courses/terminal-3/txt/command-output.txt";
    try {
      const [cmdRaw, outRaw] = await Promise.all([loadTXT(commandPath), loadTXT(outputPath)]);
      parseCommandTxt(cmdRaw);
      parseOutputTxt(outRaw);
      // ensure root dir exists
      ensureDir("/");
      ui.print("Terminal 3 ready.");
    } catch (e) {
      ui.print("Terminal 3 initialization failed: " + e.message);
      throw e;
    }
  }

  // -------------------------
  // UI registration
  // -------------------------
  function registerUI(hooks = {}) {
    if (typeof hooks.print === "function") ui.print = hooks.print;
    if (typeof hooks.clear === "function") ui.clear = hooks.clear;
    if (typeof hooks.openPanel === "function") ui.openPanel = hooks.openPanel;
    if (typeof hooks.updatePreview === "function") ui.updatePreview = hooks.updatePreview;
    if (typeof hooks.updateFilePanel === "function") ui.updateFilePanel = hooks.updateFilePanel;
    if (typeof hooks.showPagedText === "function") ui.showPagedText = hooks.showPagedText;
  }

  // -------------------------
  // Utility: expose state snapshot
  // -------------------------
  function getState() {
    return JSON.parse(JSON.stringify({
      cwd: state.cwd,
      fs: state.fs,
      history: state.history,
      currentCourse: state.currentCourse,
      unlocked: state.unlocked,
      helpMode: state.helpMode,
      activeHelpId: state.activeHelpId,
      git: state.git
    }));
  }

  // -------------------------
  // Return public API
  // -------------------------
  return {
    init,
    execute,
    handleCtrlC,
    registerUI,
    getState
  };
})();

// Expose globally
window.Terminal3 = Terminal3;
