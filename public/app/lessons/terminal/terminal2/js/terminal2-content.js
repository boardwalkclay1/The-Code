/* ============================================================
   TERMINAL 2 — CONTENT & MODULES
   public/app/lessons/terminal/terminal2/js/terminal2-content.js
   ============================================================ */

(() => {
  const modulesEl = document.getElementById("t2-modules");
  const titleEl = document.getElementById("t2-module-title");
  const bodyEl = document.getElementById("t2-module-body");

  if (!modulesEl || !titleEl || !bodyEl) {
    console.warn("[Terminal2] Missing module DOM elements.");
    return;
  }

  const ascii = {
    web: `
[ BROWSER ] ⇄ [ YOUR WEB APP ] ⇄ [ DATABASE ]
        ↑             |
        |             ↓
     [ USERS ]    [ AUTOMATION ]
`,
    apps: `
[ USER ] → [ DEVICE ] → [ APP SHELL ] → [ CLOUD ]
`,
    mcu: `
[ CODE ] → [ MICROCONTROLLER ] → [ SENSORS / MOTORS ] → [ REAL WORLD ]
`,
    hacking: `
[ ATTACK SURFACE ]
        ↓
[ DEFENSE LAYERS ] → [ LOGS / ALERTS ]
`,
    automation: `
[ TRIGGER ] → [ WORKFLOW ] → [ ACTIONS ] → [ RESULTS ]
`,
    systems: `
[ TERMINAL 1 ] → [ TERMINAL 2 ] → [ GAMES / COURSES / FLASH ]
         ↓                 ↓
   [ MATRIX ENGINE ]   [ SYSTEM MAP ]
`
  };

  const modules = {
    "edu-web": {
      title: "WEB FUNDAMENTALS",
      category: "education",
      render: () => {
        bodyEl.innerHTML = "";
        const p1 = document.createElement("pre");
        p1.className = "t2-diagram";
        p1.textContent = ascii.web;
        const p2 = document.createElement("div");
        p2.className = "t2-text-block";
        p2.textContent =
          "web fundamentals teaches you how the interfaces of the modern world are built. " +
          "you learn HTML, CSS, JavaScript, APIs, auth, state, and deployment — not as trivia, " +
          "but as a system you can control. this is the layer most people only consume. you will build it.";
        bodyEl.appendChild(p1);
        bodyEl.appendChild(p2);
      }
    },
    "edu-apps": {
      title: "APP DEVELOPMENT",
      category: "education",
      render: () => {
        bodyEl.innerHTML = "";
        const p1 = document.createElement("pre");
        p1.className = "t2-diagram";
        p1.textContent = ascii.apps;
        const p2 = document.createElement("div");
        p2.className = "t2-text-block";
        p2.textContent =
          "apps are how people experience software in their hands. in this track, you learn how to design " +
          "and build app-like experiences that live on phones, tablets, and desktops using web tech and modern stacks. " +
          "you are not just learning screens — you are learning systems.";
        bodyEl.appendChild(p1);
        bodyEl.appendChild(p2);
      }
    },
    "edu-mcu": {
      title: "MCU ENGINEERING",
      category: "education",
      render: () => {
        bodyEl.innerHTML = "";
        const p1 = document.createElement("pre");
        p1.className = "t2-diagram";
        p1.textContent = ascii.mcu;
        const p2 = document.createElement("div");
        p2.className = "t2-text-block";
        p2.textContent =
          "microcontrollers are how code touches the physical world. this is how factories, cars, drones, " +
          "and robotics work. you learn how to read sensors, drive motors, and design safe, predictable systems " +
          "that move real hardware.";
        bodyEl.appendChild(p1);
        bodyEl.appendChild(p2);
      }
    },
    "edu-hacking": {
      title: "HACKING & SECURITY",
      category: "education",
      render: () => {
        bodyEl.innerHTML = "";
        const p1 = document.createElement("pre");
        p1.className = "t2-diagram";
        p1.textContent = ascii.hacking;
        const p2 = document.createElement("div");
        p2.className = "t2-text-block";
        p2.textContent =
          "hacking here means understanding how systems break so you can design them to be safer. " +
          "you learn attack surfaces, defense layers, logging, and safe patterns. this is a societal superpower — " +
          "you see the invisible edges of the systems everyone else trusts blindly.";
        bodyEl.appendChild(p1);
        bodyEl.appendChild(p2);
      }
    },
    "edu-automation": {
      title: "AUTOMATION SYSTEMS",
      category: "education",
      render: () => {
        bodyEl.innerHTML = "";
        const p1 = document.createElement("pre");
        p1.className = "t2-diagram";
        p1.textContent = ascii.automation;
        const p2 = document.createElement("div");
        p2.className = "t2-text-block";
        p2.textContent =
          "automation is how you scale yourself. you learn how to design workflows that trigger on events, " +
          "move data, and complete tasks while you sleep. this is how modern businesses operate behind the scenes.";
        bodyEl.appendChild(p1);
        bodyEl.appendChild(p2);
      }
    },
    "sys-map": {
      title: "SYSTEM MAP",
      category: "systems",
      render: () => {
        bodyEl.innerHTML = "";
        const p1 = document.createElement("pre");
        p1.className = "t2-diagram";
        p1.textContent = ascii.systems;
        const p2 = document.createElement("div");
        p2.className = "t2-text-block";
        p2.textContent =
          "terminal 1 is your preview shell. terminal 2 is your advanced shell. from here, you can reach " +
          "games, flash learning, courses, and deeper system tools. this is not a website — this is your own " +
          "operating layer for learning and building.";
        bodyEl.appendChild(p1);
        bodyEl.appendChild(p2);
      }
    }
  };

  const openModule = async id => {
    const mod = modules[id];
    if (!mod) {
      if (window.T2_MASTER) {
        await window.T2_MASTER.typeLine("module not found: " + id);
      }
      return;
    }

    if (window.T2_MASTER) {
      window.T2_MASTER.showModule();
      window.T2_MASTER.clearScreen();
    }

    titleEl.textContent = mod.title;
    mod.render();
  };

  window.T2_CONTENT = {
    openModule,
    modules
  };
})();
