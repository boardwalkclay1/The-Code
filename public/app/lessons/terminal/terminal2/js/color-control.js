/* ============================================================
   TERMINAL 2 — COLOR CONTROL
   public/app/lessons/terminal/terminal2/js/color-control.js
   ============================================================ */

(() => {
  const root = document.documentElement;

  const themes = {
    matrix: {
      "--t2-fg": "#00cc33",
      "--t2-glow": "0 0 6px #00cc33"
    },
    blue: {
      "--t2-fg": "#00aaff",
      "--t2-glow": "0 0 6px #00aaff"
    },
    white: {
      "--t2-fg": "#e0e0e0",
      "--t2-glow": "0 0 6px #e0e0e0"
    },
    red: {
      "--t2-fg": "#ff0033",
      "--t2-glow": "0 0 6px #ff0033"
    },
    dual: {
      "--t2-fg": "#00ff99",
      "--t2-glow": "0 0 8px #00ff99"
    }
  };

  let currentTheme = "matrix";

  const applyTheme = name => {
    const t = themes[name] || themes.matrix;
    currentTheme = name in themes ? name : "matrix";
    Object.entries(t).forEach(([k, v]) => {
      root.style.setProperty(k, v);
    });
  };

  const handleColorCommand = async arg => {
    if (!window.T2_MASTER) return;

    if (!arg) {
      await window.T2_MASTER.typeLine("available terminal themes:");
      await window.T2_MASTER.typeLine("1 / matrix green");
      await window.T2_MASTER.typeLine("2 / cyber blue");
      await window.T2_MASTER.typeLine("3 / clean white");
      await window.T2_MASTER.typeLine("4 / danger red");
      await window.T2_MASTER.typeLine("5 / dual-layer (green + blue)");
      await window.T2_MASTER.typeLine("type: color <1-5>");
      return;
    }

    const n = parseInt(arg, 10);
    let themeName = "matrix";
    if (n === 2) themeName = "blue";
    if (n === 3) themeName = "white";
    if (n === 4) themeName = "red";
    if (n === 5) themeName = "dual";

    applyTheme(themeName);
    await window.T2_MASTER.typeLine("theme set to " + themeName + ".");
    if (window.T2_LIGHTS) {
      window.T2_LIGHTS.pulse("green");
    }
  };

  applyTheme("matrix");

  window.T2_COLOR = {
    applyTheme,
    handleColorCommand,
    currentTheme
  };
})();
