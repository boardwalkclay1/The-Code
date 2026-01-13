document.addEventListener("DOMContentLoaded", () => {
  const loadingScreen = document.getElementById("loading-screen");
  const app = document.getElementById("app");
  const loadingFill = document.querySelector(".loading-fill");
  const loadingPercent = document.getElementById("loading-percent");

  // Simulated loading
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 15) + 5; // +5 to +19
    if (progress > 100) progress = 100;
    loadingFill.style.width = progress + "%";
    loadingPercent.textContent = progress + "%";

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        loadingScreen.style.opacity = "0";
        loadingScreen.style.transition = "opacity 0.6s ease-out";
        setTimeout(() => {
          loadingScreen.style.display = "none";
          app.classList.remove("hidden");
        }, 600);
      }, 400);
    }
  }, 300);

  // Navigation
  const navButtons = document.querySelectorAll(".nav-btn");
  const views = document.querySelectorAll(".view");

  function setActiveView(targetId) {
    views.forEach(v => v.classList.remove("active"));
    document.getElementById(`view-${targetId}`).classList.add("active");

    navButtons.forEach(btn => btn.classList.remove("active"));
    navButtons.forEach(btn => {
      if (btn.dataset.target === targetId) {
        btn.classList.add("active");
      }
    });
  }

  navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.target;
      setActiveView(target);
    });
  });

  // Home "Start Learning Path" button
  const startPathBtn = document.getElementById("start-path-btn");
  startPathBtn.addEventListener("click", () => {
    setActiveView("lessons");
  });

  // Lesson content (we can expand this in later builds)
  const lessonDetail = document.getElementById("lesson-detail");
  const lessonCards = document.querySelectorAll(".lesson-card");

  const lessonContent = {
    1: {
      title: "Lesson 1: What is a Web Project?",
      body: `
        <p><strong>Goal:</strong> Understand how the browser reads your files and why HTML, CSS, and JS each have a job.</p>
        <ul>
          <li><strong>HTML:</strong> The structure — what exists on the page.</li>
          <li><strong>CSS:</strong> The style — how the page looks.</li>
          <li><strong>JS:</strong> The behavior — how the page reacts.</li>
        </ul>
        <p>You’ll never randomly drop files again. From now on, everything has a deliberate place.</p>
      `
    },
    2: {
      title: "Lesson 2: Setting Up Your First Folder",
      body: `
        <p><strong>Goal:</strong> Create a disciplined base structure for any beginner project.</p>
        <pre><code>my-first-project/
  index.html
  styles/
    style.css
  scripts/
    app.js</code></pre>
        <p>This layout turns you from a dabbler into a builder — every file lives where it belongs.</p>
      `
    },
    3: {
      title: "Lesson 3: Linking HTML, CSS, and JS",
      body: `
        <p><strong>Goal:</strong> Make your three core files talk to each other correctly.</p>
        <p>You’ll learn how to:</p>
        <ul>
          <li>Link <strong>style.css</strong> inside <strong>&lt;head&gt;</strong>.</li>
          <li>Load <strong>app.js</strong> at the bottom of <strong>&lt;body&gt;</strong>.</li>
          <li>Test everything with one change and one refresh.</li>
        </ul>
      `
    }
  };

  lessonCards.forEach(card => {
    card.addEventListener("click", () => {
      const id = card.dataset.lesson;
      const content = lessonContent[id];
      if (!content) return;

      lessonDetail.innerHTML = `
        <h3>${content.title}</h3>
        ${content.body}
      `;
    });
  });
});
