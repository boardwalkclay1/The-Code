// modules/sidebar.js
const sidebar = document.getElementById("sidebar");

sidebar.innerHTML = `
  <div>
    <div class="sidebar-title">THE CODE</div>
    <div class="sidebar-sub">Matrix Terminal • Learning Interface</div>
  </div>

  <div>
    <div class="sidebar-section-label">Navigation</div>
    <ul class="sidebar-menu">
      <li>
        <button class="sidebar-link" data-dropdown="nav-lessons">
          <span>Lessons</span>
          <span class="arrow">▼</span>
        </button>
        <ul class="sidebar-dropdown" id="nav-lessons">
          <li><a href="paywall.html?next=lesson1">Lesson 1 — HTML Files</a></li>
          <li><a href="paywall.html?next=lesson2">Lesson 2 — index.html</a></li>
          <li><a href="paywall.html?next=lesson3">Lesson 3 — Structure</a></li>
          <li><a href="paywall.html?next=lesson4">Lesson 4 — Head & Body</a></li>
          <li><a href="paywall.html?next=lesson5">Lesson 5 — Tags</a></li>
          <li><a href="paywall.html?next=lesson6">Lesson 6 — CSS Files</a></li>
          <li><a href="paywall.html?next=lesson7">Lesson 7 — style.css</a></li>
          <li><a href="paywall.html?next=lesson8">Lesson 8 — Linking CSS</a></li>
          <li><a href="paywall.html?next=lesson9">Lesson 9 — Selectors</a></li>
          <li><a href="paywall.html?next=lesson10">Lesson 10 — Styling</a></li>
          <li><a href="paywall.html?next=lesson11">Lesson 11 — JS Files</a></li>
          <li><a href="paywall.html?next=lesson12">Lesson 12 — app.js</a></li>
          <li><a href="paywall.html?next=lesson13">Lesson 13 — Linking JS</a></li>
          <li><a href="paywall.html?next=lesson14">Lesson 14 — Console</a></li>
          <li><a href="paywall.html?next=lesson15">Lesson 15 — First App</a></li>
        </ul>
      </li>

      <li>
        <button class="sidebar-link" data-dropdown="nav-sim">
          <span>Simulators</span>
          <span class="arrow">▼</span>
        </button>
        <ul class="sidebar-dropdown" id="nav-sim">
          <li><a href="paywall.html?next=sim-html">HTML Simulator</a></li>
          <li><a href="paywall.html?next=sim-css">CSS Simulator</a></li>
          <li><a href="paywall.html?next=sim-js">JavaScript Simulator</a></li>
          <li><a href="paywall.html?next=sim-micro">Microcontroller Logic Lab</a></li>
        </ul>
      </li>

      <li>
        <button class="sidebar-link" data-dropdown="nav-knowledge">
          <span>Knowledge Hub</span>
          <span class="arrow">▼</span>
        </button>
        <ul class="sidebar-dropdown" id="nav-knowledge">
          <li><a href="paywall.html?next=code">Understanding the Code</a></li>
          <li><a href="paywall.html?next=errors">Common Errors</a></li>
          <li><a href="paywall.html?next=reading">How to Read Code</a></li>
          <li><a href="paywall.html?next=roadmap">Beginner Roadmap</a></li>
        </ul>
      </li>

      <li>
        <button class="sidebar-link" data-dropdown="nav-tools">
          <span>Tools</span>
          <span class="arrow">▼</span>
        </button>
        <ul class="sidebar-dropdown" id="nav-tools">
          <li><a href="paywall.html?next=github">GitHub Guide</a></li>
          <li><a href="paywall.html?next=chat">Live WebRTC Room</a></li>
        </ul>
      </li>
    </ul>
  </div>
`;

// dropdown behavior
document.querySelectorAll(".sidebar-link").forEach(btn => {
  btn.addEventListener("click", () => {
    const id = btn.getAttribute("data-dropdown");
    const dropdown = document.getElementById(id);
    if (!dropdown) return;
    dropdown.classList.toggle("open");
    const arrow = btn.querySelector(".arrow");
    if (arrow) {
      arrow.textContent = dropdown.classList.contains("open") ? "▲" : "▼";
    }
  });
});
