// public/app/lessons/terminal/terminal2/terminal2.js

(function () {
  const canvas = document.getElementById("t2-matrix");
  const ctx = canvas.getContext("2d");
  const lights = {
    red: document.getElementById("t2-light-red"),
    yellow: document.getElementById("t2-light-yellow"),
    green: document.getElementById("t2-light-green")
  };
  const screenEl = document.getElementById("t2-screen");
  const outputEl = document.getElementById("t2-output");
  const inputEl = document.getElementById("t2-input");
  const promptEl = document.getElementById("t2-prompt");
  const menuEl = document.getElementById("t2-menu");
  const moduleEl = document.getElementById("t2-module");
  const moduleTitleEl = document.getElementById("t2-module-title");
  const moduleBodyEl = document.getElementById("t2-module-body");
  const root = document.documentElement;

  let gatewayActive = true;
  let ready = false;
  let theme = "matrix";

  function resizeMatrix() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeMatrix();
  window.addEventListener("resize", resizeMatrix);

  const chars = "アァカサタナハマヤャラワ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ{}[]<>/\\=+-_*";
  const fontSize = 16;
  let columns = Math.floor(canvas.width / fontSize);
  let drops = Array(columns).fill(1);
  let glitchTimer = 0;
  let glitchActive = false;

  function drawMatrix() {
    ctx.fillStyle = "rgba(0,0,0,0.08)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let color = "#00cc33";
    if (theme === "blue") color = "#00aaff";
    if (theme === "white") color = "#e0e0e0";
    if (theme === "red") color = "#ff0033";
    if (theme === "dual") color = "#00ff99";

    ctx.fillStyle = color;
    ctx.font = fontSize + "px 'Courier New', monospace";

    for (let i = 0; i < drops.length; i++) {
      const text = chars.charAt(Math.floor(Math.random() * chars.length));
      const x = i * fontSize;
      const y = drops[i] * fontSize;
      ctx.fillText(text, x, y);
      if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }

    glitchTimer--;
    if (glitchTimer <= 0) {
      glitchActive = Math.random() > 0.8;
      glitchTimer = 40 + Math.random() * 80;
    }
    if (glitchActive) {
      ctx.save();
      ctx.globalAlpha = 0.18;
      ctx.fillStyle = "#ffffff";
      const h = canvas.height * 0.15;
      const y = Math.random() * (canvas.height - h);
      ctx.fillRect(0, y, canvas.width, h);
      ctx.restore();
    }

    requestAnimationFrame(drawMatrix);
  }
  requestAnimationFrame(drawMatrix);

  function setLights(state) {
    lights.red.classList.remove("on");
    lights.yellow.classList.remove("on");
    lights.green.classList.remove("on");
    if (state === "red") lights.red.classList.add("on");
    if (state === "yellow") lights.yellow.classList.add("on");
    if (state === "green") lights.green.classList.add("on");
  }

  function pulseLights(state) {
    setLights(state);
    [lights.red, lights.yellow, lights.green].forEach(el => {
      el.classList.add("pulse");
      setTimeout(() => el.classList.remove("pulse"), 500);
    });
  }

  function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
  }

  function printLine(text = "") {
    const line = document.createElement("div");
    line.textContent = text;
    outputEl.appendChild(line);
    outputEl.scrollTop = outputEl.scrollHeight;
  }

  function clearOutput() {
    outputEl.innerHTML = "";
  }

  function typeLine(text, speed = 18) {
    return new Promise(resolve => {
      const line = document.createElement("div");
      outputEl.appendChild(line);
      let i = 0;
      const interval = setInterval(() => {
        line.textContent = text.slice(0, i);
        i++;
        outputEl.scrollTop = outputEl.scrollHeight;
        if (i > text.length) {
          clearInterval(interval);
          resolve();
        }
      }, speed);
    });
  }

  function flickerScreen(duration = 400) {
    screenEl.style.transition = "none";
    screenEl.style.opacity = "0.2";
    setTimeout(() => {
      screenEl.style.opacity = "1";
      setTimeout(() => {
        screenEl.style.opacity = "0.4";
        setTimeout(() => {
          screenEl.style.opacity = "1";
          screenEl.style.transition = "";
        }, duration / 4);
      }, duration / 4);
    }, duration / 4);
  }

  function showMenu() {
    menuEl.classList.add("active");
  }

  function hideMenu() {
    menuEl.classList.remove("active");
  }

  function showModule(title, body) {
    moduleTitleEl.textContent = title;
    moduleBodyEl.innerHTML = body;
    moduleEl.style.display = "flex";
  }

  function hideModule() {
    moduleEl.style.display = "none";
  }

  function applyTheme(name) {
    theme = name;
    if (name === "matrix") {
      root.style.setProperty("--t2-fg", "#00cc33");
      root.style.setProperty("--t2-glow", "0 0 6px #00cc33");
    } else if (name === "blue") {
      root.style.setProperty("--t2-fg", "#00aaff");
      root.style.setProperty("--t2-glow", "0 0 6px #00aaff");
    } else if (name === "white") {
      root.style.setProperty("--t2-fg", "#e0e0e0");
      root.style.setProperty("--t2-glow", "0 0 6px #e0e0e0");
    } else if (name === "red") {
      root.style.setProperty("--t2-fg", "#ff0033");
      root.style.setProperty("--t2-glow", "0 0 6px #ff0033");
    } else if (name === "dual") {
      root.style.setProperty("--t2-fg", "#00ff99");
      root.style.setProperty("--t2-glow", "0 0 8px #00ff99");
    }
    pulseLights("green");
  }

  const categories = [
    {
      id: "education",
      label: "⌘ education",
      items: [
        {
          id: "edu-web",
          label: "web fundamentals",
          title: "WEB FUNDAMENTALS",
          body:
`[ BROWSER ] ⇄ [ YOUR WEB APP ] ⇄ [ DATABASE ]
        ↑             |
        |             ↓
     [ USERS ]    [ AUTOMATION ]

web fundamentals is where you learn how the interfaces of the modern world are built.
you learn HTML, CSS, JavaScript, APIs, auth, state, and deployment as a system you control.
most people only consume this layer. you will build it.`
        },
        {
          id: "edu-apps",
          label: "app development",
          title: "APP DEVELOPMENT",
          body:
`[ USER ] → [ DEVICE ] → [ APP SHELL ] → [ CLOUD ]

apps are how people experience software in their hands.
you learn how to design and build app-like experiences using web tech and modern stacks.
you are not just learning screens — you are learning systems.`
        },
        {
          id: "edu-mcu",
          label: "mcu engineering",
          title: "MCU ENGINEERING",
          body:
`[ CODE ] → [ MICROCONTROLLER ] → [ SENSORS / MOTORS ] → [ REAL WORLD ]

microcontrollers are how code touches the physical world.
you learn how factories, cars, drones, and robotics are controlled.
you design safe, predictable systems that move real hardware.`
        },
        {
          id: "edu-hacking",
          label: "hacking & security",
          title: "HACKING & SECURITY",
          body:
`[ ATTACK SURFACE ]
        ↓
[ DEFENSE LAYERS ] → [ LOGS / ALERTS ]

hacking here means understanding how systems break so you can design them to be safer.
you learn attack surfaces, defense layers, logging, and safe patterns.
this is a societal superpower — you see the invisible edges of the systems everyone else trusts blindly.`
        },
        {
          id: "edu-automation",
          label: "automation systems",
          title: "AUTOMATION SYSTEMS",
          body:
`[ TRIGGER ] → [ WORKFLOW ] → [ ACTIONS ] → [ RESULTS ]

automation is how you scale yourself.
you design workflows that trigger on events, move data, and complete tasks while you sleep.
this is how modern businesses operate behind the scenes.`
        }
      ]
    },
    {
      id: "games",
      label: "▣ games",
      items: [
        { id: "game-flash", label: "code flash (10s)" },
        { id: "game-bugfix", label: "bugfix trainer" },
        { id: "game-navigator", label: "file navigator" },
        { id: "game-logic", label: "logic puzzle" },
        { id: "game-hack-sim", label: "hack simulation" }
      ]
    },
    {
      id: "flash",
      label: "⚡ flash learning",
      items: [
        { id: "flash-code", label: "code flash (10s)" }
      ]
    },
    {
      id: "courses",
      label: "▤ courses",
      items: [
        { id: "course-web", label: "web ($300)" },
        { id: "course-apps", label: "apps ($300)" },
        { id: "course-mcu", label: "mcu ($300)" },
        { id: "course-hacking", label: "hacking ($300)" },
        { id: "course-automation", label: "automation ($300)" },
        { id: "course-github", label: "github ($200)" },
        { id: "course-bash", label: "bash ($200)" }
      ]
    },
    {
      id: "systems",
      label: "◉ systems",
      items: [
        {
          id: "sys-map",
          label: "system map",
          title: "SYSTEM MAP",
          body:
`[ TERMINAL 1 ] → [ TERMINAL 2 ] → [ GAMES / FLASH / COURSES ]
         ↓                 ↓
   [ MATRIX ENGINE ]   [ SYSTEM MAP / UNLOCKABLES ]

terminal 1 is your preview shell.
terminal 2 is your advanced shell.
from here you can reach games, flash learning, courses, and deeper system tools.
this is not a website — this is your operating layer for learning and building.`
        }
      ]
    },
    {
      id: "unlockables",
      label: "⛉ unlockables",
      items: [
        {
          id: "unlock-hidden",
          label: "hidden commands",
          title: "HIDDEN COMMANDS",
          body:
`some commands are not listed in helpp.

try:
  ghost
  root
  matrix+
  lights+
  devmode

these commands reveal deeper layers, diagnostics, and experimental tools.`
        },
        {
          id: "unlock-dev",
          label: "developer mode",
          title: "DEVELOPER MODE",
          body:
`developer mode exposes internal signals and debug output.

you can see:
  - theme changes
  - matrix glitches
  - light pulses
  - command routing

this mode is for builders who want to see the wiring behind the scenes.`
        }
      ]
    }
  ];

  function buildMenu() {
    menuEl.innerHTML = "";
    const title = document.createElement("div");
    title.className = "t2-menu-title";
    title.textContent = "select a category:";
    menuEl.appendChild(title);

    categories.forEach(cat => {
      const catEl = document.createElement("div");
      catEl.className = "t2-menu-category";
      catEl.textContent = cat.label;
      const listEl = document.createElement("div");
      listEl.className = "t2-menu-list";

      cat.items.forEach(item => {
        const itemEl = document.createElement("button");
        itemEl.className = "t2-menu-item";
        itemEl.textContent = "• " + item.label;
        itemEl.addEventListener("click", () => {
          if (item.id.startsWith("edu-") || item.id.startsWith("sys-") || item.id.startsWith("unlock-")) {
            const full = findModuleById(item.id);
            if (full) {
              hideMenu();
              showModule(full.title, full.body);
            }
          } else if (item.id.startsWith("game-")) {
            hideMenu();
            if (window.T2_GAMES && typeof window.T2_GAMES.launch === "function") {
              window.T2_GAMES.launch(item.id);
            } else {
              showModule("GAMES ENGINE", "games are handled in a separate engine.\n\nwire T2_GAMES.launch(\"" + item.id + "\") here.");
            }
          } else if (item.id.startsWith("flash-")) {
            hideMenu();
            if (window.T2_FLASH && typeof window.T2_FLASH.run === "function") {
              window.T2_FLASH.run(item.id);
            } else {
              showModule("FLASH LEARNING", "flash learning runs in its own module.\n\nwire T2_FLASH.run(\"" + item.id + "\") here.");
            }
          } else if (item.id.startsWith("course-")) {
            hideMenu();
            if (window.T2_COURSES && typeof window.T2_COURSES.open === "function") {
              window.T2_COURSES.open(item.id);
            } else {
              showModule("COURSE ENGINE", "courses are handled in a separate engine.\n\nwire T2_COURSES.open(\"" + item.id + "\") here.");
            }
          }
        });
        listEl.appendChild(itemEl);
      });

      catEl.addEventListener("click", () => {
        const open = listEl.classList.toggle("open");
        if (open) pulseLights("green");
      });

      menuEl.appendChild(catEl);
      menuEl.appendChild(listEl);
    });
  }

  function findModuleById(id) {
    for (const cat of categories) {
      for (const item of cat.items) {
        if (item.id === id && item.title && item.body) return item;
      }
    }
    return null;
  }

  async function showHelp() {
    await typeLine("[ADVANCED COMMANDS]");
    await typeLine("  helpp        / show this list");
    await typeLine("  menu         / show advanced categories");
    await typeLine("  games        / open games category");
    await typeLine("  flash        / open flash learning category");
    await typeLine("  courses      / open courses category");
    await typeLine("  systems      / open systems category");
    await typeLine("  unlockables  / open unlockables category");
    await typeLine("  color        / change terminal theme");
    await typeLine("  open <id>    / open a specific module");
    await typeLine("  clear        / clear the screen");
  }

  async function handleCommand(raw) {
    const value = raw.trim();
    if (!value) return;
    printLine("$ " + value);

    const [cmd, ...rest] = value.split(" ");
    const arg = rest.join(" ").trim().toLowerCase();
    const base = cmd.toLowerCase();

    if (base === "clear") {
      clearOutput();
      return;
    }

    if (base === "helpp" || base === "help" || base === "-help") {
      await showHelp();
      return;
    }

    if (base === "menu") {
      buildMenu();
      showMenu();
      return;
    }

    if (base === "games") {
      buildMenu();
      showMenu();
      return;
    }

    if (base === "flash") {
      buildMenu();
      showMenu();
      return;
    }

    if (base === "courses") {
      buildMenu();
      showMenu();
      return;
    }

    if (base === "systems") {
      buildMenu();
      showMenu();
      return;
    }

    if (base === "unlockables") {
      buildMenu();
      showMenu();
      return;
    }

    if (base === "open") {
      if (!arg) {
        await typeLine("usage: open <module-id>");
        return;
      }
      const mod = findModuleById(arg);
      if (!mod) {
        await typeLine("module not found: " + arg);
        return;
      }
      hideMenu();
      showModule(mod.title, mod.body);
      return;
    }

    if (base === "color") {
      if (!arg) {
        await typeLine("available terminal themes:");
        await typeLine("  1 / matrix green");
        await typeLine("  2 / cyber blue");
        await typeLine("  3 / clean white");
        await typeLine("  4 / danger red");
        await typeLine("  5 / dual-layer (green + blue)");
        await typeLine("usage: color <1-5>");
        return;
      }
      const n = parseInt(arg, 10);
      if (n === 1) applyTheme("matrix");
      else if (n === 2) applyTheme("blue");
      else if (n === 3) applyTheme("white");
      else if (n === 4) applyTheme("red");
      else if (n === 5) applyTheme("dual");
      else await typeLine("unknown theme index.");
      return;
    }

    if (base === "ghost") {
      await typeLine("ghost mode: you are now reading the system without being seen.");
      pulseLights("yellow");
      return;
    }

    if (base === "root") {
      await typeLine("root access is conceptual here. you already have the keys to this layer.");
      pulseLights("red");
      return;
    }

    if (base === "matrix+") {
      await typeLine("intensifying matrix glitches.");
      glitchTimer = 0;
      return;
    }

    if (base === "lights+") {
      await typeLine("cycling lights.");
      setLights("red");
      await sleep(200);
      setLights("yellow");
      await sleep(200);
      setLights("green");
      await sleep(200);
      return;
    }

    if (base === "devmode") {
      await typeLine("developer mode: internal signals will now be more visible.");
      await typeLine("watch the matrix, lights, and transitions closely.");
      return;
    }

    await typeLine("unknown command. type helpp for advanced commands.");
  }

  async function boot() {
    setLights("yellow");
    await typeLine("terminal 2 online.");
    await sleep(200);
    await typeLine("advanced shell loaded.");
    await sleep(200);
    await typeLine("press control + c to exit this screen.");
    await sleep(300);
    printLine("");
    await typeLine("are you there?  (y / n)");
    gatewayActive = true;
    ready = true;
  }

  document.addEventListener("keydown", e => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "c") {
      e.preventDefault();
      printLine("");
      printLine("interrupt signal received (control + c).");
      printLine("returning to normal terminal...");
      setLights("red");
      flickerScreen(500);
      setTimeout(() => {
        window.location.href = "../index.html";
      }, 900);
    }
  });

  inputEl.addEventListener("keydown", async e => {
    if (e.key === "Enter" && ready) {
      const value = inputEl.value;
      inputEl.value = "";
      if (gatewayActive) {
        const v = value.trim().toLowerCase();
        printLine("$ " + value);
        if (v === "y" || v === "yes") {
          gatewayActive = false;
          setLights("green");
          flickerScreen(400);
          await typeLine("initializing advanced interface...");
          await sleep(300);
          await typeLine("loading categories...");
          await sleep(300);
          await typeLine("activating matrix overlay...");
          await sleep(300);
          clearOutput();
          buildMenu();
          showMenu();
        } else if (v === "n" || v === "no") {
          gatewayActive = false;
          await typeLine("understood.");
          await typeLine("press helpp to reveal advanced commands.");
        } else {
          await typeLine("unrecognized response. type y or n.");
        }
      } else {
        await handleCommand(value);
      }
    }
  });

  applyTheme("matrix");
  boot();
})();
