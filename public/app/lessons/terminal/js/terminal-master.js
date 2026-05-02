/* ============================================================
   THE CODE — MATRIX ENGINE + TERMINAL MASTER LOGIC
   ============================================================ */

/* ============================================================
   MATRIX RAIN BACKGROUND
   ============================================================ */

const canvas = document.getElementById("matrix-canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const matrixChars =
  "アァカサタナハマヤャラワ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const fontSize = 16;
let columns = Math.floor(canvas.width / fontSize);
let drops = Array(columns).fill(1);

function drawMatrix() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#00ff41";
  ctx.font = fontSize + "px Courier New";

  for (let i = 0; i < drops.length; i++) {
    const text = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
    const x = i * fontSize;
    const y = drops[i] * fontSize;
    ctx.fillText(text, x, y);

    if (y > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
  requestAnimationFrame(drawMatrix);
}
drawMatrix();

/* ============================================================
   TERMINAL CORE
   ============================================================ */

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

  await typeLine("WELCOME TO THE CODE TERMINAL");
  await typeLine("--------------------------------");
  await typeLine("this interface never leaves the terminal.");
  await typeLine("everything you see is a command away.");
  printLine("");

  await typeLine("intro commands:");
  await typeLine("  web, mcu, tools, github, bash, ethics, career, time, pricing");
  await typeLine("  roadmap, stack, workbench, enroll, widgets, automation");
  printLine("");

  await typeLine("type -help for detailed command descriptions.");
  await typeLine("");
  await typeLine("what are you here for?");

  promptLabel.textContent = "$";
};

/* ============================================================
   HELP SYSTEM
   ============================================================ */

const showHelp = async () => {
  await typeLine("[HELP] available commands and what they reveal:");
  await typeLine("");

  const helpItems = [
    ["web", "learn how websites, apps, dashboards, and tools are built."],
    ["mcu", "learn microcontrollers, sensors, motors, and automation."],
    ["tools", "learn internal tools, business systems, and workflow automation."],
    ["github", "learn version control, repos, commits, branches, and collaboration."],
    ["bash", "learn safe command-line basics and how terminals work."],
    ["widgets", "learn UI components, reusable blocks, and interactive modules."],
    ["automation", "learn how to automate tasks, workflows, and processes safely."],
    ["ethics", "learn safe, responsible security concepts and system design."],
    ["career", "learn roles, pay ranges, and industry paths."],
    ["time", "learn pacing, lesson lengths, and realistic timelines."],
    ["pricing", "learn about starter, builder, and master plans."],
    ["roadmap", "learn the full path from beginner to building systems."],
    ["stack", "learn the tools, languages, and hardware used in THE CODE."],
    ["workbench", "learn how the in-browser dev environment works."],
    ["enroll", "learn how to join and unlock the full system."]
  ];

  for (const [cmd, desc] of helpItems) {
    await typeLine(`  ${cmd.padEnd(10)} : ${desc}`);
  }
};

/* ============================================================
   COMMANDS (LANDING + FUTURE EXPANSION)
   ============================================================ */

const commands = {
  web: async () => {
    await typeLine("[WEB DEVELOPMENT]");
    await typeLine("you learn to build real interfaces, dashboards, tools, and PWAs.");
    await typeLine("we cover HTML, CSS, JS, APIs, auth, state, and deployment.");
    printBlock(`<pre class="diagram">
  [ BROWSER ] ⇄ [ YOUR APP ] ⇄ [ DATABASE ]
</pre>`);
  },

  mcu: async () => {
    await typeLine("[MICROCONTROLLERS]");
    await typeLine("learn how code interacts with sensors, motors, and hardware.");
    printBlock(`<pre class="diagram">
  [ CODE ] → [ MCU ] → [ REAL WORLD ]
</pre>`);
  },

  tools: async () => {
    await typeLine("[TOOLS & SYSTEMS]");
    await typeLine("learn how to build internal tools, dashboards, and utilities.");
  },

  github: async () => {
    await typeLine("[GITHUB BASICS]");
    await typeLine("learn repos, commits, branches, pull requests, and collaboration.");
    printBlock(`<pre class="diagram">
  git init
  git add .
  git commit -m "first commit"
  git push
</pre>`);
  },

  bash: async () => {
    await typeLine("[BASH BASICS]");
    await typeLine("safe introduction to command-line navigation and scripting.");
    printBlock(`<pre class="diagram">
  ls      list files
  cd      change directory
  mkdir   create folder
</pre>`);
  },

  widgets: async () => {
    await typeLine("[WIDGETS]");
    await typeLine("learn reusable UI components and interactive modules.");
  },

  automation: async () => {
    await typeLine("[AUTOMATION]");
    await typeLine("learn how to automate tasks and workflows safely.");
  },

  ethics: async () => {
    await typeLine("[RESPONSIBLE SECURITY]");
    await typeLine("learn safe, ethical system design and protection concepts.");
  },

  career: async () => {
    await typeLine("[CAREER PATHS]");
    printBlock(`<pre class="diagram">
  web dev:   55k–100k+
  mcu:       70k–120k+
  security:  80k–150k+
</pre>`);
  },

  time: async () => {
    await typeLine("[TIME & PACING]");
    printBlock(`<pre class="diagram">
  starter: 4–6 weeks
  builder: 8–12 weeks
  master: ongoing
</pre>`);
  },

  pricing: async () => {
    await typeLine("[PRICING]");
    printBlock(`<pre class="diagram">
  starter: $29
  builder: $79
  master:  $149
</pre>`);
  },

  roadmap: async () => {
    await typeLine("[ROADMAP]");
    await typeLine("step-by-step path from beginner to building systems.");
  },

  stack: async () => {
    await typeLine("[STACK]");
    await typeLine("web + MCU + automation tools used in THE CODE.");
  },

  workbench: async () => {
    await typeLine("[WORKBENCH]");
    await typeLine("your in-browser dev environment for building everything.");
  },

  enroll: async () => {
    await typeLine("[ENROLL]");
    await typeLine("purchase links:");
    await typeLine("  /purchase/starter");
    await typeLine("  /purchase/builder");
    await typeLine("  /purchase/master");
  }
};

/* ============================================================
   COMMAND ROUTER
   ============================================================ */

const respond = async cmd => {
  const value = cmd.trim();
  if (!value) return;

  printLine("$ " + value);
  await sleep(200);

  const base = value.split(" ")[0].toLowerCase();

  if (base === "-help" || base === "help") return showHelp();
  if (base === "clear") return (outEl.innerHTML = "");

  if (commands[base]) return commands[base]();

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
