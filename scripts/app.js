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

  const lessonContent = // Track lesson completion
let lessonProgress = JSON.parse(localStorage.getItem("codeLessonProgress")) || {
  1: false,
  2: false,
  3: false
};

// Full lesson data
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

// Open lesson modal
function openLesson(id) {
  if (id > 1 && !lessonProgress[id - 1]) {
    alert("Complete the previous lesson first.");
    return;
  }

  const modal = document.getElementById("lesson-modal");
  const body = document.getElementById("lesson-modal-body");
  const lesson = fullLessons[id];

  body.innerHTML = `
    <h2>${lesson.title}</h2>
    ${lesson.content}
    <div class="quiz-question">${lesson.quiz.question}</div>
    ${lesson.quiz.options
      .map(
        (opt, i) =>
          `<div class="quiz-option" data-correct="${opt.correct}">${opt.text}</div>`
      )
      .join("")}
    <button class="complete-lesson-btn hidden" id="complete-lesson-btn">Mark Lesson Complete</button>
  `;

  modal.classList.remove("hidden");

  // Quiz logic
  const options = document.querySelectorAll(".quiz-option");
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

  // Completion logic
  completeBtn.addEventListener("click", () => {
    lessonProgress[id] = true;
    localStorage.setItem("codeLessonProgress", JSON.stringify(lessonProgress));
    modal.classList.add("hidden");
  });
}

// Close modal
document.getElementById("close-lesson-modal").addEventListener("click", () => {
  document.getElementById("lesson-modal").classList.add("hidden");
});

// Lesson card click
lessonCards.forEach(card => {
  card.addEventListener("click", () => {
    openLesson(Number(card.dataset.lesson));
  });
});

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
