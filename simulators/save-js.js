// simulators/save-js.js
export function startJSSaveSimulator(container) {
  container.innerHTML = "";
  const wrapper = document.createElement("div");
  wrapper.className = "sim-box";

  let step = 1;

  const title = document.createElement("h3");
  title.textContent = "JS Save Simulator (Advanced)";

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
        Your main JavaScript file should have a clear name and .js extension.
      `;
      question.textContent = "What is a common name and extension for your main JS file?";
      button.textContent = "Check Answer";
    } else if (step === 2) {
      instructions.innerHTML = `
        Step 2: <strong>Folder Location</strong><br>
        JS files are often stored in a dedicated folder.
      `;
      question.textContent = "What is a common folder name where you store your JS file?";
      button.textContent = "Check Answer";
    } else if (step === 3) {
      instructions.innerHTML = `
        Step 3: <strong>Script Tag Placement</strong><br>
        To avoid errors, you usually load JS at the end of the body.
      `;
      question.textContent = "Write the correct script tag to load scripts/app.js at the bottom of the HTML.";
      button.textContent = "Check Answer";
    } else if (step === 4) {
      instructions.innerHTML = `
        Final Simulation (No Help):<br>
        Describe exactly how you would create, save, and link your JS file in a new project.
      `;
      question.textContent = "Type your full process.";
      button.textContent = "Submit Simulation";
    }
  }

  function checkAnswer() {
    const answer = input.value.trim().toLowerCase();

    if (step === 1) {
      if (answer.includes("app.js") || answer.includes("main.js")) {
        result.textContent = "Correct. app.js or main.js are common main JS file names.";
        step++;
        setTimeout(renderStep, 900);
      } else {
        result.textContent = "Try again. A very common main JS file name is app.js.";
      }
    } else if (step === 2) {
      if (answer.includes("scripts") || answer.includes("js")) {
        result.textContent = "Correct. Many projects use a scripts/ or js/ folder.";
        step++;
        setTimeout(renderStep, 900);
      } else {
        result.textContent = "Hint: Think of a folder name like scripts/ or js/.";
      }
    } else if (step === 3) {
      if (answer.includes("<script") && answer.includes("scripts/app.js") && !answer.includes("head")) {
        result.textContent = "Correct. You wrote a valid script tag for the bottom of the body.";
        step++;
        setTimeout(renderStep, 900);
      } else {
        result.textContent = "Make sure you use <script src=\"scripts/app.js\"></script> at the end of the body.";
      }
    } else if (step === 4) {
      const good = (answer.includes("app.js") || answer.includes("main.js")) &&
                   (answer.includes("scripts/") || answer.includes("js/")) &&
                   (answer.includes("<script") || answer.includes("script tag"));

      if (good) {
        result.textContent = "Nice. You clearly understand how to save and link your JS file.";
      } else {
        result.textContent = "You’re close. Mention app.js, a scripts/ folder, and the script tag at the bottom.";
      }
    }
  }

  button.addEventListener("click", checkAnswer);
  renderStep();
}
