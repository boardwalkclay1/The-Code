document.addEventListener("DOMContentLoaded", () => {

  /* ============================================================
     MATRIX TERMINAL CORE
  ============================================================ */
  function logMatrix(msg) {
    const color = getComputedStyle(document.documentElement)
      .getPropertyValue("--matrix-color")
      .trim();
    console.log(`%c[MATRIX] ${msg}`, `color:${color}; font-weight:bold;`);
  }

  function logError(msg) {
    console.log(`%c[ERROR] ${msg}`, "color:#ff4f4f; font-weight:bold;");
  }

  logMatrix("SYSTEM BOOTING...");
  setTimeout(() => logMatrix("LOADING MODULES..."), 200);
  setTimeout(() => logMatrix("ACCESS CONTROL ONLINE"), 400);
  setTimeout(() => logMatrix("UI ENGINE ONLINE"), 600);
  setTimeout(() => logMatrix("PAGE READY"), 800);



  /* ============================================================
     MATRIX COLOR CYCLE (GREEN → RED → BLUE → GREEN)
  ============================================================ */
  const matrixColors = [
    "#00ff41", // green
    "#ff0033", // red
    "#0099ff", // blue
    "#00ff41"  // back to green
  ];

  let matrixIndex = 0;

  setInterval(() => {
    matrixIndex = (matrixIndex + 1) % matrixColors.length;
    const newColor = matrixColors[matrixIndex];
    document.documentElement.style.setProperty("--matrix-color", newColor);
    logMatrix(`COLOR SHIFT`);
  }, 3000);



  /* ============================================================
     ACCESS CONTROL (PAYMENT / EMAIL / OVERRIDE)
  ============================================================ */
  function userHasAccess() {
    return localStorage.getItem("access_granted") === "true";
  }

  function updateLockState() {
    const lockable = document.querySelectorAll("[data-lock]");

    lockable.forEach(el => {
      if (userHasAccess()) {
        el.classList.remove("locked");
        el.removeAttribute("disabled");
      } else {
        el.classList.add("locked");
        el.setAttribute("disabled", "true");
      }
    });

    if (userHasAccess()) {
      logMatrix("ACCESS VERIFIED — SYSTEM UNLOCKED");
    } else {
      logMatrix("LOCKED MODE ACTIVE — PAYMENT REQUIRED");
    }
  }

  updateLockState();



  /* ============================================================
     NEW 4‑CLICK MASTER OVERRIDE (TOP‑RIGHT)
  ============================================================ */
  (function () {
    let tapCount = 0;
    let resetTimer = null;

    const overrideZone = document.createElement("div");
    overrideZone.style.position = "fixed";
    overrideZone.style.top = "0";
    overrideZone.style.right = "0";
    overrideZone.style.width = "80px";
    overrideZone.style.height = "80px";
    overrideZone.style.zIndex = "99999";
    overrideZone.style.cursor = "pointer";
    overrideZone.style.background = "transparent";
    document.body.appendChild(overrideZone);

    overrideZone.addEventListener("click", () => {
      tapCount++;

      if (resetTimer) clearTimeout(resetTimer);

      resetTimer = setTimeout(() => {
        tapCount = 0;
      }, 1200);

      if (tapCount >= 4) {
        localStorage.setItem("access_granted", "true");
        logMatrix("MASTER OVERRIDE — ACCESS GRANTED");
        tapCount = 0;
        updateLockState();
      }
    });
  })();



  /* ============================================================
     MATRIX LOADING SCREEN
  ============================================================ */
  const loadingScreen = document.getElementById("loading-screen");
  const appRoot = document.getElementById("app");
  const loadingFill = document.querySelector(".loading-fill");
  const loadingPercent = document.getElementById("loading-percent");

  if (loadingScreen && loadingFill && loadingPercent) {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 12) + 8;
      if (progress > 100) progress = 100;

      loadingFill.style.width = progress + "%";
      loadingPercent.textContent = progress + "%";

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          loadingScreen.style.transition = "opacity 0.6s ease-out";
          loadingScreen.style.opacity = "0";

          setTimeout(() => {
            loadingScreen.remove();
            if (appRoot) appRoot.classList.remove("hidden");
            logMatrix("LOADER COMPLETE — UI VISIBLE");
          }, 600);
        }, 300);
      }
    }, 260);
  }



  /* ============================================================
     LESSON CARDS
  ============================================================ */
  const lessonCards = document.querySelectorAll(".lesson-card");

  lessonCards.forEach(card => {
    card.addEventListener("click", event => {
      if (!userHasAccess() && card.hasAttribute("data-lock")) {
        event.preventDefault();
        logError("ACCESS DENIED — LESSON LOCKED");
        alert("This lesson is locked. Complete payment to unlock The Code.");
      }
    });
  });



  /* ============================================================
     SIMULATOR BUTTONS
  ============================================================ */
  const simLinks = document.querySelectorAll('a[href*="simulators"], button[data-sim]');

  simLinks.forEach(el => {
    el.addEventListener("click", event => {
      if (!userHasAccess() && el.hasAttribute("data-lock")) {
        event.preventDefault();
        logError("ACCESS DENIED — SIMULATORS LOCKED");
        alert("Simulators are locked. Complete payment to unlock The Code.");
      }
    });
  });



  /* ============================================================
     NAV BUTTONS
  ============================================================ */
  const navButtons = document.querySelectorAll(".nav-btn");

  navButtons.forEach(btn => {
    btn.addEventListener("click", event => {
      if (!userHasAccess() && btn.hasAttribute("data-lock")) {
        event.preventDefault();
        logError("ACCESS DENIED — NAV TARGET LOCKED");
      }
    });
  });



  /* ============================================================
     LESSON MODAL
  ============================================================ */
  const lessonModal = document.getElementById("lesson-modal");
  const closeLessonModal = document.getElementById("close-lesson-modal");

  if (lessonModal && closeLessonModal) {
    closeLessonModal.addEventListener("click", () => {
      lessonModal.classList.add("hidden");
      logMatrix("LESSON MODAL CLOSED");
    });
  }



  /* ============================================================
     WEBRTC LIVE ROOM
  ============================================================ */
  const startCameraBtn = document.getElementById("startCameraBtn");
  const createOfferBtn = document.getElementById("createOfferBtn");
  const setOfferBtn = document.getElementById("setOfferBtn");
  const createAnswerBtn = document.getElementById("createAnswerBtn");
  const setAnswerBtn = document.getElementById("setAnswerBtn");

  [startCameraBtn, createOfferBtn, setOfferBtn, createAnswerBtn, setAnswerBtn]
    .filter(Boolean)
    .forEach(btn => {
      btn.addEventListener("click", () => {
        if (!userHasAccess() && btn.hasAttribute("data-lock")) {
          logError("ACCESS DENIED — LIVE ROOM LOCKED");
          alert("The Live Room is locked. Complete payment to unlock The Code.");
        }
      }, { capture: true });
    });

  logMatrix("PAGE INITIALIZED");

});
