/* ============================================================
   THE CODE — TERMINAL GATEWAY + LANDING
   ============================================================ */

const outEl = document.getElementById("terminal-output");
const inputEl = document.getElementById("terminal-input");
const promptLabel = document.getElementById("prompt-label");
const loadingScreen = document.getElementById("loading-screen");

let gatewayPassed = false;

/* CORE HELPERS */

const sleep = ms => new Promise(r => setTimeout(r, ms));

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

const printBlock = html => {
  const line = document.createElement("div");
  line.className = "terminal-line";
  line.innerHTML = html;
  outEl.appendChild(line);
  outEl.scrollTop = outEl.scrollHeight;
};

const flashStatic = () => {
  const div = document.createElement("div");
  div.className = "static-flash";
  document.body.appendChild(div);
  setTimeout(() => div.remove(), 500);
};

/* GATEWAY SEQUENCE */

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

const handleGatewayInput = async value => {
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

/* LOADING + INDEX */

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

  await typeLine("WELCOME TO THE CODE TERMINAL");
  await typeLine("--------------------------------");
  await typeLine("this interface never leaves the terminal.");
  await typeLine("everything you see is a command away.");
  printLine("");

  await typeLine("intro commands (type -help for full list):");
  await typeLine("  web, mcu, tools, ethics, career, time, pricing, roadmap, stack, workbench, enroll");
  printLine("");

  await typeLine("type -help for detailed command descriptions.");
  await typeLine("");
  await typeLine("what are you here for?");

  promptLabel.textContent = "$";
};

/* HELP + COMMANDS (your existing ones) */

const showHelp = async () => {
  await typeLine("[HELP] introductory commands and what they reveal:");
  await typeLine("");
  await typeLine("  web       : overview of web development path, what you build, and why it matters.");
  await typeLine("              shows a visual map of front-end, back-end, and full-stack flows.");
  await typeLine("");
  await typeLine("  mcu       : microcontrollers, sensors, motors, automation, hardware control.");
  await typeLine("              shows a diagram of code -> board -> real-world action.");
  await typeLine("");
  await typeLine("  tools     : custom tools, widgets, dashboards, and automations.");
  await typeLine("              shows examples of internal tools and business systems.");
  await typeLine("");
  await typeLine("  ethics    : ethical hacking, security, and how it differs from 'vibe coding'.");
  await typeLine("              shows a security layers diagram and role breakdown.");
  await typeLine("");
  await typeLine("  career    : pay ranges, roles, and paths for each track.");
  await typeLine("              shows a terminal-style salary table.");
  await typeLine("");
  await typeLine("  time      : lesson lengths, pacing, and realistic timelines.");
  await typeLine("              shows a progress bar diagram for each tier.");
  await typeLine("");
  await typeLine("  pricing   : starter / builder / master breakdown and what each unlocks.");
  await typeLine("              shows a pricing grid and upgrade path.");
  await typeLine("");
  await typeLine("  roadmap   : how the curriculum flows from zero to building your own systems.");
  await typeLine("              shows a step-by-step roadmap diagram.");
  await typeLine("");
  await typeLine("  stack     : tools, languages, frameworks, and hardware we actually use.");
  await typeLine("              shows a stack diagram (web + MCU + automation).");
  await typeLine("");
  await typeLine("  workbench : explains THE CODE workbench environment and how you’ll build inside it.");
  await typeLine("              shows a terminal-style layout diagram.");
  await typeLine("");
  await typeLine("  enroll    : how to join, what happens after payment, and how access is delivered.");
  await typeLine("              shows links to purchase endpoints.");
};

/* your cmdWeb, cmdMCU, cmdTools, etc. stay as you wrote them */

const respond = async cmd => {
  const value = cmd.trim();
  if (!value) return;

  printLine("$ " + value);
  await sleep(200);

  const base = value.split(" ")[0].toLowerCase();

  if (base === "-help" || base === "help") return showHelp();
  if (base === "clear") {
    outEl.innerHTML = "";
    return;
  }

  if (base === "web")      return cmdWeb();
  if (base === "mcu")      return cmdMCU();
  if (base === "tools")    return cmdTools();
  if (base === "ethics")   return cmdEthics();
  if (base === "career")   return cmdCareer();
  if (base === "time")     return cmdTime();
  if (base === "pricing")  return cmdPricing();
  if (base === "roadmap")  return cmdRoadmap();
  if (base === "stack")    return cmdStack();
  if (base === "workbench")return cmdWorkbench();
  if (base === "enroll")   return cmdEnroll();

  await typeLine("unknown command. type -help for options.");
};

/* INPUT HANDLER */

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

/* BOOT */

gatewaySequence();
