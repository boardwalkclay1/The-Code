/* ============================================================
   THE CODE — TERMINAL LANDING (ALL-IN-ONE ENGINE)
   ============================================================ */

// NO IMPORTS — this file owns the whole terminal

const outEl = document.getElementById("terminal-output");
const inputEl = document.getElementById("terminal-input");
const promptLabel = document.getElementById("prompt-label");
const loadingScreen = document.getElementById("loading-screen");

let gatewayPassed = false;
let commandsIndex = {};   // { cmd: { name, desc, explain, diagramKey } }

/* ============================================================
   UTILITIES
   ============================================================ */

const sleep = ms => new Promise(r => setTimeout(r, ms));

const typeLine = async (text, speed = 12) => {
  const line = document.createElement("div");
  line.className = "terminal-line";
  outEl.appendChild(line);

  for (let i = 0; i <= text.length; i++) {
    line.textContent = text.slice(0, i);
    outEl.scrollTop = outEl.scrollHeight;
    await sleep(speed);
  }
};

const printLine = (text = "") => {
  const line = document.createElement("div");
  line.className = "terminal-line";
  line.textContent = text;
  outEl.appendChild(line);
  outEl.scrollTop = outEl.scrollHeight;
};

const flashStatic = () => {
  const div = document.createElement("div");
  div.className = "static-flash";
  document.body.appendChild(div);
  setTimeout(() => div.remove(), 350);
};

/* ============================================================
   DIAGRAMS (INLINE FOR NOW)
   ============================================================ */

const Diagrams = {
  web: `
[ BROWSER ] ⇄ [ YOUR APP ] ⇄ [ DATABASE ]
`.trim(),

  mcu: `
[ CODE ] → [ MCU ] → [ REAL WORLD ]
`.trim(),

  github: `
git init
git add .
git commit -m "first commit"
git push
`.trim(),

  bash: `
ls      list files
cd      change directory
mkdir   create folder
`.trim()
};

/* ============================================================
   COMMANDS.TXT LOADER
   ============================================================ */

const loadCommandsTxt = async () => {
  try {
    const res = await fetch("../txt/commands.txt");
    if (!res.ok) return;

    const text = await res.text();
    const lines = text.split("\n");

    commandsIndex = {};

    for (const raw of lines) {
      const line = raw.trim();
      if (!line || line.startsWith("#")) continue;

      // format: command: description | explain | diagramKey
      const [left, right = ""] = line.split(":");
      const name = left.trim().toLowerCase();
      const parts = right.split("|").map(p => p.trim());

      const desc = parts[0] || "";
      const explain = parts[1] || "";
      const diagramKey = parts[2] || "";

      commandsIndex[name] = { name, desc, explain, diagramKey };
    }
  } catch (e) {
    console.error("failed to load commands.txt", e);
  }
};

const listCommands = async () => {
  if (!Object.keys(commandsIndex).length) {
    await typeLine("[no commands loaded from commands.txt]");
    return;
  }

  await typeLine("[HELP] available commands:");
  await typeLine("");

  const names = Object.keys(commandsIndex).sort();
  for (const name of names) {
    const { desc } = commandsIndex[name];
    await typeLine(`  ${name.padEnd(12)} ${desc || ""}`);
  }
};

/* ============================================================
   GATEWAY SEQUENCE
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

    await sleep(150);
    await typeLine("establishing secure link...");
    await sleep(150);
    await typeLine("dropping matrix overlay...");
    await sleep(150);

    flashStatic();
    await sleep(300);

    showLoadingScreen();
    await sleep(1000);

    outEl.innerHTML = "";
    await showIndexTerminal();
    await loadCommandsTxt();
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
   PREVIEW TERMINAL INTRO
   ============================================================ */

const showIndexTerminal = async () => {
  hideLoadingScreen();

  await typeLine("WELCOME TO THE CODE");
  await typeLine("-------------------");
  await typeLine("preview terminal loaded.");
  await typeLine("full system access locked.");
  await typeLine("");
  await typeLine("type -help to see commands.");
  await typeLine("type: code unlock  to open terminal 2.");
  await typeLine("");

  promptLabel.textContent = "$";
};

/* ============================================================
   UNLOCK → TERMINAL 2
   ============================================================ */

const flickerScreen = () => {
  const el = document.body;
  el.style.transition = "none";
  el.style.opacity = "0.2";
  setTimeout(() => {
    el.style.opacity = "1";
    setTimeout(() => {
      el.style.opacity = "0.4";
      setTimeout(() => {
        el.style.opacity = "1";
        el.style.transition = "";
      }, 120);
    }, 120);
  }, 120);
};

const runUnlockSequence = async () => {
  printLine("");
  await typeLine("initializing unlock sequence...");
  flickerScreen();
  await sleep(300);

  await typeLine("verifying access...");
  await sleep(300);

  await typeLine("activating gateway...");
  flickerScreen();
  await sleep(300);

  printLine("");
  await typeLine("redirecting to terminal 2...");
  await sleep(500);

  window.location.href = "./terminal2/terminal2.html";
};

/* ============================================================
   COMMAND ENGINE (INLINE)
   ============================================================ */

const handleExplain = async base => {
  const key = base.toLowerCase();
  const meta = commandsIndex[key];

  if (!meta || !meta.explain) {
    await typeLine("no explanation found for: " + base);
    return;
  }

  const lines = meta.explain.trim().split("\n");
  for (const line of lines) {
    await typeLine(line);
  }

  const diagramKey = meta.diagramKey || key;
  if (Diagrams[diagramKey]) {
    await typeLine("");
    const dLines = Diagrams[diagramKey].split("\n");
    for (const line of dLines) {
      await typeLine(line);
    }
  }
};

const runCommand = async cmd => {
  const base = cmd.split(" ")[0].toLowerCase();

  // special: code unlock
  if (base === "code" && cmd.toLowerCase().trim() === "code unlock") {
    await runUnlockSequence();
    return true;
  }

  // from commands.txt
  if (commandsIndex[base]) {
    const meta = commandsIndex[base];
    if (meta.desc) {
      await typeLine(meta.desc);
    } else {
      await typeLine(`command: ${base}`);
    }
    return true;
  }

  return false;
};

/* ============================================================
   COMMAND ROUTER
   ============================================================ */

const respond = async value => {
  const raw = value.trim();
  if (!raw) return;

  printLine("$ " + value);
  await sleep(60);

  const cmd = raw.toLowerCase();

  if (cmd === "-help" || cmd === "help") {
    await listCommands();
    return;
  }

  if (cmd.endsWith(" explain")) {
    const base = raw.slice(0, raw.toLowerCase().lastIndexOf(" explain")).trim();
    if (!base) {
      await typeLine("usage: <command> explain");
      return;
    }
    await handleExplain(base);
    return;
  }

  const handled = await runCommand(raw);
  if (handled) return;

  await typeLine("unknown command. type -help for options.");
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
});

/* ============================================================
   BOOT
   ============================================================ */

gatewaySequence();
