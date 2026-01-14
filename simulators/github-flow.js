// simulators/github-flow.js
export function startGitFlowSimulator(container) {
  container.innerHTML = "";
  const box = document.createElement("div");
  box.className = "sim-box";

  let step = 1;

  const title = document.createElement("h3");
  title.textContent = "GitHub Flow Simulator";

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
        Step 1: <strong>Create a Repository</strong>
      `;
      question.textContent = "What is the first step in GitHub flow?";
      setOptions([
        "Create a new repository",
        "Push code",
        "Deploy site"
      ]);
      button.textContent = "Check Answer";
    }

    if (step === 2) {
      instructions.innerHTML = `
        Step 2: <strong>Commit Changes</strong>
      `;
      question.textContent = "What does a commit represent?";
      setOptions([
        "A saved change",
        "A new folder",
        "A deployment"
      ]);
    }

    if (step === 3) {
      instructions.innerHTML = `
        Step 3: <strong>Push to GitHub</strong>
      `;
      question.textContent = "What does pushing do?";
      setOptions([
        "Uploads your code to GitHub",
        "Deletes your repo",
        "Runs your code"
      ]);
    }

    if (step === 4) {
      instructions.innerHTML = `
        Final Simulation (No Help):<br>
        Describe the full GitHub flow from start to finish.
      `;
      question.textContent = "Type your full process.";
      select.style.display = "none";

      const input = document.createElement("input");
      input.placeholder = "Explain the GitHub flow...";
      box.insertBefore(input, button);

      button.textContent = "Submit Simulation";
      button.onclick = () => {
        const a = input.value.toLowerCase();
        const good =
          a.includes("repo") &&
          a.includes("commit") &&
          a.includes("push") &&
          a.includes("deploy");

        if (good) {
          result.textContent = "Excellent. You understand GitHub flow.";
        } else {
          result.textContent = "Try again. Mention repo → commit → push → deploy.";
        }
      };

      return;
    }
  }

  function check() {
    const value = select.value;

    if (step === 1) {
      if (value === "Create a new repository") {
        result.textContent = "Correct.";
        step++;
        setTimeout(render, 900);
      } else {
        result.textContent = "Incorrect. GitHub flow starts with creating a repo.";
      }
    }

    else if (step === 2) {
      if (value === "A saved change") {
        result.textContent = "Correct.";
        step++;
        setTimeout(render, 900);
      } else {
        result.textContent = "Incorrect. A commit is a saved change.";
      }
    }

    else if (step === 3) {
      if (value === "Uploads your code to GitHub") {
        result.textContent = "Correct.";
        step++;
        setTimeout(render, 900);
      } else {
        result.textContent = "Incorrect. Pushing uploads your code.";
      }
    }
  }

  button.addEventListener("click", check);
  render();
}
