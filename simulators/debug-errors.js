// simulators/debug-errors.js
export function startErrorDebugSimulator(container) {
  container.innerHTML = "";
  const box = document.createElement("div");
  box.className = "sim-box";

  let step = 1;

  const title = document.createElement("h3");
  title.textContent = "Common Errors Debug Simulator";

  const instructions = document.createElement("p");
  const question = document.createElement("p");
  const select = document.createElement("select");
  const button = document.createElement("button");
  const result = document.createElement("div");
  result.className = "sim-result";

  box.appendChild(title);
  box.appendChild(instructions);
  box.appendChild(question);
  box.appendChild(select);
  box.appendChild(button);
  box.appendChild(result);
  container.appendChild(box);

  function setOptions(arr) {
    select.innerHTML = "";
    arr.forEach(opt => {
      const o = document.createElement("option");
      o.value = opt;
      o.textContent = opt;
      select.appendChild(o);
    });
  }

  function render() {
    result.textContent = "";

    if (step === 1) {
      instructions.innerHTML = `
        Step 1: <strong>Broken CSS</strong><br>
        Your page looks unstyled. Why?
      `;
      question.textContent = "Choose the most likely cause:";
      setOptions([
        "CSS not linked correctly",
        "HTML is broken",
        "JavaScript is wrong"
      ]);
      button.textContent = "Check Answer";
    }

    if (step === 2) {
      instructions.innerHTML = `
        Step 2: <strong>JS Error: Cannot read property 'value' of null</strong>
      `;
      question.textContent = "What caused this?";
      setOptions([
        "Script loaded before HTML",
        "CSS is missing",
        "File name is wrong"
      ]);
    }

    if (step === 3) {
      instructions.innerHTML = `
        Step 3: <strong>HTML not loading</strong>
      `;
      question.textContent = "What is the most common cause?";
      setOptions([
        "index.html is not named correctly",
        "CSS is broken",
        "JS is broken"
      ]);
    }

    if (step === 4) {
      instructions.innerHTML = `
        Final Simulation (No Help):<br>
        Describe how you would debug a broken webpage from scratch.
      `;
      question.textContent = "Type your full debugging process.";
      select.style.display = "none";

      const input = document.createElement("input");
      input.placeholder = "Explain your debugging steps...";
      box.insertBefore(input, button);

      button.textContent = "Submit Simulation";
      button.onclick = () => {
        const a = input.value.toLowerCase();
        const good =
          a.includes("console") &&
          a.includes("check") &&
          (a.includes("link") || a.includes("path")) &&
          a.includes("errors");

        if (good) {
          result.textContent = "Excellent. You understand debugging fundamentals.";
        } else {
          result.textContent = "Try again. Mention console, checking links, and reading errors.";
        }
      };

      return;
    }
  }

  function check() {
    const value = select.value;

    if (step === 1) {
      if (value === "CSS not linked correctly") {
        result.textContent = "Correct.";
        step++;
        setTimeout(render, 900);
      } else {
        result.textContent = "Incorrect. The most common cause is a broken CSS link.";
      }
    }

    else if (step === 2) {
      if (value === "Script loaded before HTML") {
        result.textContent = "Correct.";
        step++;
        setTimeout(render, 900);
      } else {
        result.textContent = "Incorrect. JS often breaks when loaded too early.";
      }
    }

    else if (step === 3) {
      if (value === "index.html is not named correctly") {
        result.textContent = "Correct.";
        step++;
        setTimeout(render, 900);
      } else {
        result.textContent = "Incorrect. Hosting requires index.html.";
      }
    }
  }

  button.addEventListener("click", check);
  render();
}
