// simulators/folder-structure.js
export function startFolderStructureSimulator(container) {
  container.innerHTML = "";
  const wrapper = document.createElement("div");
  wrapper.className = "sim-box";

  let step = 1;

  const title = document.createElement("h3");
  title.textContent = "Folder Structure Simulator (Advanced)";

  const instructions = document.createElement("p");
  const question = document.createElement("p");
  const select = document.createElement("select");
  const button = document.createElement("button");
  const result = document.createElement("div");
  result.className = "sim-result";

  wrapper.appendChild(title);
  wrapper.appendChild(instructions);
  wrapper.appendChild(question);
  wrapper.appendChild(select);
  wrapper.appendChild(button);
  wrapper.appendChild(result);
  container.appendChild(wrapper);

  const options = [
    "Root folder (project main folder)",
    "styles/",
    "scripts/",
    "images/",
    "random/",
    "downloads/",
    "desktop/"
  ];

  function populateOptions() {
    select.innerHTML = "";
    options.forEach(opt => {
      const o = document.createElement("option");
      o.value = opt;
      o.textContent = opt;
      select.appendChild(o);
    });
  }

  function renderStep() {
    result.textContent = "";
    populateOptions();

    if (step === 1) {
      instructions.innerHTML = `
        Step 1: <strong>Where does index.html go?</strong><br>
        Your main HTML file should live in the root of your project.
      `;
      question.textContent = "Select the correct location for index.html:";
      button.textContent = "Check Answer";
    } else if (step === 2) {
      instructions.innerHTML = `
        Step 2: <strong>Where does style.css go?</strong><br>
        CSS files usually live in a dedicated folder.
      `;
      question.textContent = "Select the best location for style.css:";
      button.textContent = "Check Answer";
    } else if (step === 3) {
      instructions.innerHTML = `
        Step 3: <strong>Where does app.js go?</strong><br>
        JS files usually live in a scripts/ or js/ folder.
      `;
      question.textContent = "Select the best location for app.js:";
      button.textContent = "Check Answer";
    } else if (step === 4) {
      instructions.innerHTML = `
        Final Simulation (No Help):<br>
        Build the correct structure in your mind:<br>
        Root folder, styles/, scripts/, images/, and where each file goes.
      `;
      question.textContent = "In your own words, describe the full folder structure.";
      select.style.display = "none";
      const input = document.createElement("input");
      input.placeholder = "Type your full structure description...";
      wrapper.insertBefore(input, button);
      button.textContent = "Submit Simulation";

      button.onclick = () => {
        const answer = input.value.toLowerCase();
        const good =
          answer.includes("index.html") &&
          answer.includes("root") &&
          (answer.includes("styles/") || answer.includes("css")) &&
          (answer.includes("scripts/") || answer.includes("js")) &&
          answer.includes("images");

        if (good) {
          result.textContent = "Excellent. You clearly understand a clean project structure.";
        } else {
          result.textContent = "You’re missing some pieces. Mention index.html in root, styles/, scripts/, and images/.";
        }
      };

      return;
    }
  }

  function checkAnswer() {
    const value = select.value;

    if (step === 1) {
      if (value === "Root folder (project main folder)") {
        result.textContent = "Correct. index.html belongs in the root of your project.";
        step++;
        setTimeout(renderStep, 900);
      } else {
        result.textContent = "Not quite. index.html should be in the root project folder.";
      }
    } else if (step === 2) {
      if (value === "styles/") {
        result.textContent = "Correct. style.css usually lives in styles/.";
        step++;
        setTimeout(renderStep, 900);
      } else {
        result.textContent = "Try again. CSS files usually live in a styles/ or css/ folder.";
      }
    } else if (step === 3) {
      if (value === "scripts/") {
        result.textContent = "Correct. app.js usually lives in scripts/.";
        step++;
        setTimeout(renderStep, 900);
      } else {
        result.textContent = "Try again. JS files usually live in a scripts/ or js/ folder.";
      }
    }
  }

  button.addEventListener("click", checkAnswer);
  renderStep();
}
