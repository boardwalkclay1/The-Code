document.addEventListener("DOMContentLoaded", () => {

  /* ============================
     ACCESS CONTROL SYSTEM
  ============================ */
  const ownerEmail = "boardwalkclay1@gmail.com";

  const savedEmail = localStorage.getItem("user_email");
  const hasAccessFlag = localStorage.getItem("access_granted") === "true";

  // If saved email is yours, auto-unlock
  if (savedEmail && savedEmail.toLowerCase() === ownerEmail.toLowerCase()) {
    localStorage.setItem("access_granted", "true");
  }

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
  }

  updateLockState();



  /* ============================
     MATRIX LOADING SCREEN
  ============================ */
  const loadingScreen = document.getElementById("loading-screen");
  const app = document.getElementById("app");
  const loadingFill = document.querySelector(".loading-fill");
  const loadingPercent = document.getElementById("loading-percent");

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 12) + 8;
    if (progress > 100) progress = 100;

    if (loadingFill) loadingFill.style.width = progress + "%";
    if (loadingPercent) loadingPercent.textContent = progress + "%";

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        if (loadingScreen) {
          loadingScreen.style.transition = "opacity 0.6s ease-out";
          loadingScreen.style.opacity = "0";
        }

        setTimeout(() => {
          if (loadingScreen) loadingScreen.remove();
          if (app) app.classList.remove("hidden");
        }, 600);
      }, 300);
    }
  }, 260);



  /* ============================
     NAVIGATION SYSTEM
  ============================ */
  const navButtons = document.querySelectorAll(".nav-btn");
  const views = document.querySelectorAll(".view");

  function setActiveView(targetId) {
    views.forEach(v => v.classList.remove("active"));
    const target = document.getElementById(`view-${targetId}`);
    if (target) target.classList.add("active");

    navButtons.forEach(btn => {
      btn.classList.toggle("active", btn.dataset.target === targetId);
    });
  }

  navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      if (!userHasAccess() && btn.hasAttribute("data-lock")) return;
      setActiveView(btn.dataset.target);
    });
  });

  const startPathBtn = document.getElementById("start-path-btn");
  if (startPathBtn) {
    startPathBtn.addEventListener("click", () => {
      if (!userHasAccess() && startPathBtn.hasAttribute("data-lock")) return;
      setActiveView("lessons");
    });
  }



  /* ============================
     LESSON ENGINE + PROGRESSION
  ============================ */
  const lessonCards = document.querySelectorAll(".lesson-card");
  const lessonModal = document.getElementById("lesson-modal");
  const lessonModalBody = document.getElementById("lesson-modal-body");
  const closeLessonModal = document.getElementById("close-lesson-modal");

  let lessonProgress = JSON.parse(localStorage.getItem("codeLessonProgress")) || {
    1: false,
    2: false,
    3: false
  };

  const fullLessons = {
    1: {
      title: "Lesson 1: What is a Web Project?",
      content: `
        <p>A web project is made of three core files:</p>
        <ul>
          <li><strong>HTML</strong> — structure</li>
          <li><strong>CSS</strong> — style</li>
          <li><strong>JS</strong> — behavior</li>
        </ul>
        <p>Browsers read HTML first, then load CSS and JS. This is why structure matters.</p>
      `,
      quiz: {
        question: "Which file controls the structure of a webpage?",
        options: [
          { text: "HTML", correct: true },
          { text: "CSS", correct: false },
          { text: "JavaScript", correct: false }
        ]
      }
    },

    2: {
      title: "Lesson 2: Setting Up Your First Folder",
      content: `
        <p>Your first disciplined project structure:</p>
        <pre><code>my-first-project/
  index.html
  styles/
    style.css
  scripts/
    app.js</code></pre>
        <p>This structure keeps your project clean and scalable.</p>
      `,
      quiz: {
        question: "Where should style.css be placed?",
        options: [
          { text: "In the root folder", correct: false },
          { text: "Inside a folder named styles/", correct: true },
          { text: "Inside scripts/", correct: false }
        ]
      }
    },

    3: {
      title: "Lesson 3: Linking HTML, CSS, and JS",
      content: `
        <p>To connect your files:</p>
        <ul>
          <li>Link CSS in the &lt;head&gt;</li>
          <li>Load JS at the bottom of &lt;body&gt;</li>
        </ul>
        <p>This ensures your page loads correctly and efficiently.</p>
      `,
      quiz: {
        question: "Where should app.js be linked?",
        options: [
          { text: "Inside &lt;head&gt;", correct: false },
          { text: "At the bottom of &lt;body&gt;", correct: true },
          { text: "It doesn't need to be linked", correct: false }
        ]
      }
    }
  };

  function openLesson(id) {
    if (!userHasAccess()) {
      alert("You must unlock access first.");
      return;
    }

    if (id > 1 && !lessonProgress[id - 1]) {
      alert("Complete the previous lesson first.");
      return;
    }

    const lesson = fullLessons[id];

    lessonModalBody.innerHTML = `
      <h2>${lesson.title}</h2>
      ${lesson.content}
      <div class="quiz-question">${lesson.quiz.question}</div>
      ${lesson.quiz.options
        .map(opt => `<div class="quiz-option" data-correct="${opt.correct}">${opt.text}</div>`)
        .join("")}
      <button class="complete-lesson-btn hidden" id="complete-lesson-btn">Mark Lesson Complete</button>
    `;

    lessonModal.classList.remove("hidden");

    const options = lessonModalBody.querySelectorAll(".quiz-option");
    const completeBtn = document.getElementById("complete-lesson-btn");

    options.forEach(opt => {
      opt.addEventListener("click", () => {
        const correct = opt.dataset.correct === "true";

        options.forEach(o => (o.style.pointerEvents = "none"));

        if (correct) {
          opt.classList.add("correct");
          completeBtn.classList.remove("hidden");
        } else {
          opt.classList.add("wrong");
        }
      });
    });

    completeBtn.addEventListener("click", () => {
      lessonProgress[id] = true;
      localStorage.setItem("codeLessonProgress", JSON.stringify(lessonProgress));
      lessonModal.classList.add("hidden");
    }, { once: true });
  }

  if (closeLessonModal) {
    closeLessonModal.addEventListener("click", () => {
      lessonModal.classList.add("hidden");
    });
  }

  lessonCards.forEach(card => {
    card.addEventListener("click", () => {
      openLesson(Number(card.dataset.lesson));
    });
  });



  /* ============================
     WEBRTC LIVE ROOM
  ============================ */
  let localStream = null;
  let peerConnection = null;

  const iceServers = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
  };

  const startCameraBtn = document.getElementById("startCameraBtn");
  const createOfferBtn = document.getElementById("createOfferBtn");
  const setOfferBtn = document.getElementById("setOfferBtn");
  const createAnswerBtn = document.getElementById("createAnswerBtn");
  const setAnswerBtn = document.getElementById("setAnswerBtn");

  const localVideo = document.getElementById("localVideo");
  const remoteVideo = document.getElementById("remoteVideo");

  const offerOut = document.getElementById("offerOut");
  const offerIn = document.getElementById("offerIn");
  const answerOut = document.getElementById("answerOut");
  const answerIn = document.getElementById("answerIn");

  if (startCameraBtn) {
    startCameraBtn.addEventListener("click", async () => {
      try {
        localStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        });
        if (localVideo) localVideo.srcObject = localStream;
      } catch (err) {
        alert("Camera/mic access failed.");
      }
    });
  }

  function createPeerConnection() {
    peerConnection = new RTCPeerConnection(iceServers);

    if (localStream) {
      localStream.getTracks().forEach(track => {
        peerConnection.addTrack(track, localStream);
      });
    }

    peerConnection.addEventListener("track", event => {
      if (remoteVideo) remoteVideo.srcObject = event.streams[0];
    });
  }

  if (createOfferBtn) {
    createOfferBtn.addEventListener("click", async () => {
      if (!localStream) return alert("Start camera first.");

      createPeerConnection();

      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);

      if (offerOut) offerOut.value = JSON.stringify(offer);
    });
  }

  if (setOfferBtn) {
    setOfferBtn.addEventListener("click", async () => {
      try {
        const offer = JSON.parse(offerIn.value);

        createPeerConnection();
        await peerConnection.setRemoteDescription(offer);

        alert("Offer set. Now create answer.");
      } catch {
        alert("Invalid offer JSON.");
      }
    });
  }

  if (createAnswerBtn) {
    createAnswerBtn.addEventListener("click", async () => {
      if (!peerConnection) return alert("Set offer first.");
      if (!localStream) return alert("Start camera first.");

      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);

      if (answerOut) answerOut.value = JSON.stringify(answer);
    });
  }

  if (setAnswerBtn) {
    setAnswerBtn.addEventListener("click", async () => {
      try {
        const answer = JSON.parse(answerIn.value);
        await peerConnection.setRemoteDescription(answer);

        alert("Connected.");
      } catch {
        alert("Invalid answer JSON.");
      }
    });
  }

});
