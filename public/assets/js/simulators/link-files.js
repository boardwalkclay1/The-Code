// simulators/link-files.js
export function startLinkFilesSimulator(container) {
  container.innerHTML = "";
  const box = document.createElement("div");
  box.className = "sim-box";

  let step = 1;

  const title = document.createElement("h3");
  title.textContent = "Linking Files Simulator (Advanced)";

  const instructions = document.createElement("p");
  const question = document.createElement("p");
  const input = document.createElement("input");
  input.placeholder = "Type your answer...";
  const button = document.createElement("button");
  const result = document.createElement("div");
  result.className = "sim-result";

  box.appendChild(title);
  box.appendChild(instructions);
  box.appendChild(question);
  box.appendChild(input);
  box.appendChild(button);
  box.appendChild(result);
  container.appendChild(box);

  function render() {
    result.textContent = "";
    input.value = "";

    if (step === 1) {
      instructions.innerHTML = `
        Step 1: <strong>Linking CSS</strong><br>
        CSS must be linked inside the <head> of your HTML.
      `;
      question.textContent = "Write the correct link tag for styles/style.css.";
      button.textContent = "Check Answer";
    }

    if (step === 2) {
      instructions.innerHTML = `
        Step 2: <strong>Linking JavaScript</strong><br>
        JS should be linked at the bottom of the <body>.
      `;
      question.textContent = "Write the correct script tag for scripts/app.js.";
      button.textContent = "Check Answer";
    }

    if (step === 3) {
      instructions.innerHTML = `
        Step 3: <strong>Relative Paths</strong><br>
        You must reference files based on folder structure.
      `;
      question.textContent = "If index.html is in root and style.css is in styles/, what is the correct href path?";
      button.textContent = "Check Answer";
    }

    if (step === 4) {
      instructions.innerHTML = `
        Final Simulation (No Help):<br>
        Describe exactly how to link both CSS and JS correctly in a new project.
      `;
      question.textContent = "Type your full process.";
      button.textContent = "Submit Simulation";
    }
  }

  function check() {
    const answer = input.value.trim().toLowerCase();

    if (step === 1) {
      if (answer.includes("<link") && answer.includes("stylesheet") && answer.includes("styles/style.css")) {
        result.textContent = "Correct. CSS must be linked in the head.";
        step++;
        setTimeout(render, 900);
      } else {
        result.textContent = "Incorrect. Use <link rel=\"stylesheet\" href=\"styles/style.css\"> inside <head>.";
      }
    }

    else if (step === 2) {
      if (answer.includes("<script") && answer.includes("scripts/app.js") && !answer.includes("head")) {
        result.textContent = "Correct. JS belongs at the bottom of the body.";
        step++;
        setTimeout(render, 900);
      } else {
        result.textContent = "Incorrect. Use <script src=\"scripts/app.js\"></script> before </body>.";
      }
    }

    else if (step === 3) {
      if (answer === "styles/style.css" || answer.includes("styles/style.css")) {
        result.textContent = "Correct. The path is styles/style.css.";
        step++;
        setTimeout(render, 900);
      } else {
        result.textContent = "Incorrect. The correct relative path is styles/style.css.";
      }
    }

    else if (step === 4) {
      const good =
        answer.includes("link") &&
        answer.includes("stylesheet") &&
        answer.includes("styles") &&
        answer.includes("script") &&
        answer.includes("scripts");

      if (good) {
        result.textContent = "Excellent. You understand linking perfectly.";
      } else {
        result.textContent = "Try again. Mention linking CSS in <head> and JS at the bottom.";
      }
    }
  }

  button.addEventListener("click", check);
  render();
}
