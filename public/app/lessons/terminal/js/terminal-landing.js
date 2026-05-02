const outEl = document.getElementById("terminal-output");
const inputEl = document.getElementById("terminal-input");
const promptLabel = document.getElementById("prompt-label");
const loadingScreen = document.getElementById("loading-screen");

let gatewayPassed = false;

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

    loadingScreen.classList.remove("hidden");
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

const showIndexTerminal = async () => {
  loadingScreen.classList.add("hidden");

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

const respond = async cmd => {
  const value = cmd.trim();
  if (!value) return;

  printLine("$ " + value);
  await sleep(200);

  const base = value.split(" ")[0].toLowerCase();

  if (base === "-help" || base === "help") return showHelp();
  if (base === "clear") return (outEl.innerHTML = "");

  const map = {
    web: cmdWeb,
    mcu: cmdMCU,
    tools: cmdTools,
    ethics: cmdEthics,
    career: cmdCareer,
    time: cmdTime,
    pricing: cmdPricing,
    roadmap: cmdRoadmap,
    stack: cmdStack,
    workbench: cmdWorkbench,
    enroll: cmdEnroll
  };

  if (map[base]) return map[base]();

  await typeLine("unknown command. type -help for options.");
};

inputEl.addEventListener("keydown", async e => {
  if (e.key === "Enter") {
    const value = inputEl.value;
    inputEl.value = "";

    if (!gatewayPassed) return handleGatewayInput(value);
    return respond(value);
  }
});

gatewaySequence();
