/* ============================================================
   THE CODE — LANDING TERMINAL (PREVIEW MODE)
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

  await typeLine("WELCOME TO THE CODE TERMINAL (PREVIEW MODE)");
  await typeLine("--------------------------------------------");
  await typeLine("you are not in the full system yet.");
  await typeLine("this is the preview terminal.");
  await typeLine("after enrollment, you unlock the full command set.");
  printLine("");

  await typeLine("core courses ($300 each):");
  await typeLine("  web");
  await typeLine("  apps");
  await typeLine("  mcu");
  await typeLine("  hacking");
  await typeLine("  automation");
  printLine("");

  await typeLine("bonus courses ($200 each):");
  await typeLine("  github");
  await typeLine("  bash");
  printLine("");

  await typeLine("bundle rules:");
  await typeLine("  buy 1 course → $300 + choose github OR bash free");
  await typeLine("  buy 2 courses → $600 + get BOTH bonuses free");
  await typeLine("  buy 3+ courses → $300 each, minus $50 for every extra");
  await typeLine("  automation is automatically included with web and apps");
  printLine("");

  await typeLine("installments available. you do NOT have to pay all at once.");
  printLine("");

  await typeLine("after purchase:");
  await typeLine("  → you are redirected to your course terminal");
  await typeLine("  → you are prompted to install the app to your screen");
  await typeLine("  → you unlock commands hidden from preview mode");
  await typeLine("  → you gain access to systems most people never see");
  printLine("");

  await typeLine("type -help for command descriptions.");
  await typeLine("");
  await typeLine("what do you want to explore?");
  promptLabel.textContent = "$";
};

/* ============================================================
   COMMAND ROUTER (PREVIEW MODE)
   ============================================================ */

const respond = async value => {
  const cmd = value.trim().toLowerCase();
  if (!cmd) return;

  printLine("$ " + value);
  await sleep(200);

  if (cmd === "-help" || cmd === "help") {
    await typeLine("available preview commands:");
    await typeLine("  web, apps, mcu, hacking, automation");
    await typeLine("  github, bash");
    await typeLine("  pricing, enroll");
    await typeLine("");
    await typeLine("note: full commands unlock after purchase.");
    return;
  }

  if (cmd === "pricing") return showPricing();
  if (cmd === "enroll") return showEnroll();

  if (["web","apps","mcu","hacking","automation","github","bash"].includes(cmd)) {
    return showPreviewCourse(cmd);
  }

  await typeLine("unknown command. type -help for options.");
};

/* ============================================================
   PREVIEW COURSE PAGES
   ============================================================ */

const showPreviewCourse = async course => {
  await typeLine(`[${course.toUpperCase()} — PREVIEW]`);
  await sleep(200);

  await typeLine("this is a preview. full access unlocks after enrollment.");
  await sleep(200);

  if (course === "web") {
    printBlock(`<pre class="diagram">
[ USER ]
   ↓
[ BROWSER ] ⇄ [ YOUR WEB APP ] ⇄ [ DATABASE ]
</pre>`);
    await typeLine("web development lets you build the interfaces the world uses.");
    await typeLine("every industry depends on it: finance, logistics, healthcare, retail.");
    await typeLine("this knowledge does not exist anywhere in the matrix at this price.");
  }

  if (course === "apps") {
    printBlock(`<pre class="diagram">
[ USER ]
   ↓
[ PHONE / TABLET ] → [ APP ] → [ CLOUD ]
</pre>`);
    await typeLine("apps run the world. every company needs them.");
    await typeLine("you learn to build PWAs, mobile-ready systems, and dashboards.");
  }

  if (course === "mcu") {
    printBlock(`<pre class="diagram">
[ CODE ] → [ MICROCONTROLLER ] → [ SENSORS / MOTORS ] → [ REAL WORLD ]
</pre>`);
    await typeLine("mcu knowledge lets you control the physical world with code.");
    await typeLine("this is how factories, cars, drones, and robotics work.");
  }

  if (course === "hacking") {
    printBlock(`<pre class="diagram">
[ ATTACK SURFACE ]
        ↓
[ DEFENSE LAYERS ] → [ LOGS / ALERTS ]
</pre>`);
    await typeLine("ethical hacking teaches you how systems break and how to defend them.");
    await typeLine("this is a societal superpower. most people never see this layer.");
  }

  if (course === "automation") {
    printBlock(`<pre class="diagram">
[ TRIGGER ] → [ WORKFLOW ] → [ ACTIONS ] → [ RESULTS ]
</pre>`);
    await typeLine("automation lets you build systems that work while you sleep.");
    await typeLine("this is how modern businesses scale.");
  }

  if (course === "github") {
    await typeLine("github teaches version control, repos, branches, and collaboration.");
    await typeLine("listed at $200. free with 1+ course bundles.");
  }

  if (course === "bash") {
    await typeLine("bash teaches terminal navigation and safe scripting.");
    await typeLine("listed at $200. free with 1+ course bundles.");
  }

  await typeLine("");
  await typeLine("full access unlocks after enrollment.");
};

/* ============================================================
   PRICING PAGE
   ============================================================ */

const showPricing = async () => {
  await typeLine("[PRICING]");
  await typeLine("core courses: $300 each");
  await typeLine("bonus courses: $200 each (github, bash)");
  printLine("");

  await typeLine("bundle deals:");
  await typeLine("  buy 1 → $300 + choose github OR bash free");
  await typeLine("  buy 2 → $600 + get BOTH bonuses free");
  await typeLine("  buy 3+ → $300 each, minus $50 for every extra");
  await typeLine("  automation included with web and apps");
  printLine("");

  await typeLine("installments available.");
  await typeLine("you do NOT have to pay all at once.");
};

/* ============================================================
   ENROLL PAGE
   ============================================================ */

const showEnroll = async () => {
  await typeLine("[ENROLL]");
  await typeLine("after payment:");
  await typeLine("  → redirected to your course terminal");
  await typeLine("  → prompted to install the app to your screen");
  await typeLine("  → unlock full command set");
  await typeLine("  → lifetime access");
  await typeLine("  → access to systems most people never see");
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
