/* ============================================================
   TERMINAL 2 — MASTER CONTROLLER
   public/app/lessons/terminal/terminal2/js/terminal2-master.js
   ============================================================ */

(() => {
  const outputEl = document.getElementById("t2-output");
  const inputEl = document.getElementById("t2-input");
  const promptEl = document.getElementById("t2-prompt");
  const screenEl = document.getElementById("t2-screen");
  const menuEl = document.getElementById("t2-menu");
  const modulesEl = document.getElementById("t2-modules");

  if (!outputEl || !inputEl || !promptEl || !screenEl || !menuEl || !modulesEl) {
    console.warn("[Terminal2] Missing core DOM elements.");
    return;
  }

  /* ------------------------------------------------------------
     STATE
     ------------------------------------------------------------ */

  const state = {
    ready: false,
    theme: "matrix",
    locked: false,
    currentModule: null
  };

  window.T2_STATE = state; // optional global for debugging

  /* ------------------------------------------------------------
     UTILITIES
     ------------------------------------------------------------ */

  const sleep = ms => new Promise(r => setTimeout(r, ms));

  const printLine = (text = "") => {
    const line = document.createElement("div");
    line.className = "t2-line";
    line.textContent = text;
    outputEl.appendChild(line);
    outputEl.scrollTop = outputEl.scrollHeight;
  };

  const typeLine = (text, speed = 18) => {
    return new Promise(resolve => {
      const line = document.createElement("div");
      line.className = "t2-line";
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
  };

  const clearScreen = () => {
    outputEl.innerHTML = "";
  };

  const setPrompt = text => {
    promptEl.textContent = text;
  };

  const centerMenu = () => {
    screenEl.classList.add("t2-fullscreen-menu");
  };

  const showModule = () => {
    screenEl.classList.remove("t2-fullscreen-menu");
    modulesEl.classList.add("t2-modules-visible");
  };

  const hideModule = () => {
    modulesEl.classList.remove("t2-modules-visible");
  };

  /* ------------------------------------------------------------
     CONTROL + C EXIT
     ------------------------------------------------------------ */

  const handleGlobalKey = e => {
    if (e.key === "c" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      printLine("");
      printLine("interrupt signal received (control + c).");
      printLine("returning to normal terminal...");
      state.locked = true;
      inputEl.disabled = true;
      setTimeout(() => {
        // assumes Terminal 1 index is one level up
        window.location.href = "../index.html";
      }, 900);
    }
  };

  document.addEventListener("keydown", handleGlobalKey);

  /* ------------------------------------------------------------
     COMMAND HANDLER
     ------------------------------------------------------------ */

  const handleCommand = async raw => {
    const value = raw.trim();
    if (!value || state.locked) return;

    printLine("$ " + value);

    const [cmd, ...rest] = value.split(" ");
    const arg = rest.join(" ").trim().toLowerCase();
    const base = cmd.toLowerCase();

    if (base === "clear") {
      clearScreen();
      return;
    }

    if (base === "-help" || base === "help" || base === "helpp") {
      await window.T2_DROPDOWNS.showHelp();
      return;
    }

    if (base === "color") {
      await window.T2_COLOR.handleColorCommand(arg);
      return;
    }

    if (base === "menu") {
      await window.T2_DROPDOWNS.showMainMenu();
      return;
    }

    if (base === "games") {
      await window.T2_DROPDOWNS.openCategory("games");
      return;
    }

    if (base === "flash") {
      await window.T2_DROPDOWNS.openCategory("flash");
      return;
    }

    if (base === "courses") {
      await window.T2_DROPDOWNS.openCategory("courses");
      return;
    }

    if (base === "systems") {
      await window.T2_DROPDOWNS.openCategory("systems");
      return;
    }

    if (base === "unlockables") {
      await window.T2_DROPDOWNS.openCategory("unlockables");
      return;
    }

    if (base === "open") {
      if (!arg) {
        await typeLine("usage: open <module-id>");
        return;
      }
      await window.T2_CONTENT.openModule(arg);
      return;
    }

    await typeLine("unknown command. type helpp for advanced commands.");
  };

  /* ------------------------------------------------------------
     INPUT BINDING
     ------------------------------------------------------------ */

  inputEl.addEventListener("keydown", async e => {
    if (e.key === "Enter") {
      const value = inputEl.value;
      inputEl.value = "";
      await handleCommand(value);
    }
  });

  /* ------------------------------------------------------------
     BOOT SEQUENCE
     ------------------------------------------------------------ */

  const boot = async () => {
    centerMenu();
    clearScreen();
    setPrompt("$");

    await typeLine("terminal 2 online.");
    await sleep(200);
    await typeLine("advanced shell loaded.");
    await sleep(200);
    await typeLine("press control + c to exit this screen.");
    await sleep(300);
    printLine("");
    await typeLine("are you there?  (y / n)");

    // temporary mini-gateway inside Terminal 2 itself
    const gatewayHandler = async e => {
      if (e.key !== "Enter") return;
      const value = inputEl.value.trim().toLowerCase();
      inputEl.value = "";
      document.removeEventListener("keydown", gatewayHandler);

      printLine("$ " + value);

      if (value === "y" || value === "yes") {
        await typeLine("initializing advanced interface...");
        await sleep(300);
        await typeLine("loading categories...");
        await sleep(300);
        await typeLine("activating matrix overlay...");
        await sleep(300);
        clearScreen();
        await window.T2_DROPDOWNS.buildMainMenu();
        state.ready = true;
      } else if (value === "n" || value === "no") {
        await typeLine("understood.");
        await typeLine("press helpp to reveal advanced commands.");
        state.ready = true;
      } else {
        await typeLine("unrecognized response. type y or n.");
        document.addEventListener("keydown", gatewayHandler);
      }
    };

    document.addEventListener("keydown", gatewayHandler);
  };

  window.T2_MASTER = {
    boot,
    printLine,
    typeLine,
    clearScreen,
    setPrompt,
    showModule,
    hideModule
  };

  // auto-boot when DOM is ready
  if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(boot, 50);
  } else {
    document.addEventListener("DOMContentLoaded", boot);
  }
})();
