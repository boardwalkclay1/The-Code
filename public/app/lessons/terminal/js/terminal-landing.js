/* ============================================================
   THE CODE — TERMINAL GATEWAY MASTER LOGIC
   Handles:
   - Matrix typing engine
   - Gateway question
   - Y/N validation
   - 404 redirect
   - Static flash
   - Loading screen
   - Index reveal
   - Command router
   - Long descriptions
   ============================================================ */

const outEl = document.getElementById("terminal-output");
const inputEl = document.getElementById("terminal-input");
const promptLabel = document.getElementById("prompt-label");
const loadingScreen = document.getElementById("loading-screen");

let gatewayPassed = false;

/* ============================================================
   TYPEWRITER ENGINE
   ============================================================ */
const typeLine = (text, speed = 20) => {
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

const sleep = ms => new Promise(r => setTimeout(r, ms));

/* ============================================================
   STATIC FLASH EFFECT
   ============================================================ */
const flashStatic = () => {
  const div = document.createElement("div");
  div.className = "static-flash";
  document.body.appendChild(div);
  setTimeout(() => div.remove(), 500);
};

/* ============================================================
   GATEWAY SEQUENCE
   ============================================================ */
const gatewaySequence = async () => {
  inputEl.disabled = true;

  await typeLine("booting exit node...");
  await sleep(300);
  await typeLine("linking to THE CODE...");
  await sleep(300);
  await typeLine("you are leaving the matrix.");
  await sleep(300);
  await typeLine("proceed? (y/n)");

  inputEl.disabled = false;
  inputEl.focus();
};

/* ============================================================
   HANDLE GATEWAY INPUT
   ============================================================ */
const handleGatewayInput = async (value) => {
  const v = value.trim().toLowerCase();

  printLine("> " + value);

  if (v === "y" || v === "yes") {
    gatewayPassed = true;

    await sleep(300);
    await typeLine("establishing secure link...");
    await sleep(300);
    await typeLine("dropping matrix overlay...");
    await sleep(300);

    flashStatic();
    await sleep(400);

    showLoadingScreen();
    await sleep(1500);

    outEl.innerHTML = "";
    await showIndexTerminal();
    return;
  }

  if (v === "n" || v === "no") {
    await typeLine("exit aborted. returning to matrix...");
    await sleep(500);
    window.location.href = "/404.html";
    return;
  }

  await typeLine("invalid response. type y or n.");
};

/* ============================================================
   MATRIX LOADING SCREEN
   ============================================================ */
const showLoadingScreen = () => {
  loadingScreen.classList.remove("hidden");
  loadingScreen.classList.add("active");
};

/* ============================================================
   INDEX TERMINAL (AFTER GATEWAY)
   ============================================================ */
const showIndexTerminal = async () => {
  loadingScreen.classList.add("hidden");

  await typeLine("WELCOME TO THE CODE TERMINAL");
  await typeLine("--------------------------------");
  await typeLine("this interface never leaves the terminal.");
  await typeLine("everything you see is a command away.");
  printLine("");

  await typeLine("lesson categories:");
  await typeLine("  [web]        web development, PWAs, dashboards, widgets");
  await typeLine("  [mcu]        microcontrollers, sensors, automation, hardware control");
  await typeLine("  [tools]      custom tools, scripts, workflows, business automations");
  await typeLine("  [ethics]     ethical hacking, security, and real system understanding");
  await typeLine("  [career]     pay ranges, roles, and how each field gets paid");
  await typeLine("  [time]       lesson lengths, pacing, and how long mastery takes");
  printLine("");

  await typeLine("pricing overview:");
  await typeLine("  starter   : $29   — core lessons + workbench");
  await typeLine("  builder   : $79   — web + MCU + automations");
  await typeLine("  master    : $149  — full library + updates + future drops");
  printLine("");

  await typeLine("type -help for available commands.");
  await typeLine("");
  await typeLine("what are you here for?");

  promptLabel.textContent = "$";
};

/* ============================================================
   COMMAND ROUTER
   ============================================================ */
const respond = async (cmd) => {
  const value = cmd.trim();
  if (!value) return;

  printLine("$ " + value);
  await sleep(200);

  const base = value.split(" ")[0].toLowerCase();

  if (base === "-help" || base === "help") {
    await typeLine("available commands:");
    await typeLine("  web");
    await typeLine("  mcu");
    await typeLine("  tools");
    await typeLine("  ethics");
    await typeLine("  career");
    await typeLine("  time");
    await typeLine("  pricing");
    await typeLine("  clear");
    return;
  }

  if (base === "clear") {
    outEl.innerHTML = "";
    return;
  }

  if (base === "web") {
    await typeLine("[WEB DEVELOPMENT]");
    await typeLine("full stack fundamentals, PWAs, dashboards, widgets, UI systems.");
    await typeLine("you build real tools, not vibe code.");
    await typeLine("enroll: /purchase/web");
    return;
  }

  if (base === "mcu") {
    await typeLine("[MICROCONTROLLERS]");
    await typeLine("arduino, esp32, sensors, motors, relays, automation.");
    await typeLine("control the physical world with code.");
    await typeLine("enroll: /purchase/mcu");
    return;
  }

  if (base === "tools") {
    await typeLine("[TOOLS & AUTOMATIONS]");
    await typeLine("custom tools, scripts, workflows, dashboards, business automations.");
    await typeLine("replace manual work with systems.");
    await typeLine("enroll: /purchase/tools");
    return;
  }

  if (base === "ethics") {
    await typeLine("[ETHICAL HACKING]");
    await typeLine("learn how systems break so you can protect them.");
    await typeLine("structured, legal, real security engineering.");
    await typeLine("enroll: /purchase/ethics");
    return;
  }

  if (base === "career") {
    await typeLine("[CAREER & PAY]");
    await typeLine("web dev: $55k–$100k+");
    await typeLine("embedded/MCU: $70k–$120k+");
    await typeLine("security: $80k–$150k+");
    return;
  }

  if (base === "time") {
    await typeLine("[TIME & PACING]");
    await typeLine("starter: 4–6 weeks");
    await typeLine("builder: 8–12 weeks");
    await typeLine("master: ongoing");
    return;
  }

  if (base === "pricing") {
    await typeLine("[PRICING]");
    await typeLine("starter   : $29");
    await typeLine("builder   : $79");
    await typeLine("master    : $149");
    return;
  }

  await typeLine("unknown command. type -help for options.");
};

/* ============================================================
   INPUT HANDLER
   ============================================================ */
inputEl.addEventListener("keydown", async (e) => {
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
   START GATEWAY
   ============================================================ */
gatewaySequence();
