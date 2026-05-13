// Path: /courses/terminal-1/js/landing.js
// Landing Terminal — reads command.txt and command-output.txt
// Dynamically loads type-tutor.js and math.js when requested.

(() => {
  // Elements (adjust IDs to match your HTML)
  const outEl = document.getElementById("terminal-output");
  const inputEl = document.getElementById("terminal-input");
  const promptLabel = document.getElementById("prompt-label");
  const loadingScreen = document.getElementById("loading-screen");

  // State
  let gatewayPassed = false;
  let commandsIndex = {};      // name -> short description (from command.txt)
  let outputsIndex = {};       // name -> { action: 'print'|'script', data: string }
  let history = [];

  // Utilities
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const scrollToBottom = () => { outEl.scrollTop = outEl.scrollHeight; };

  const typeLine = async (text, speed = 10) => {
    const line = document.createElement("div");
    line.className = "terminal-line";
    outEl.appendChild(line);
    for (let i = 0; i <= text.length; i++) {
      line.textContent = text.slice(0, i);
      scrollToBottom();
      await sleep(speed);
    }
  };

  const printLine = text => {
    const line = document.createElement("div");
    line.className = "terminal-line";
    line.textContent = text;
    outEl.appendChild(line);
    scrollToBottom();
  };

  const printPre = text => {
    const pre = document.createElement("pre");
    pre.className = "terminal-pre";
    pre.textContent = text;
    outEl.appendChild(pre);
    scrollToBottom();
  };

  // Load TXT helpers
  async function fetchText(path) {
    const res = await fetch(path, { cache: "no-store" });
    if (!res.ok) throw new Error(`Failed to load ${path}: ${res.status}`);
    return await res.text();
  }

  // Parse command.txt (format: command :: short description)
  function parseCommandsTxt(raw) {
    const lines = raw.split(/\r?\n/);
    const map = {};
    for (let rawLine of lines) {
      const line = rawLine.trim();
      if (!line || line.startsWith("#")) continue;
      const parts = line.split("::");
      if (parts.length < 2) continue;
      const name = parts[0].trim().toLowerCase();
      const desc = parts.slice(1).join("::").trim();
      map[name] = desc;
    }
    return map;
  }

  // Parse command-output.txt (format: command :: action :: data (data may be multi-line until blank line))
  function parseOutputTxt(raw) {
    const lines = raw.split(/\r?\n/);
    const map = {};
    let i = 0;
    while (i < lines.length) {
      let line = lines[i].replace(/\r/g, "");
      if (!line.trim() || line.trim().startsWith("#")) { i++; continue; }
      const headerMatch = line.match(/^([^:]+)::\s*([^:]+)::\s*(.*)$/);
      if (!headerMatch) { i++; continue; }
      const cmd = headerMatch[1].trim().toLowerCase();
      const action = headerMatch[2].trim().toLowerCase();
      let data = headerMatch[3] || "";
      i++;
      // collect following lines until blank line or next header
      while (i < lines.length) {
        const next = lines[i].replace(/\r/g, "");
        if (next.trim() === "") { i++; break; }
        const nextHeader = next.match(/^([^:]+)::\s*([^:]+)::\s*(.*)$/);
        if (nextHeader) break;
        data += "\n" + next;
        i++;
      }
      map[cmd] = { action, data: data.trim() };
    }
    return map;
  }

  // Load both TXT files
  async function loadTxtFiles() {
    try {
      const [cmdRaw, outRaw] = await Promise.all([
        fetchText("/courses/terminal-1/txt/command.txt"),
        fetchText("/courses/terminal-1/txt/command-output.txt")
      ]);
      commandsIndex = parseCommandsTxt(cmdRaw);
      outputsIndex = parseOutputTxt(outRaw);
    } catch (err) {
      console.error("Failed to load TXT files", err);
      printLine("Error loading terminal content. Check console.");
    }
  }

  // Show help (sorted)
  async function showHelp() {
    const keys = Object.keys(commandsIndex).sort();
    if (!keys.length) {
      await typeLine("[no commands loaded]");
      return;
    }
    await typeLine("[HELP] available commands:");
    await typeLine("");
    for (const key of keys) {
      await typeLine(`  ${key} :: ${commandsIndex[key]}`);
    }
  }

  // Gateway sequence (first-run)
  async function gatewaySequence() {
    inputEl.disabled = true;
    await typeLine("booting exit node...");
    await sleep(120);
    await typeLine("linking to THE CODE...");
    await sleep(120);
    await typeLine("you are leaving the matrix.");
    await sleep(120);
    await typeLine("proceed? (y/n)");
    inputEl.disabled = false;
    inputEl.focus();
  }

  async function handleGatewayInput(value) {
    const v = value.trim().toLowerCase();
    printLine("$ " + value);
    if (v === "y" || v === "yes") {
      gatewayPassed = true;
      await typeLine("establishing secure link...");
      await sleep(150);
      await typeLine("dropping matrix overlay...");
      await sleep(150);
      showLoadingScreen();
      await sleep(700);
      outEl.innerHTML = "";
      await loadTxtFiles();
      await showIntro();
      return;
    }
    if (v === "n" || v === "no") {
      await typeLine("exit aborted. returning to matrix...");
      await sleep(300);
      // safe fallback — you can change this to any route
      window.location.href = "/404.html";
      return;
    }
    await typeLine("invalid response. type y or n.");
  }

  // Loading screen helpers
  function showLoadingScreen() {
    if (!loadingScreen) return;
    loadingScreen.classList.remove("hidden");
    loadingScreen.classList.add("active");
  }
  function hideLoadingScreen() {
    if (!loadingScreen) return;
    loadingScreen.classList.remove("active");
    loadingScreen.classList.add("hidden");
  }

  // Intro after gateway
  async function showIntro() {
    hideLoadingScreen();
    await typeLine("WELCOME TO THE CODE");
    await typeLine("-------------------");
    await typeLine("terminal 1 — orientation and philosophy");
    await typeLine("");
    await typeLine("type help to see commands.");
    await typeLine("");
    promptLabel.textContent = "$";
  }

  // Unlock Terminal 2
  async function unlockTerminal2() {
    printLine("");
    await typeLine("initializing unlock sequence...");
    await sleep(300);
    await typeLine("verifying access...");
    await sleep(300);
    await typeLine("redirecting to terminal 2...");
    await sleep(500);
    // redirect to Terminal 2 page
    window.location.href = "/courses/terminal-2/index.html";
  }

  // Dynamically load a script (used for type tutor and math)
  async function loadScriptOnce(src) {
    if (document.querySelector(`script[data-src="${src}"]`)) return;
    return new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = src;
      s.setAttribute("data-src", src);
      s.onload = () => resolve();
      s.onerror = (e) => reject(new Error("Failed to load " + src));
      document.body.appendChild(s);
    });
  }

  // Execute an output entry (print or run script)
  async function executeOutputFor(cmd, rawArgs = "") {
    const key = cmd.toLowerCase();
    const entry = outputsIndex[key];
    if (!entry) {
      // fallback: if command exists in commandsIndex, print short desc
      if (commandsIndex[key]) {
        await typeLine(commandsIndex[key]);
        return;
      }
      await typeLine("Unknown command. Type help.");
      return;
    }

    const action = entry.action;
    const data = entry.data || "";

    if (action === "print") {
      // replace placeholders
      const out = data
        .replace(/\{cwd\}/g, "/")
        .replace(/\{history\}/g, history.join("\n"))
        .replace(/\{args\}/g, rawArgs);
      printPre(out);
      return;
    }

    if (action === "script") {
      // script data contains a token like RUN:typing or RUN:math or a JS path
      const token = data.trim();
      if (token.startsWith("RUN:")) {
        const what = token.slice(4).trim();
        if (what === "typing") {
          // load type tutor script and call its entry if present
          try {
            await loadScriptOnce("/courses/terminal-1/js/type-tutor.js");
            if (window.TypeTutor && typeof window.TypeTutor.start === "function") {
              window.TypeTutor.start({ outEl, inputEl });
            } else {
              await typeLine("Typing tutor loaded. Run 'typing course' to start.");
            }
          } catch (e) {
            console.error(e);
            await typeLine("Failed to load typing tutor.");
          }
          return;
        }
        if (what === "math") {
          try {
            await loadScriptOnce("/courses/terminal-1/js/math.js");
            if (window.MathClass && typeof window.MathClass.start === "function") {
              window.MathClass.start({ outEl, inputEl });
            } else {
              await typeLine("Math module loaded. Run 'math practice' to start drills.");
            }
          } catch (e) {
            console.error(e);
            await typeLine("Failed to load math module.");
          }
          return;
        }
        // allow direct JS path after RUN:
        if (what.startsWith("/")) {
          try {
            await loadScriptOnce(what);
            await typeLine(`Loaded script: ${what}`);
          } catch (e) {
            console.error(e);
            await typeLine(`Failed to load script: ${what}`);
          }
          return;
        }
      }
      await typeLine("[script] Unknown script action: " + token);
      return;
    }

    // unknown action
    await typeLine(`[engine] Unknown action: ${action}`);
  }

  // Run command (core)
  async function runCommand(raw) {
    const cmd = raw.trim();
    if (!cmd) return;

    history.push(cmd);

    // special-case help
    if (cmd.toLowerCase() === "help" || cmd.toLowerCase() === "-help") {
      await showHelp();
      return;
    }

    // unlock
    if (cmd.toLowerCase() === "code unlock") {
      await executeOutputFor("code unlock");
      await unlockTerminal2();
      return;
    }

    // direct mapping to outputsIndex
    const handled = await executeOutputFor(cmd, "");
    return handled;
  }

  // Router / respond
  async function respond(value) {
    const raw = value.trim();
    if (!raw) return;
    printLine("$ " + value);
    await sleep(60);
    if (!gatewayPassed) {
      await handleGatewayInput(value);
      return;
    }
    await runCommand(value);
  }

  // Input handler
  inputEl.addEventListener("keydown", async e => {
    if (e.key === "Enter") {
      const value = inputEl.value;
      inputEl.value = "";
      await respond(value);
    }
    if (e.key === "c" && e.ctrlKey) {
      // emulate Ctrl+C behavior
      printLine("^C");
      inputEl.value = "";
    }
  });

  // Boot
  gatewaySequence();

  // Expose for debugging
  window.LandingTerminal = {
    loadTxtFiles,
    commandsIndex,
    outputsIndex,
    runCommand,
    executeOutputFor
  };
})();
