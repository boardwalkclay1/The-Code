/* ============================================================
   TERMINAL 2 — ADVANCED MATRIX ENGINE
   public/app/lessons/terminal/terminal2/js/matrix-advanced.js
   ============================================================ */

(() => {
  const canvas = document.getElementById("t2-matrix");
  if (!canvas) {
    console.warn("[Terminal2] No advanced matrix canvas found.");
    return;
  }

  const ctx = canvas.getContext("2d");

  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resize();
  window.addEventListener("resize", resize);

  const chars = "アァカサタナハマヤャラワ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ{}[]<>/\\=+-_*";
  const fontSize = 16;
  let columns = Math.floor(canvas.width / fontSize);
  let drops = Array(columns).fill(1);

  let glitchTimer = 0;
  let glitchActive = false;

  const draw = () => {
    ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const theme = (window.T2_COLOR && window.T2_COLOR.currentTheme) || "matrix";
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

      if (y > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }

    // occasional glitch overlay
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

    requestAnimationFrame(draw);
  };

  requestAnimationFrame(draw);

  window.T2_MATRIX = {
    triggerGlitch: () => {
      glitchActive = true;
      glitchTimer = 20;
    }
  };
})();
