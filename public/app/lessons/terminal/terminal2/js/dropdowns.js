/* ============================================================
   TERMINAL 2 — DROPDOWNS & MAIN MENU
   public/app/lessons/terminal/terminal2/js/dropdowns.js
   ============================================================ */

(() => {
  const menuEl = document.getElementById("t2-menu");
  if (!menuEl) {
    console.warn("[Terminal2] Menu element not found.");
    return;
  }

  const categories = [
    {
      id: "education",
      label: "⌘ education",
      items: [
        { id: "edu-web", label: "web fundamentals" },
        { id: "edu-apps", label: "app development" },
        { id: "edu-mcu", label: "mcu engineering" },
        { id: "edu-hacking", label: "hacking & security" },
        { id: "edu-automation", label: "automation systems" }
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
        { id: "game-flash", label: "code flash (10s)" }
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
        { id: "sys-map", label: "system map" }
      ]
    },
    {
      id: "unlockables",
      label: "⛉ unlockables",
      items: [
        { id: "unlock-hidden", label: "hidden commands" },
        { id: "unlock-dev", label: "developer mode" }
      ]
    }
  ];

  const buildMainMenu = async () => {
    if (window.T2_MASTER) {
      window.T2_MASTER.clearScreen();
    }
    menuEl.innerHTML = "";

    const title = document.createElement("div");
    title.className = "t2-menu-title";
    title.textContent = "select a category:";
    menuEl.appendChild(title);

    categories.forEach(cat => {
      const catEl = document.createElement("div");
      catEl.className = "t2-menu-category";
      catEl.dataset.categoryId = cat.id;
      catEl.textContent = cat.label;

      const listEl = document.createElement("div");
      listEl.className = "t2-menu-list";
      listEl.dataset.categoryId = cat.id;

      cat.items.forEach(item => {
        const itemEl = document.createElement("button");
        itemEl.className = "t2-menu-item";
        itemEl.dataset.moduleId = item.id;
        itemEl.textContent = "• " + item.label;
        itemEl.addEventListener("click", async () => {
          if (item.id.startsWith("game-")) {
            if (window.T2_MASTER) {
              window.T2_MASTER.clearScreen();
              window.T2_MASTER.showModule();
            }
            if (window.T2_GAMES && window.T2_GAMES.launch) {
              window.T2_GAMES.launch(item.id);
            } else if (window.T2_MASTER) {
              await window.T2_MASTER.typeLine("game engine not wired yet.");
            }
          } else if (item.id.startsWith("course-")) {
            if (window.T2_MASTER) {
              await window.T2_MASTER.typeLine("course engine placeholder: " + item.id);
            }
          } else {
            if (window.T2_CONTENT) {
              await window.T2_CONTENT.openModule(item.id);
            }
          }
        });
        listEl.appendChild(itemEl);
      });

      catEl.addEventListener("click", () => {
        const expanded = listEl.classList.toggle("t2-menu-list-open");
        if (expanded && window.T2_LIGHTS) {
          window.T2_LIGHTS.pulse("green");
        }
      });

      menuEl.appendChild(catEl);
      menuEl.appendChild(listEl);
    });

    if (window.T2_MASTER) {
      await window.T2_MASTER.typeLine("advanced categories loaded.");
      await window.T2_MASTER.typeLine("you can click items or use commands like games, courses, systems.");
      await window.T2_MASTER.typeLine("press control + c to exit this screen.");
    }
  };

  const showHelp = async () => {
    if (!window.T2_MASTER) return;
    await window.T2_MASTER.typeLine("[ADVANCED COMMANDS]");
    await window.T2_MASTER.typeLine("  helpp        : show this list");
    await window.T2_MASTER.typeLine("  menu         : show advanced categories");
    await window.T2_MASTER.typeLine("  games        : open games category");
    await window.T2_MASTER.typeLine("  flash        : open flash learning category");
    await window.T2_MASTER.typeLine("  courses      : open courses category");
    await window.T2_MASTER.typeLine("  systems      : open systems category");
    await window.T2_MASTER.typeLine("  unlockables  : open unlockables category");
    await window.T2_MASTER.typeLine("  color        : change terminal theme");
    await window.T2_MASTER.typeLine("  open <id>    : open a specific module");
  };

  const openCategory = async id => {
    const list = menuEl.querySelector(`.t2-menu-list[data-category-id="${id}"]`);
    if (!list) {
      if (window.T2_MASTER) {
        await window.T2_MASTER.typeLine("category not found: " + id);
      }
      return;
    }
    list.classList.add("t2-menu-list-open");
    if (window.T2_LIGHTS) {
      window.T2_LIGHTS.pulse("green");
    }
  };

  window.T2_DROPDOWNS = {
    buildMainMenu,
    showHelp,
    openCategory,
    showMainMenu: buildMainMenu
  };
})();
