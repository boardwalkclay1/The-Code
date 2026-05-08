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

  // ---------------------------
  // MATRIX ENGINE
  // ---------------------------
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

  // ---------------------------
  // LIGHTS
  // ---------------------------
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

  // ---------------------------
  // UTILITIES
  // ---------------------------
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

  // ---------------------------
  // MODULE + MENU SYSTEM
  // ---------------------------
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

  // ---------------------------
  // EXTERNAL COMMAND LOADER
  // ---------------------------
  let externalCommands = {};

  async function loadExternalCommands() {
    try {
      const res = await fetch("txt/command.txt");
      const text = await res.text();

      text.split("\n").forEach(line => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("//")) return;

        const [cmd, ...descParts] = trimmed.split("::");
        const command = cmd.trim().toLowerCase();
        const description = descParts.join("::").trim();

        externalCommands[command] = description;
      });
    } catch (err) {
      console.error("Failed to load external commands:", err);
    }
  }

  // ---------------------------
  // HELP
  // ---------------------------
  async function showHelp() {
    await typeLine("[ADVANCED COMMANDS]");
    await typeLine("  helpp        / show this list");
    await typeLine("  menu         / show advanced categories");
    await typeLine("  games        / open games category");
    await typeLine("  flash        / open flash learning");
    await typeLine("  courses      / open courses");
    await typeLine("  systems      / open systems");
    await typeLine("  unlockables  / open unlockables");
    await typeLine("  color        / change terminal theme");
    await typeLine("  open <id>    / open a module");
    await typeLine("  clear        / clear screen");

    await typeLine("");
    await typeLine("[COURSE COMMANDS]");

    Object.entries(externalCommands).forEach(([cmd, desc]) => {
      printLine(`  ${cmd.padEnd(18)} ${desc}`);
    });
  }

  // ---------------------------
  // COMMAND HANDLER
  // ---------------------------
  async function handleCommand(raw) {
    const value = raw.trim();
    if (!value) return;
    printLine("$ " + value);

    const [cmd, ...rest] = value.split(" ");
    const arg = rest.join(" ").trim().toLowerCase();
    const base = cmd.toLowerCase();

    // built-in commands
    if (base === "clear") return clearOutput();
    if (base === "helpp" || base === "help" || base === "-help") return showHelp();

    if (["menu", "games", "flash", "courses", "systems", "unlockables"].includes(base)) {
      buildMenu();
      showMenu();
      return;
    }

    if (base === "open") {
      if (!arg) return typeLine("usage: open <module-id>");
      const mod = findModuleById(arg);
      if (!mod) return typeLine("module not found: " + arg);
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
        await typeLine("  5 / dual-layer");
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
      await typeLine("root access is conceptual here. you already have the keys.");
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
      await typeLine("developer mode: internal signals now visible.");
      return;
    }

    // ---------------------------
    // EXTERNAL COMMAND EXECUTION
    // ---------------------------
    const fullKey = value.toLowerCase();
    if (externalCommands[base] || externalCommands[fullKey]) {
      const key = externalCommands[base] ? base : fullKey;
      const desc = externalCommands[key];
      await typeLine(desc);
      return;
    }

    await typeLine("unknown command. type helpp for advanced commands.");
  }

  // ---------------------------
  // BOOT
  // ---------------------------
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

  // ---------------------------
  // KEYBOARD
  // ---------------------------
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

  // ---------------------------
  // INIT
  // ---------------------------
  applyTheme("matrix");

  (async () => {
    await loadExternalCommands();
    boot();
  })();
})();
