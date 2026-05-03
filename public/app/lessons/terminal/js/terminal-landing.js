/* ============================================================
   THE CODE — TERMINAL LANDING (SIMPLE VERSION)
   ============================================================ */

// NO IMPORTS — this file owns everything

const outEl = document.getElementById("terminal-output");
const inputEl = document.getElementById("terminal-input");
const promptLabel = document.getElementById("prompt-label");
const loadingScreen = document.getElementById("loading-screen");

let gatewayPassed = false;
let commandsIndex = {}; // { "apps": "shows price...", "apps explain": "explains..." }

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

const printLine = text => {
  const line = document.createElement("div");
  line.className = "terminal-line";
  line.textContent = text;
  outEl.appendChild(line);
  outEl.scrollTop = outEl.scrollHeight;
};

/* ============================================================
   LOAD COMMANDS.TXT
   ============================================================ */

const loadCommandsTxt = async () => {
  try {
    const res = await fetch("../txt/commands.txt");
    const text = await res.text();
    const lines = text.split("\n");

    commandsIndex = {};

    for (const raw of lines) {
      const line = raw.trim();
      if (!line || line.startsWith("#")) continue;

      const parts = line.split("::");
      if (parts.length < 2) continue;

      const name = parts[0].trim().toLowerCase();
      const desc = parts[1].trim();

      commandsIndex[name] = desc;
    }
  } catch (err) {
    console.error("commands.txt failed to load", err);
  }
};

const showHelp = async () => {
  const keys = Object.keys(commandsIndex);
  if (!keys.length) {
    await typeLine("[no commands loaded]");
    return;
  }

  await typeLine("[HELP] available commands:");
  await typeLine("");

  for (const key of keys.sort()) {
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
    await sleep(800);

    outEl.innerHTML = "";
    await showIntro();
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
  loadingScreen.classList.remove("hidden");
  loadingScreen.classList.add("active");
};

const hideLoadingScreen = () => {
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
  await typeLine("type -help to see commands.");
  await typeLine("");

  promptLabel.textContent = "$";
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

  window.location.href = "./terminal2/terminal2.html";
};

/* ============================================================
   COMMAND ENGINE
   ============================================================ */

const runCommand = async raw => {
  const cmd = raw.trim().toLowerCase();

  if (cmd === "code unlock") {
    await unlockTerminal2();
    return true;
  }

  if (commandsIndex[cmd]) {
    await typeLine(commandsIndex[cmd]);
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

  if (raw.toLowerCase() === "-help" || raw.toLowerCase() === "help") {
    await showHelp();
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
