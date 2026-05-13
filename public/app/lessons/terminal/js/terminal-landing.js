/* ============================================================
   THE CODE — TERMINAL LANDING (PATH FIX: NO "public" PREFIX)
   Location expected:
     /app/lessons/terminal/js/landing.js
   TXT files expected:
     /app/lessons/terminal/js/txt/command.txt
     /app/lessons/terminal/js/txt/command-output.txt
   This file is a drop-in replacement for your previous script.
   It reads both TXT files from the corrected paths and supports
   RUN:typing and RUN:math script tokens (loads type-tutor.js and math.js).
   ============================================================ */

// NO IMPORTS — this file owns everything

const outEl = document.getElementById("terminal-output");
const inputEl = document.getElementById("terminal-input");
const promptLabel = document.getElementById("prompt-label");
const loadingScreen = document.getElementById("loading-screen");

let gatewayPassed = false;
let commandsIndex = {}; // short descriptions from command.txt
let outputsIndex = {};  // full outputs from command-output.txt
let history = [];

/* ============================================================
   UTILITIES
   ============================================================ */

const sleep = ms => new Promise(r => setTimeout(r, ms));

const scrollToBottom = () => { outEl.scrollTop = outEl.scrollHeight; };

const typeLine = async (text, speed = 12) => {
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

/* ============================================================
   TXT LOADING & PARSING
   ============================================================ */

async function fetchText(path) {
  const res = await fetch(path, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to load ${path}: ${res.status}`);
  return await res.text();
}

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

function parseOutputTxt(raw) {
  // Format: command :: action :: data (data may be multi-line until blank line)
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

const loadTxtFiles = async () => {
  try {
    // CORRECTED PATHS (no "public" prefix)
    const cmdPath = "/app/lessons/terminal/js/txt/command.txt";
    const outPath = "/app/lessons/terminal/js/txt/command-output.txt";

    const [cmdRaw, outRaw] = await Promise.all([
      fetchText(cmdPath),
      fetchText(outPath).catch(() => "") // command-output optional
    ]);

    commandsIndex = parseCommandsTxt(cmdRaw);
    outputsIndex = outRaw ? parseOutputTxt(outRaw) : {};
  } catch (err) {
    console.error("Failed to load TXT files", err);
    printLine("Error loading terminal content. Check console for details.");
  }
};

/* ============================================================
   HELP
   ============================================================ */

const showHelp = async () => {
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
};

/* ============================================================
   GATEWAY
   ============================================================ */

const gatewaySequence = async () => {
  inputEl.disabled = true;

  await typeLine("booting exit node...");
  await sleep(150);
  await typeLine("linking to THE CODE...");
  await sleep(150);
  await typeLine("you are leaving the matrix.");
  await sleep(150);
  await typeLine("proceed? (y/n)");

  inputEl.disabled = false;
  inputEl.focus();
};

const handleGatewayInput = async value => {
  const v = value.trim().toLowerCase();
  printLine("> " + value);

  if (v === "y" || v === "yes") {
    gatewayPassed = true;

    await typeLine("establishing secure link...");
    await sleep(150);
    await typeLine("dropping matrix overlay...");
    await sleep(150);

    showLoadingScreen();
    await sleep(600);

    outEl.innerHTML = "";
    await loadTxtFiles();
    await showIntro();
    return;
  }

  if (v === "n" || v === "no") {
    await typeLine("exit aborted. returning to matrix...");
    await sleep(300);
    window.location.href = "/404.html";
    return;
  }

  await typeLine("invalid response. type y or n.");
};

/* ============================================================
   LOADING SCREEN
   ============================================================ */

const showLoadingScreen = () => {
  if (!loadingScreen) return;
  loadingScreen.classList.remove("hidden");
  loadingScreen.classList.add("active");
};

const hideLoadingScreen = () => {
  if (!loadingScreen) return;
  loadingScreen.classList.add("hidden");
};

/* ============================================================
   INTRO
   ============================================================ */

const showIntro = async () => {
  hideLoadingScreen();

  await typeLine("WELCOME TO THE CODE");
  await typeLine("-------------------");
  await typeLine("preview terminal loaded.");
  await typeLine("");
  await typeLine("type help to see commands.");
  await typeLine("");

  promptLabel.textContent = "$";
};

/* ============================================================
   DYNAMIC SCRIPT LOADER (typing & math)
   ============================================================ */

const loadScriptOnce = async src => {
  if (document.querySelector(`script[data-src="${src}"]`)) return;
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = src;
    s.setAttribute("data-src", src);
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Failed to load " + src));
    document.body.appendChild(s);
  });
};

/* ============================================================
   OUTPUT EXECUTION (prints or runs script tokens)
   ============================================================ */

const executeOutputFor = async (cmd, rawArgs = "") => {
  const key = cmd.toLowerCase();
  const entry = outputsIndex[key];

  if (!entry) {
    // fallback: if command exists in commandsIndex, print short desc
    if (commandsIndex[key]) {
      await typeLine(commandsIndex[key]);
      return true;
    }
    return false;
  }

  const action = entry.action;
  const data = entry.data || "";

  if (action === "print") {
    const out = data
      .replace(/\{cwd\}/g, "/")
      .replace(/\{history\}/g, history.join("\n"))
      .replace(/\{args\}/g, rawArgs);
    printPre(out);
    return true;
  }

  if (action === "script") {
    const token = data.trim();
    if (token.startsWith("RUN:")) {
      const what = token.slice(4).trim();
      if (what === "typing") {
        try {
          await loadScriptOnce("/app/lessons/terminal/js/type-tutor.js");
          if (window.TypeTutor && typeof window.TypeTutor.start === "function") {
            window.TypeTutor.start({ outEl, inputEl });
          } else {
            await typeLine("Typing tutor loaded. Run 'typing course' or 'typing practice' to start.");
          }
        } catch (e) {
          console.error(e);
          await typeLine("Failed to load typing tutor.");
        }
        return true;
      }
      if (what === "math") {
        try {
          await loadScriptOnce("/app/lessons/terminal/js/math.js");
          if (window.MathClass && typeof window.MathClass.start === "function") {
            window.MathClass.start({ outEl, inputEl });
          } else {
            await typeLine("Math module loaded. Run 'math practice' to start drills.");
          }
        } catch (e) {
          console.error(e);
          await typeLine("Failed to load math module.");
        }
        return true;
      }
      // allow direct path after RUN:
      if (what.startsWith("/")) {
        try {
          await loadScriptOnce(what);
          await typeLine(`Loaded script: ${what}`);
        } catch (e) {
          console.error(e);
          await typeLine(`Failed to load script: ${what}`);
        }
        return true;
      }
    }
    await typeLine("[script] Unknown script action: " + token);
    return true;
  }

  await typeLine(`[engine] Unknown action: ${action}`);
  return true;
};

/* ============================================================
   UNLOCK → TERMINAL 2
   ============================================================ */

const unlockTerminal2 = async () => {
  printLine("");
  await typeLine("initializing unlock sequence...");
  await sleep(300);
  await typeLine("verifying access...");
  await sleep(300);
  await typeLine("redirecting to terminal 2...");
  await sleep(500);

  // redirect to Terminal 2 (adjust path if your Terminal 2 lives elsewhere)
  window.location.href = "/app/lessons/terminal/terminal2/pages/terminal2.html";
};

/* ============================================================
   COMMAND ENGINE
   ============================================================ */

const runCommand = async raw => {
  const cmd = raw.trim();
  if (!cmd) return false;

  history.push(cmd);

  // help
  if (cmd.toLowerCase() === "help" || cmd.toLowerCase() === "-help") {
    await showHelp();
    return true;
  }

  // gateway-only commands handled elsewhere
  if (!gatewayPassed) return false;

  // code unlock (single gateway)
  if (cmd.toLowerCase() === "code unlock") {
    // if there's an output entry for code unlock, print it first
    if (outputsIndex["code unlock"]) await executeOutputFor("code unlock");
    await unlockTerminal2();
    return true;
  }

  // typing / math quick aliases
  const lc = cmd.toLowerCase();
  if (lc === "typing" || lc === "typing course" || lc === "typing practice") {
    if (outputsIndex["typing"] && outputsIndex["typing"].action === "script") {
      await executeOutputFor("typing");
      return true;
    }
    // fallback: try to load directly
    await executeOutputFor("typing");
    return true;
  }
  if (lc === "math" || lc === "math practice" || lc === "math beginner") {
    if (outputsIndex["math"] && outputsIndex["math"].action === "script") {
      await executeOutputFor("math");
      return true;
    }
    await executeOutputFor("math");
    return true;
  }

  // direct mapping to outputsIndex (full content)
  const handled = await executeOutputFor(cmd);
  if (handled) return true;

  // fallback: check commandsIndex for short description
  const shortKey = cmd.toLowerCase();
  if (commandsIndex[shortKey]) {
    await typeLine(commandsIndex[shortKey]);
    return true;
  }

  return false;
};

/* ============================================================
   ROUTER
   ============================================================ */

const respond = async value => {
  const raw = value.trim();
  if (!raw) return;

  printLine("$ " + value);
  await sleep(60);

  if (!gatewayPassed) {
    await handleGatewayInput(value);
    return;
  }

  const handled = await runCommand(value);
  if (handled) return;

  await typeLine("unknown command. type help for options.");
};

/* ============================================================
   INPUT HANDLER
   ============================================================ */

inputEl.addEventListener("keydown", async e => {
  if (e.key === "Enter") {
    const value = inputEl.value;
    inputEl.value = "";

    if (!gatewayPassed) {
      await handleGatewayInput(value);
    } else {
      await respond(value);
    }
  }

  if (e.key === "c" && e.ctrlKey) {
    // emulate Ctrl+C behavior
    printLine("^C");
    inputEl.value = "";
  }
});

/* ============================================================
   BOOT
   ============================================================ */

gatewaySequence();

// expose for debugging
window.LandingTerminal = {
  loadTxtFiles,
  commandsIndex,
  outputsIndex,
  runCommand,
  executeOutputFor
};
