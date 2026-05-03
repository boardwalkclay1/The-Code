/* ============================================================
   THE CODE — LANDING TERMINAL (PREVIEW MODE) — FINAL VERSION
   ============================================================ */

const outEl = document.getElementById("terminal-output");
const inputEl = document.getElementById("terminal-input");
const promptLabel = document.getElementById("prompt-label");
const loadingScreen = document.getElementById("loading-screen");

let gatewayPassed = false;

const sleep = ms => new Promise(r => setTimeout(r, ms));

const typeLine = (text, speed = 12) => {
  return new Promise(resolve => {
    const line = document.createElement("div");
    line.className = "terminal-line";
    outEl.appendChild(line);

    let i = 0;
    const interval = setInterval(() => {
      line.textContent = text.slice(0, i);
      i++;
      outEl.scrollTop = outEl.scrollHeight;

      if (i > text.length) {
        clearInterval(interval);
        resolve();
      }
    }, speed);
  });
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
  setTimeout(() => div.remove(), 500);
};

/* ============================================================
   COMMAND ENGINE (EXTERNAL)
   ============================================================ */

import { CommandEngine } from "./js/command.js";

/* ============================================================
   GATEWAY SEQUENCE
   ============================================================ */

const gatewaySequence = async () => {
  inputEl.disabled = true;

  await typeLine("booting exit node...");
  await sleep(200);
  await typeLine("linking to THE CODE...");
  await sleep(200);
  await typeLine("you are leaving the matrix.");
  await sleep(200);
  await typeLine("proceed? (y/n)");

  inputEl.disabled = false;
  inputEl.focus();
};

const handleGatewayInput = async value => {
  const v = value.trim().toLowerCase();

  printLine("> " + value);

  if (v === "y" || v === "yes") {
    gatewayPassed = true;

    await sleep(200);
    await typeLine("establishing secure link...");
    await sleep(200);
    await typeLine("dropping matrix overlay...");
    await sleep(200);

    flashStatic();
    await sleep(300);

    showLoadingScreen();
    await sleep(1200);

    outEl.innerHTML = "";
    await showIndexTerminal();
    return;
  }

  if (v === "n" || v === "no") {
    await typeLine("exit aborted. returning to matrix...");
    await sleep(400);
    window.location.href = "/404.html";
    return;
  }

  await typeLine("invalid response. type y or n.");
};

/* ============================================================
   LOADING + INDEX
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

const showIndexTerminal = async () => {
  hideLoadingScreen();

  await typeLine("WELCOME TO THE CODE TERMINAL (PREVIEW MODE)");
  await typeLine("--------------------------------------------");
  await typeLine("you are not in the full system yet.");
  await typeLine("this is the preview terminal.");
  await typeLine("after enrollment, you unlock the full command set.");
  printLine("");

  await typeLine("type -help for command descriptions.");
  await typeLine("");
  await typeLine("what do you want to explore?");
  promptLabel.textContent = "$";
};

/* ============================================================
   COMMAND ROUTER (FINAL)
   ============================================================ */

const respond = async value => {
  const cmd = value.trim().toLowerCase();
  if (!cmd) return;

  printLine("$ " + value);
  await sleep(80);

  // EXPLAIN COMMANDS
  if (cmd.endsWith(" explain")) {
    const base = cmd.replace(" explain", "").trim();
    const explanation = await CommandEngine.getExplainText(base);

    if (explanation) {
      await typeLine(explanation);
    } else {
      await typeLine("no explanation found for: " + base);
    }
    return;
  }

  // ROUTE THROUGH COMMAND ENGINE
  const handled = await CommandEngine.run(cmd);
  if (handled !== false) return;

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
