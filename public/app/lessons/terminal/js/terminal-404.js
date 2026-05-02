/* ============================================================
   CINEMATIC 404 TERMINAL FAILURE
   - Matrix rain assembles SYSTEM FAILURE + ACCESS DENIED
   - Terminal boots into failure mode
   - User chooses retry / return / shutdown
   ============================================================ */

const outEl = document.getElementById("terminal-output");
const inputEl = document.getElementById("terminal-input");
const shell = document.getElementById("terminal-shell");
const assembleLayer = document.getElementById("matrix-assemble");

/* ============================================================
   TYPEWRITER ENGINE
============================================================ */
const typeLine = (text, speed = 22) => {
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

const sleep = ms => new Promise(r => setTimeout(r, ms));

/* ============================================================
   MATRIX GLYPH ASSEMBLY EFFECT
============================================================ */
const assembleText = async (text, delay = 40) => {
  assembleLayer.innerHTML = "";

  const chars = text.split("");
  const width = window.innerWidth;
  const height = window.innerHeight;

  for (let i = 0; i < chars.length; i++) {
    const span = document.createElement("span");
    span.className = "assemble-glyph";
    span.textContent = chars[i];

    span.style.left = Math.random() * width + "px";
    span.style.top = "-60px";

    assembleLayer.appendChild(span);

    // animate falling into place
    setTimeout(() => {
      span.style.transition = "all 0.6s ease-out";
      span.style.top = height * 0.33 + "px";
      span.style.left = (width / 2) - (chars.length * 12) + (i * 24) + "px";
      span.style.opacity = 1;
    }, 50);

    await sleep(delay);
  }

  await sleep(900);
};

/* ============================================================
   FAILURE SEQUENCE
============================================================ */
const failureSequence = async () => {
  // Step 1: Matrix assembles SYSTEM FAILURE
  await assembleText("SYSTEM FAILURE");
  await sleep(500);

  // Step 2: Matrix assembles ACCESS DENIED
  await assembleText("ACCESS DENIED");
  await sleep(800);

  // Step 3: Fade out assembly layer
  assembleLayer.style.transition = "opacity 1s ease";
  assembleLayer.style.opacity = 0;
  await sleep(1000);
  assembleLayer.remove();

  // Step 4: Reveal terminal
  shell.classList.remove("hidden");

  // Step 5: Terminal failure boot
  await typeLine("initializing failure report...");
  await sleep(300);
  await typeLine("verifying credentials...");
  await sleep(300);
  await typeLine("ERROR: unauthorized access detected");
  await sleep(300);
  await typeLine("ERROR: gateway response invalid");
  await sleep(300);
  await typeLine("ERROR: matrix exit denied");
  await sleep(300);

  await typeLine("");
  await typeLine("you were not cleared to enter THE CODE.");
  await typeLine("this node has been locked.");
  await typeLine("");
  await typeLine("options:");
  await typeLine("  [1] retry gateway");
  await typeLine("  [2] return to matrix");
  await typeLine("  [3] shut down");
  await typeLine("");
  await typeLine("enter selection:");
};

/* ============================================================
   INPUT HANDLER
============================================================ */
const handleInput = async (value) => {
  const v = value.trim();

  if (v === "1") {
    window.location.href = "/";
    return;
  }

  if (v === "2") {
    window.location.href = "https://google.com";
    return;
  }

  if (v === "3") {
    await typeLine("shutting down...");
    await sleep(800);
    document.body.innerHTML = "";
    return;
  }

  await typeLine("> " + value);
  await typeLine("invalid selection.");
  await typeLine("enter selection:");
};

document.addEventListener("keydown", async (e) => {
  if (e.key === "Enter") {
    const value = inputEl.value;
    inputEl.value = "";
    await handleInput(value);
  }
});

/* ============================================================
   START FAILURE SEQUENCE
============================================================ */
failureSequence();
