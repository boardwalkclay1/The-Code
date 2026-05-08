// public/app/lessons/terminal/terminal2/terminal2.js

(function () {

  // ------------------------------------------------------------
  // CONFIG
  // ------------------------------------------------------------
  const TXT_BASE = "txt/"; 
  // if your files live in pages/txt/, use:
  // const TXT_BASE = "pages/txt/";

  // ------------------------------------------------------------
  // ELEMENTS
  // ------------------------------------------------------------
  const canvas   = document.getElementById("t2-matrix");
  const ctx      = canvas.getContext("2d");
  const outputEl = document.getElementById("t2-output");
  const inputEl  = document.getElementById("t2-input");
  const screenEl = document.getElementById("t2-screen");
  const root     = document.documentElement;

  let ready        = false;
  let gatewayActive = true;
  let theme        = "matrix";

  // ------------------------------------------------------------
  // MATRIX ENGINE
  // ------------------------------------------------------------
  function resizeMatrix() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeMatrix();
  window.addEventListener("resize", resizeMatrix);

  const chars    = "アァカサタナハマヤャラワ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ{}[]<>/\\=+-_*";
  const fontSize = 16;
  let columns    = Math.floor(canvas.width / fontSize);
  let drops      = Array(columns).fill(1);

  function drawMatrix() {
    ctx.fillStyle = "rgba(0,0,0,0.08)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = theme === "matrix" ? "#00cc33" :
                    theme === "blue"   ? "#00aaff" :
                    theme === "white"  ? "#e0e0e0" :
                    theme === "red"    ? "#ff0033" :
                    "#00ff99";

    ctx.font = fontSize + "px 'Courier New', monospace";

    for (let i = 0; i < drops.length; i++) {
      const text = chars.charAt(Math.floor(Math.random() * chars.length));
      const x    = i * fontSize;
      const y    = drops[i] * fontSize;
      ctx.fillText(text, x, y);
      if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }

    requestAnimationFrame(drawMatrix);
  }
  requestAnimationFrame(drawMatrix);

  // ------------------------------------------------------------
  // UTILITIES
  // ------------------------------------------------------------
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

  function flickerScreen() {
    screenEl.style.opacity = "0.2";
    setTimeout(() => (screenEl.style.opacity = "1"), 200);
  }

  // ------------------------------------------------------------
  // LOADERS
  // ------------------------------------------------------------
  let commandIndex  = [];
  let commandOutput = {};

  async function safeFetch(path) {
    try {
      const res = await fetch(path);
      if (!res.ok) {
        console.warn("[Terminal2] Failed to load:", path, res.status);
        return "";
      }
      return await res.text();
    } catch (err) {
      console.error("[Terminal2] Fetch error:", path, err);
      return "";
    }
  }

  async function loadCommandIndex() {
    const text = await safeFetch(TXT_BASE + "/app/lessons/terminal/terminal2/txt/command.txt");
    if (!text) {
      commandIndex = [];
      return;
    }

    commandIndex = text
      .split("\n")
      .map(line => line && line.trim ? line.trim() : "")
      .filter(line => line && !line.startsWith("//"))
      .map(line => {
        const [cmd, desc] = line.split("::");
        return {
          command: (cmd || "").trim().toLowerCase(),
          description: (desc || "").trim()
        };
      })
      .filter(item => item.command)
      .sort((a, b) => a.command.localeCompare(b.command));
  }

  async function loadCommandOutput() {
    const text = await safeFetch(TXT_BASE + "/app/lessons/terminal/terminal2/txt/command-output.txt");
    if (!text) {
      commandOutput = {};
      return;
    }

    const blocks = text
      .split("===")
      .map(b => (b && b.trim ? b.trim() : ""))
      .filter(b => b);

    blocks.forEach(block => {
      const lines = block.split("\n");
      if (!lines.length) return;
      const firstLine = (lines[0] || "").trim();
      if (!firstLine) return;
      const key     = firstLine.toLowerCase();
      const content = lines.slice(1).join("\n");
      commandOutput[key] = content;
    });
  }

  // ------------------------------------------------------------
  // HELP PAGES (12 per page)
  // ------------------------------------------------------------
  function getHelpPage(page) {
    const size  = 12;
    const start = (page - 1) * size;
    return commandIndex.slice(start, start + size);
  }

  async function showHelpPage(page) {
    const list = getHelpPage(page);
    if (!list.length) {
      await typeLine("no commands on this page.");
      return;
    }
    await typeLine(`[HELP PAGE ${page}]`);
    for (const item of list) {
      const cmd  = item.command || "";
      const desc = item.description || "";
      printLine(`  ${cmd.padEnd(20)} ${desc}`);
    }
    printLine("");
    printLine("type: help1, help2, help3, help4");
  }

  // ------------------------------------------------------------
  // COURSE MAP
  // ------------------------------------------------------------
  const courseMap = {
    web:       { price: 300, path: "web" },
    apps:      { price: 300, path: "apps" },
    mcu:       { price: 300, path: "mcu" },
    automation:{ price: 300, path: "automation" },
    tools:     { price: 300, path: "tools" },
    widgets:   { price: 300, path: "widgets" },
    github:    { price: 200, path: "github" },
    bash:      { price: 200, path: "bash" },
    hacking:   { price: 300, path: "hacking" }
  };

  async function showCourse(base) {
    const c = courseMap[base];
    if (!c) {
      await typeLine("course not found.");
      return;
    }
    await typeLine(base.toUpperCase() + " COURSE");
    await typeLine(`price: $${c.price}`);
    await typeLine(`link: /public/courses/${c.path}/index.html`);
    printLine("");
    await typeLine("for full explanation:");
    await typeLine(`type: ${base} explain`);
    printLine("");
    printLine("press control + c to exit");
  }

  // ------------------------------------------------------------
  // COMMAND EXECUTION
  // ------------------------------------------------------------
  async function runCommand(cmd) {
    const key = (cmd || "").toLowerCase();

    // built-in help pages
    if (key === "help1") return showHelpPage(1);
    if (key === "help2") return showHelpPage(2);
    if (key === "help3") return showHelpPage(3);
    if (key === "help4") return showHelpPage(4);

    // course commands
    if (courseMap[key]) return showCourse(key);

    // command-output.txt commands
    if (commandOutput[key]) {
      const lines = commandOutput[key].split("\n");
      for (const line of lines) {
        await typeLine(line, 12);
      }
      return;
    }

    await typeLine("unknown command. type help1");
  }

  // ------------------------------------------------------------
  // HANDLE INPUT
  // ------------------------------------------------------------
  async function handleCommand(raw) {
    const value = (raw || "").trim();
    if (!value) return;
    printLine("$ " + value);

    if (value.toLowerCase() === "clear") {
      clearOutput();
      return;
    }

    await runCommand(value);
  }

  // ------------------------------------------------------------
  // BOOT
  // ------------------------------------------------------------
  async function boot() {
    await typeLine("terminal 2 online.");
    await typeLine("advanced shell loaded.");
    await typeLine("press control + c to exit this screen.");
    printLine("");
    await typeLine("are you there?  (y / n)");
    ready = true;
  }

  // ------------------------------------------------------------
  // CONTROL + C
  // ------------------------------------------------------------
  document.addEventListener("keydown", e => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "c") {
      e.preventDefault();
      printLine("");
      printLine("interrupt signal received.");
      printLine("returning to prompt...");
      flickerScreen();
      clearOutput();
    }
  });

  // ------------------------------------------------------------
  // INPUT LISTENER
  // ------------------------------------------------------------
  inputEl.addEventListener("keydown", async e => {
    if (e.key === "Enter" && ready) {
      const value = inputEl.value;
      inputEl.value = "";

      if (gatewayActive) {
        printLine("$ " + value);
        const v = (value || "").trim().toLowerCase();
        if (v === "y" || v === "yes") {
          gatewayActive = false;
          clearOutput();
          await typeLine("initializing...");
          await typeLine("loading command index...");
          await typeLine("loading command outputs...");
          clearOutput();
          await typeLine("type help1 to begin.");
        } else if (v === "n" || v === "no") {
          gatewayActive = false;
          await typeLine("understood.");
          await typeLine("type help1 to begin.");
        } else {
          await typeLine("unrecognized response. type y or n.");
        }
      } else {
        await handleCommand(value);
      }
    }
  });

  // ------------------------------------------------------------
  // INIT
  // ------------------------------------------------------------
  (async () => {
    await loadCommandIndex();
    await loadCommandOutput();
    boot();
  })();

})();
