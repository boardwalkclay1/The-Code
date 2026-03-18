// modules/loading.js
const loadingScreen = document.getElementById("loading-screen");

loadingScreen.innerHTML = `
  <div class="loading-title">THE CODE</div>
  <div class="loading-sub">Initializing matrix interface... stand by</div>
  <div class="loading-bar">
    <div class="loading-fill" id="loading-fill"></div>
  </div>
  <div class="loading-text" id="loading-text">[ 0% ] establishing secure terminal...</div>
`;

const loadingFill = document.getElementById("loading-fill");
const loadingText = document.getElementById("loading-text");
const app = document.getElementById("app");

let progress = 0;
const loadingInterval = setInterval(() => {
  progress += Math.floor(Math.random() * 7) + 3;
  if (progress > 100) progress = 100;

  loadingFill.style.width = progress + "%";
  loadingText.textContent = `[ ${progress}% ] compiling learning environment...`;

  if (progress >= 100) {
    clearInterval(loadingInterval);
    setTimeout(() => {
      loadingScreen.style.opacity = "0";
      loadingScreen.style.transition = "opacity 0.6s ease";
      setTimeout(() => {
        loadingScreen.style.display = "none";
        app.style.display = "grid";
      }, 600);
    }, 400);
  }
}, 120);
