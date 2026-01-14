// simulators/save-css.js
export function startCSSSaveSimulator(container) {
  container.innerHTML = "";
  const wrapper = document.createElement("div");
  wrapper.className = "sim-box";

  let step = 1;

  const title = document.createElement("h3");
  title.textContent = "CSS Save Simulator (Advanced)";

  const instructions = document.createElement("p");
  const question = document.createElement("p");
  const input = document.createElement("input");
  input.placeholder = "Type your answer here...";
  const button = document.createElement("button");
  const result = document.createElement("div");
  result.className = "sim-result";

  wrapper.appendChild(title);
  wrapper.appendChild(instructions);
  wrapper.appendChild(question);
  wrapper.appendChild(input);
  wrapper.appendChild(button);
  wrapper.appendChild(result);
  container.appendChild(wrapper);

  function renderStep() {
    result.textContent = "";
    input.value = "";

    if (step === 1) {
      instructions.innerHTML = `
        Step 1: <strong>File Name & Extension</strong><br>
        Your main CSS file usually has a simple, clear name.
      `;
      question.textContent = "What is a common name and extension for your main CSS file?";
      button.textContent = "Check Answer";
    } else if (step === 2) {
      instructions.innerHTML = `
        Step 2: <strong>Folder Location</strong><br>
        CSS files are often stored in a dedicated folder.
      `;
      question.textContent = "What is a common folder name where you store your CSS file?";
      button.textContent = "Check Answer";
    } else if (step === 3) {
      instructions.innerHTML = `
        Step 3: <strong>Linking from HTML</strong><br>
        You must link your CSS file inside your HTML head.
      `;
      question.textContent = "Write the correct HTML tag to link styles/style.css.";
      button.textContent = "Check Answer";
    } else if (step === 4) {
      instructions.innerHTML = `
        Final Simulation (No Help):<br>
        Describe exactly how you would create, save, and link your CSS file in a new project.
      `;
      question.textContent = "Type your full process.";
      button.textContent = "Submit Simulation";
    }
  }

  function checkAnswer() {
    const answer = input.value.trim().toLowerCase();

    if (step === 1) {
      if (answer.includes("style.css") || answer.includes("styles.css")) {
        result.textContent = "Correct. style.css (or similar) is a common main CSS file name.";
        step++;
        setTimeout(renderStep, 900);
      } else {
        result.textContent = "Try again. A very common main CSS file name is style.css.";
      }
    } else if (step === 2) {
      if (answer.includes("styles") || answer.includes("css")) {
        result.textContent = "Correct. Many projects use a styles/ or css/ folder.";
        step++;
        setTimeout(renderStep, 900);
      } else {
        result.textContent = "Hint: Think of a folder name like styles/ or css/.";
      }
    } else if (step === 3) {
      if (answer.includes("<link") && answer.includes("stylesheet") && answer.includes("styles/style.css")) {
        result.textContent = "Correct. You wrote a valid link tag.";
        step++;
        setTimeout(renderStep, 900);
      } else {
        result.textContent = "Make sure you use <link rel=\"stylesheet\" href=\"styles/style.css\"> inside the <head>.";
      }
    } else if (step === 4) {
      const good = answer.includes("style.css") &&
                   (answer.includes("styles/") || answer.includes("css/")) &&
                   (answer.includes("<link") || answer.includes("link tag"));

      if (good) {
        result.textContent = "Strong. You clearly understand how to save and link your CSS file.";
      } else {
        result.textContent = "You’re close. Mention style.css, a styles/ folder, and the link tag in HTML.";
      }
    }
  }

  button.addEventListener("click", checkAnswer);
  renderStep();
}
