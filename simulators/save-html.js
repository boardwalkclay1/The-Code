// simulators/save-html.js
export function startHTMLSaveSimulator(container) {
  container.innerHTML = "";
  const wrapper = document.createElement("div");
  wrapper.className = "sim-box";

  let step = 1;

  const title = document.createElement("h3");
  title.textContent = "HTML Save Simulator (Advanced)";

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
        Step 1: <strong>File Name</strong><br>
        Your main HTML file should be named so the browser and hosting know it’s the entry point.
      `;
      question.textContent = "What is the correct main HTML file name for your project?";
      button.textContent = "Check Answer";
    } else if (step === 2) {
      instructions.innerHTML = `
        Step 2: <strong>File Extension</strong><br>
        The extension tells the computer what type of file it is.
      `;
      question.textContent = "What extension should an HTML file use (include the dot)?";
      button.textContent = "Check Answer";
    } else if (step === 3) {
      instructions.innerHTML = `
        Step 3: <strong>Save Location</strong><br>
        Your HTML file should live in the root of your project folder.
      `;
      question.textContent = "Where should you save index.html in your project structure?";
      button.textContent = "Check Answer";
    } else if (step === 4) {
      instructions.innerHTML = `
        Final Simulation (No Help):<br>
        Imagine you are creating a new project from scratch.<br>
        Describe exactly how you would create and save your main HTML file so it works on the web.
      `;
      question.textContent = "Type your full process in one sentence or more.";
      button.textContent = "Submit Simulation";
    }
  }

  function checkAnswer() {
    const answer = input.value.trim().toLowerCase();

    if (step === 1) {
      if (answer === "index.html") {
        result.textContent = "Correct. index.html is the standard entry file name.";
        step++;
        setTimeout(renderStep, 900);
      } else {
        result.textContent = "Not quite. The correct name is index.html — all lowercase, no spaces.";
      }
    } else if (step === 2) {
      if (answer === ".html" || answer === "html") {
        result.textContent = "Correct. .html is the proper extension.";
        step++;
        setTimeout(renderStep, 900);
      } else {
        result.textContent = "Close. HTML files must end with .html.";
      }
    } else if (step === 3) {
      if (answer.includes("root") || answer.includes("main folder") || answer.includes("project folder")) {
        result.textContent = "Correct. index.html should live in the root of your project folder.";
        step++;
        setTimeout(renderStep, 900);
      } else {
        result.textContent = "Hint: index.html should be in the main project folder, not inside styles/ or scripts/.";
      }
    } else if (step === 4) {
      // Simple heuristic: look for key concepts
      const good = answer.includes("index.html") &&
                   (answer.includes("save") || answer.includes("create")) &&
                   (answer.includes("project") || answer.includes("folder"));

      if (good) {
        result.textContent = "Nice. You described the full process clearly. You understand how to save your HTML file.";
      } else {
        result.textContent = "You’re missing some key details. Mention index.html, saving it, and the project folder. Try again.";
      }
    }
  }

  button.addEventListener("click", checkAnswer);
  renderStep();
}
