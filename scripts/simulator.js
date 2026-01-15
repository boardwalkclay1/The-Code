// MASTER ENGINE
function startSimulator(area, config) {
  area.innerHTML = "";

  let step = 0;

  const box = document.createElement("div");
  box.className = "sim-box";

  const title = document.createElement("h3");
  title.textContent = config.title;

  const question = document.createElement("p");
  const answersDiv = document.createElement("div");
  const result = document.createElement("div");
  result.className = "sim-result";

  box.appendChild(title);
  box.appendChild(question);
  box.appendChild(answersDiv);
  box.appendChild(result);
  area.appendChild(box);

  function renderStep() {
    const current = config.steps[step];
    question.textContent = current.question;
    result.textContent = "";
    answersDiv.innerHTML = "";

    const shuffled = current.answers
      .map((a, i) => ({ text: a, index: i }))
      .sort(() => Math.random() - 0.5);

    shuffled.forEach(a => {
      const btn = document.createElement("button");
      btn.className = "sim-answer-btn";
      btn.textContent = a.text;

      btn.onclick = () => {
        if (a.index === current.correct) {
          result.textContent = "Correct!";
          step++;

          if (step < config.steps.length) {
            setTimeout(renderStep, 700);
          } else {
            result.textContent = "Simulation Complete.";
          }
        } else {
          result.textContent = current.wrongMessage;
        }
      };

      answersDiv.appendChild(btn);
    });
  }

  renderStep();
}

// CONFIGS FOR EACH BUTTON (3 QUESTIONS EACH)

