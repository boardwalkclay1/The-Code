// simulators/read-code.js
export function startReadCodeSimulator(container) {
  container.innerHTML = "";
  const box = document.createElement("div");
  box.className = "sim-box";

  let step = 1;

  const title = document.createElement("h3");
  title.textContent = "Reading Code Simulator";

  const instructions = document.createElement("p");
  const snippet = document.createElement("pre");
  const question = document.createElement("p");
  const input = document.createElement("input");
  const button = document.createElement("button");
  const result = document.createElement("div");
  result.className = "sim-result";

  box.appendChild(title);
  box.appendChild(instructions);
  box.appendChild(snippet);
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
        Step 1: <strong>Understanding Variables</strong>
      `;
      snippet.textContent = `let count = 5;`;
      question.textContent = "What does this line do?";
      button.textContent = "Check Answer";
    }

    if (step === 2) {
      instructions.innerHTML = `
        Step 2: <strong>Understanding Functions</strong>
      `;
      snippet.textContent = `function greet() { console.log("Hello"); }`;
      question.textContent = "What does this function do?";
    }

    if (step === 3) {
      instructions.innerHTML = `
        Step 3: <strong>Understanding Events</strong>
      `;
      snippet.textContent = `button.addEventListener("click", () => alert("Clicked!"));`;
      question.textContent = "What triggers this code?";
    }

    if (step === 4) {
      instructions.innerHTML = `
        Final Simulation (No Help):<br>
        Read this code and explain what it does.
      `;
      snippet.textContent = `
let total = 0;
function add(x) {
  total += x;
}
add(5);
console.log(total);
      `;
      question.textContent = "Explain the full behavior.";
      button.textContent = "Submit Simulation";
    }
  }

  function check() {
    const a = input.value.toLowerCase();

    if (step === 1) {
      if (a.includes("variable") || a.includes("stores") || a.includes("value")) {
        result.textContent = "Correct.";
        step++;
        setTimeout(render, 900);
      } else {
        result.textContent = "Incorrect. It creates a variable named count.";
      }
    }

    else if (step === 2) {
      if (a.includes("prints") || a.includes("logs") || a.includes("hello")) {
        result.textContent = "Correct.";
        step++;
        setTimeout(render, 900);
      } else {
        result.textContent = "Incorrect. It logs 'Hello' to the console.";
      }
    }

    else if (step === 3) {
      if (a.includes("click") || a.includes("button")) {
        result.textContent = "Correct.";
        step++;
        setTimeout(render, 900);
      } else {
        result.textContent = "Incorrect. It runs when the button is clicked.";
      }
    }

    else if (step === 4) {
      const good =
        a.includes("adds") &&
        a.includes("total") &&
        a.includes("5") &&
        a.includes("console");

      if (good) {
        result.textContent = "Excellent. You read the code correctly.";
      } else {
        result.textContent = "Try again. Mention adding 5 to total and logging it.";
      }
    }
  }

  button.addEventListener("click", check);
  render();
}
