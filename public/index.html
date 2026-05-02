/* ============================================================
   THE CODE — TERMINAL GATEWAY + LANDING
   ============================================================ */

const outEl = document.getElementById("terminal-output");
const inputEl = document.getElementById("terminal-input");
const promptLabel = document.getElementById("prompt-label");
const loadingScreen = document.getElementById("loading-screen");

let gatewayPassed = false;

/* ===================== CORE HELPERS ======================== */

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

const printBlock = (html) => {
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

/* ===================== GATEWAY SEQUENCE ==================== */

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

/* ===================== LOADING + INDEX ===================== */

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

/* ===================== HELP SYSTEM ========================= */

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

/* ===================== COMMAND RESPONSES =================== */

const cmdWeb = async () => {
  await typeLine("[WEB DEVELOPMENT]");
  await typeLine("you learn to build real interfaces, dashboards, tools, and PWAs — not just toy projects.");
  await typeLine("we cover HTML, CSS, JS, APIs, auth, state, and deployment in a structured way.");
  await typeLine("");
  printBlock(
    `<pre class="diagram">
  [ BROWSER ]  ⇄  [ YOUR APP ]  ⇄  [ DATABASE ]
      |                |                |
   HTML/CSS/JS     ROUTES/API        DATA/LOGIC
    </pre>`
  );
  await sleep(200);
  await typeLine("you’ll ship things that look and feel like real products, not tutorials.");
  await typeLine("enroll: /purchase/web");
};

const cmdMCU = async () => {
  await typeLine("[MICROCONTROLLERS]");
  await typeLine("you learn how to control the physical world with code: sensors, motors, relays, LEDs, and more.");
  await typeLine("we use boards like Arduino and ESP32 to build automation, robotics, and reactive systems.");
  await typeLine("");
  printBlock(
    `<pre class="diagram">
  [ CODE ]  →  [ MCU BOARD ]  →  [ SENSORS / MOTORS / RELAYS ]
      |              |                     |
   logic        pins/signals           real-world action
    </pre>`
  );
  await sleep(200);
  await typeLine("you stop being just a screen dev and start touching the real world.");
  await typeLine("enroll: /purchase/mcu");
};

const cmdTools = async () => {
  await typeLine("[TOOLS & AUTOMATIONS]");
  await typeLine("you build internal tools, dashboards, scripts, and automations that replace manual work.");
  await typeLine("this is where you create leverage: one system that runs 24/7 instead of you.");
  await typeLine("");
  printBlock(
    `<pre class="diagram">
  [ INPUT ] → [ YOUR TOOL ] → [ AUTOMATED OUTPUT ]
      forms      logic, APIs      reports, emails, actions
    </pre>`
  );
  await sleep(200);
  await typeLine("we cover workflow mapping, integration, and how to think in systems.");
  await typeLine("enroll: /purchase/tools");
};

const cmdEthics = async () => {
  await typeLine("[ETHICAL HACKING]");
  await typeLine("you learn how systems fail so you can design and defend them properly.");
  await typeLine("this is structured, legal, and focused on security engineering — not chaos.");
  await typeLine("");
  printBlock(
    `<pre class="diagram">
  [ USER ] → [ APP ] → [ SERVER ] → [ DATA ]
                 ↑         ↑
             attack paths, misconfig, weak auth
    </pre>`
  );
  await sleep(200);
  await typeLine("we walk through threat models, basic exploits, and how to patch them.");
  await typeLine("enroll: /purchase/ethics");
};

const cmdCareer = async () => {
  await typeLine("[CAREER & PAY]");
  await typeLine("rough ranges (varies by region, experience, and niche):");
  printBlock(
    `<pre class="diagram">
  ROLE                 RANGE (USD)
  ---------------------------------------
  web dev (jr)         55k – 80k
  web dev (sr)         100k+
  embedded / MCU       70k – 120k+
  security / hacking   80k – 150k+
  automation / tools   project-based, often high leverage
    </pre>`
  );
  await sleep(200);
  await typeLine("we talk about how to position yourself, not just how to code.");
};

const cmdTime = async () => {
  await typeLine("[TIME & PACING]");
  await typeLine("this is built for people with real lives and limited time.");
  printBlock(
    `<pre class="diagram">
  TIER      HOURS/WEEK      DURATION
  ---------------------------------------
  starter   3–5             ~4–6 weeks
  builder   4–6             ~8–12 weeks
  master    4–8             ongoing, new drops
    </pre>`
  );
  await sleep(200);
  await typeLine("you can go faster or slower — the system doesn’t expire.");
};

const cmdPricing = async () => {
  await typeLine("[PRICING]");
  printBlock(
    `<pre class="diagram">
  PLAN      PRICE      INCLUDES
  -----------------------------------------------
  starter   $29        core lessons + workbench
  builder   $79        web + MCU + automations
  master    $149       full library + updates + future drops
    </pre>`
  );
  await sleep(200);
  await typeLine("you can upgrade from starter → builder → master without losing what you paid.");
  await typeLine("purchase links:");
  await typeLine("  /purchase/starter");
  await typeLine("  /purchase/builder");
  await typeLine("  /purchase/master");
};

const cmdRoadmap = async () => {
  await typeLine("[ROADMAP]");
  await typeLine("from zero to building your own tools, apps, and systems:");
  printBlock(
    `<pre class="diagram">
  1. orientation      — understand the matrix, the stack, and the workbench
  2. web core         — HTML, CSS, JS, layouts, components
  3. data & APIs      — talking to servers, storing and using data
  4. tools & widgets  — dashboards, utilities, internal tools
  5. MCU & hardware   — boards, sensors, motors, automation
  6. security basics  — ethical hacking, hardening, safe design
  7. your system      — build something that actually runs your life or business
    </pre>`
  );
};

const cmdStack = async () => {
  await typeLine("[STACK]");
  await typeLine("we use tools that actually ship products, not just tutorial toys.");
  printBlock(
    `<pre class="diagram">
  WEB:
    - HTML, CSS, JS
    - modern browser APIs
    - lightweight frameworks where needed

  MCU:
    - Arduino / ESP32
    - C/C++ style sketches
    - serial tools, basic electronics

  AUTOMATION:
    - scripts, CLIs, schedulers
    - APIs, webhooks, integrations
    </pre>`
  );
};

const cmdWorkbench = async () => {
  await typeLine("[WORKBENCH]");
  await typeLine("THE CODE workbench is your in-browser lab: terminal, editor, preview, and tools.");
  printBlock(
    `<pre class="diagram">
  +-----------------------------+
  |  TERMINAL   |  PREVIEW      |
  |  commands   |  live output  |
  +-----------------------------+
  |  EDITOR     |  FILE TREE    |
  |  code       |  structure    |
  +-----------------------------+
    </pre>`
  );
  await sleep(200);
  await typeLine("you’ll build inside an environment that feels like a real dev setup, not a toy.");
};

const cmdEnroll = async () => {
  await typeLine("[ENROLL]");
  await typeLine("when you enroll, you get:");
  await typeLine("  - access to the lessons and workbench");
  await typeLine("  - updates as new modules drop");
  await typeLine("  - a clear path, not random videos");
  printBlock(
    `<pre class="diagram">
  FLOW:
    [ choose plan ] → [ checkout ] → [ instant access email ]
    </pre>`
  );
  await sleep(200);
  await typeLine("enroll here:");
  await typeLine("  /purchase/starter");
  await typeLine("  /purchase/builder");
  await typeLine("  /purchase/master");
};

/* ===================== COMMAND ROUTER ====================== */

const respond = async (cmd) => {
  const value = cmd.trim();
  if (!value) return;

  printLine("$ " + value);
  await sleep(200);

  const base = value.split(" ")[0].toLowerCase();

  if (base === "-help" || base === "help") {
    await showHelp();
    return;
  }

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

/* ===================== INPUT HANDLER ======================= */

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

/* ===================== BOOT =============================== */

gatewaySequence();