const simulators = {
  openHTMLSim: {
    title: "HTML Save Simulator",
    steps: [
      {
        question: "What should your main HTML file be named?",
        answers: ["index.html", "home.html", "main.htm"],
        correct: 0,
        wrongMessage: "Incorrect — the correct name is index.html."
      },
      {
        question: "Where should index.html be saved?",
        answers: ["In the root folder", "inside styles/", "inside scripts/"],
        correct: 0,
        wrongMessage: "Incorrect — index.html must be in the root folder."
      },
      {
        question: "What does .html stand for?",
        answers: [
          "HyperText Markup Language",
          "Home Tool Markup Language",
          "Hyperlink Text Machine Logic"
        ],
        correct: 0,
        wrongMessage: "Incorrect — HTML stands for HyperText Markup Language."
      }
    ]
  },

  openCSSSim: {
    title: "CSS Save Simulator",
    steps: [
      {
        question: "Where should style.css be saved?",
        answers: ["styles/", "css/", "root folder"],
        correct: 0,
        wrongMessage: "Incorrect — save it inside a folder named styles/."
      },
      {
        question: "What does CSS control?",
        answers: ["Structure", "Behavior", "Appearance"],
        correct: 2,
        wrongMessage: "Incorrect — CSS controls appearance."
      },
      {
        question: "Which filename is correct?",
        answers: ["style.css", "style.txt", "style.doc"],
        correct: 0,
        wrongMessage: "Incorrect — CSS files end with .css."
      }
    ]
  },

  openJSSim: {
    title: "JS Save Simulator",
    steps: [
      {
        question: "Where should app.js be saved?",
        answers: ["scripts/", "styles/", "root folder"],
        correct: 0,
        wrongMessage: "Incorrect — app.js belongs in scripts/."
      },
      {
        question: "What does JavaScript control?",
        answers: ["Structure", "Behavior", "Styling"],
        correct: 1,
        wrongMessage: "Incorrect — JavaScript controls behavior."
      },
      {
        question: "Which extension is correct for JavaScript?",
        answers: ["file.js", "file.javascript", "file.jss"],
        correct: 0,
        wrongMessage: "Incorrect — JavaScript files end with .js."
      }
    ]
  },

  openFolderSim: {
    title: "Folder Structure Simulator",
    steps: [
      {
        question: "Where should CSS files go?",
        answers: ["styles/", "scripts/", "root folder"],
        correct: 0,
        wrongMessage: "Incorrect — CSS files go in styles/."
      },
      {
        question: "Where should JS files go?",
        answers: ["scripts/", "styles/", "assets/"],
        correct: 0,
        wrongMessage: "Incorrect — JS files go in scripts/."
      },
      {
        question: "Where should images go?",
        answers: ["images/", "styles/", "scripts/"],
        correct: 0,
        wrongMessage: "Incorrect — images usually go in images/."
      }
    ]
  },

  openLinkSim: {
    title: "Linking Files Simulator",
    steps: [
      {
        question: "Where do you link CSS?",
        answers: ["Inside <head>", "Inside <body>", "At the very bottom"],
        correct: 0,
        wrongMessage: "Incorrect — CSS belongs inside <head>."
      },
      {
        question: "Which tag links CSS?",
        answers: [
          "<link rel='stylesheet' href='styles/style.css'>",
          "<style src='styles/style.css'>",
          "<css link='styles/style.css'>"
        ],
        correct: 0,
        wrongMessage: "Incorrect — use the <link> tag."
      },
      {
        question: "Where do you link JavaScript (best practice)?",
        answers: [
          "Top of <head>",
          "Bottom of <body>",
          "Inside <title>"
        ],
        correct: 1,
        wrongMessage: "Incorrect — JS is usually linked before </body>."
      }
    ]
  },

  openErrorSim: {
    title: "Common Errors Debugger",
    steps: [
      {
        question: "Your CSS isn't loading. What's most likely wrong?",
        answers: ["Wrong file path", "HTML is broken", "Browser is offline"],
        correct: 0,
        wrongMessage: "Incorrect — most often it's a wrong file path."
      },
      {
        question: "Your JS says 'undefined'. What might be wrong?",
        answers: ["Spelling/typo", "Too many files", "Wrong browser"],
        correct: 0,
        wrongMessage: "Incorrect — check for typos in variable names."
      },
      {
        question: "Your HTML looks broken. What should you check first?",
        answers: ["Closing tags", "File size", "Monitor brightness"],
        correct: 0,
        wrongMessage: "Incorrect — check for missing or wrong closing tags."
      }
    ]
  },

  openReadSim: {
    title: "Reading Code Simulator",
    steps: [
      {
        question: "What does `let count = 5;` do?",
        answers: [
          "Creates a variable named count with value 5",
          "Creates a function",
          "Logs 5 to the console"
        ],
        correct: 0,
        wrongMessage: "Incorrect — it creates a variable named count with value 5."
      },
      {
        question: "What does `console.log(userName);` do?",
        answers: [
          "Saves userName",
          "Prints userName to the console",
          "Deletes userName"
        ],
        correct: 1,
        wrongMessage: "Incorrect — it prints userName to the console."
      },
      {
        question: "What does an event listener usually wait for?",
        answers: ["A click or other event", "A file save", "A browser restart"],
        correct: 0,
        wrongMessage: "Incorrect — it waits for a user or system event."
      }
    ]
  },

  openGitSim: {
    title: "GitHub Flow Simulator",
    steps: [
      {
        question: "Which command uploads your code to GitHub?",
        answers: ["git push", "git upload", "git send"],
        correct: 0,
        wrongMessage: "Incorrect — the correct command is git push."
      },
      {
        question: "Which file describes your project on GitHub?",
        answers: ["README.md", "INFO.txt", "ABOUT.doc"],
        correct: 0,
        wrongMessage: "Incorrect — README.md is the standard."
      },
      {
        question: "What does `git commit` do?",
        answers: [
          "Saves a snapshot of your changes",
          "Deletes your repo",
          "Uploads directly to GitHub"
        ],
        correct: 0,
        wrongMessage: "Incorrect — git commit saves a snapshot locally."
      }
    ]
  },

  openWebRTCSim: {
    title: "WebRTC Join Simulator",
    steps: [
      {
        question: "What do you need to join a room?",
        answers: ["Room name/ID", "User password", "GitHub token"],
        correct: 0,
        wrongMessage: "Incorrect — you need a room name or ID."
      },
      {
        question: "What must the browser allow for video chat?",
        answers: ["Camera and mic permissions", "Popups", "Ad blockers"],
        correct: 0,
        wrongMessage: "Incorrect — camera and mic permissions are required."
      },
      {
        question: "What usually coordinates WebRTC peers?",
        answers: ["A signaling server", "A CSS file", "A Git repo"],
        correct: 0,
        wrongMessage: "Incorrect — a signaling server coordinates peers."
      }
    ]
  }
};

// WIRE BUTTONS

const area = document.getElementById("simulator-area");

Object.keys(simulators).forEach(id => {
  const btn = document.getElementById(id);
  if (!btn) return;
  btn.addEventListener("click", () => {
    startSimulator(area, simulators[id]);
  });
});
