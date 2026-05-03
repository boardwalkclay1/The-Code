/* ============================================================
   THE CODE — TERMINAL LANDING (STANDALONE VERSION)
   ============================================================ */

// NO IMPORTS — this file now runs independently

const outEl = document.getElementById("terminal-output");
const inputEl = document.getElementById("terminal-input");
const promptLabel = document.getElementById("prompt-label");
const loadingScreen = document.getElementById("loading-screen");

let gatewayPassed = false;

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
   PREVIEW TERMINAL INTRO
   ============================================================ */

const showIndexTerminal = async () => {
  hideLoadingScreen();

  await typeLine("WELCOME TO THE CODE");
  await typeLine("-------------------");
  await typeLine("preview terminal loaded.");
  await typeLine("full system access locked.");
  await typeLine("");
  await typeLine("type -help to begin.");

  promptLabel.textContent = "$";
};

/* ============================================================
   COMMAND ROUTER (STANDALONE)
   ============================================================ */

const respond = async value => {
  const cmd = value.trim().toLowerCase();
  if (!cmd) return;

  printLine("$ " + value);
  await sleep(60);

  // Minimal standalone behavior
  if (cmd === "-help" || cmd === "help") {
    await typeLine("this is the preview terminal.");
    await typeLine("full command set unlocks after enrollment.");
    return;
  }

  await typeLine("command unavailable in preview mode.");
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
