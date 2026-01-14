// simulators/webrtc-join.js
export function startWebRTCJoinSimulator(container) {
  container.innerHTML = "";
  const box = document.createElement("div");
  box.className = "sim-box";

  let step = 1;

  const title = document.createElement("h3");
  title.textContent = "WebRTC Join Simulator (Advanced)";

  const instructions = document.createElement("p");
  const question = document.createElement("p");
  const select = document.createElement("select");
  const input = document.createElement("input");
  const button = document.createElement("button");
  const result = document.createElement("div");
  result.className = "sim-result";

  input.style.display = "none";

  box.appendChild(title);
  box.appendChild(instructions);
  box.appendChild(question);
  box.appendChild(select);
  box.appendChild(input);
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
    input.value = "";
    input.style.display = "none";
    select.style.display = "block";

    if (step === 1) {
      instructions.innerHTML = `
        Step 1: <strong>Permissions</strong><br>
        WebRTC requires access to your camera and microphone.
      `;
      question.textContent = "What must the user allow?";
      setOptions([
        "Camera & Microphone",
        "Location Only",
        "Notifications Only"
      ]);
      button.textContent = "Check Answer";
    }

    if (step === 2) {
      instructions.innerHTML = `
        Step 2: <strong>Secure Connection</strong><br>
        WebRTC only works on secure origins.
      `;
      question.textContent = "Which URL type allows WebRTC to work?";
      setOptions([
        "https://",
        "http://",
        "file://"
      ]);
    }

    if (step === 3) {
      instructions.innerHTML = `
        Step 3: <strong>Room Name</strong><br>
        Users must join the same room name to connect.
      `;
      question.textContent = "Which room name is valid?";
      setOptions([
        "coding-room-1",
        "room with spaces",
        "###invalid###"
      ]);
    }

    if (step === 4) {
      instructions.innerHTML = `
        Step 4: <strong>Signaling</strong><br>
        Before peers connect, they must exchange connection info.
      `;
      question.textContent = "What is this process called?";
      setOptions([
        "Signaling",
        "Rendering",
        "Compiling"
      ]);
    }

    if (step === 5) {
      instructions.innerHTML = `
        Step 5: <strong>Multi‑Peer Awareness</strong><br>
        WebRTC can connect multiple users in the same room.
      `;
      question.textContent = "How does multi‑peer work?";
      setOptions([
        "Each peer connects to every other peer",
        "Only one peer can join",
        "Peers must take turns"
      ]);
    }

    if (step === 6) {
      instructions.innerHTML = `
        Final Simulation (No Help):<br>
        Describe the full process of joining a WebRTC room from start to finish.
      `;
      question.textContent = "Type your full explanation.";
      select.style.display = "none";
      input.style.display = "block";
      input.placeholder = "Explain the full WebRTC join process...";
      button.textContent = "Submit Simulation";
    }
  }

  function check() {
    const value = select.value;

    if (step === 1) {
      if (value === "Camera & Microphone") {
        result.textContent = "Correct. WebRTC requires both.";
        step++;
        setTimeout(render, 900);
      } else {
        result.textContent = "Incorrect. WebRTC needs camera and mic permissions.";
      }
    }

    else if (step === 2) {
      if (value === "https://") {
        result.textContent = "Correct. WebRTC requires HTTPS.";
        step++;
        setTimeout(render, 900);
      } else {
        result.textContent = "Incorrect. WebRTC only works on https:// or localhost.";
      }
    }

    else if (step === 3) {
      if (value === "coding-room-1") {
        result.textContent = "Correct. Room names must be simple and contain no spaces.";
        step++;
        setTimeout(render, 900);
      } else {
        result.textContent = "Incorrect. Room names must be clean and URL‑safe.";
      }
    }

    else if (step === 4) {
      if (value === "Signaling") {
        result.textContent = "Correct. Signaling exchanges connection info.";
        step++;
        setTimeout(render, 900);
      } else {
        result.textContent = "Incorrect. The correct term is signaling.";
      }
    }

    else if (step === 5) {
      if (value === "Each peer connects to every other peer") {
        result.textContent = "Correct. Multi‑peer WebRTC uses mesh networking.";
        step++;
        setTimeout(render, 900);
      } else {
        result.textContent = "Incorrect. Multi‑peer means everyone connects to everyone.";
      }
    }

    else if (step === 6) {
      const a = input.value.toLowerCase();

      const good =
        a.includes("camera") &&
        a.includes("microphone") &&
        a.includes("https") &&
        a.includes("room") &&
        a.includes("signaling") &&
        (a.includes("peer") || a.includes("multi"));

      if (good) {
        result.textContent = "Excellent. You understand the full WebRTC join flow.";
      } else {
        result.textContent = "Try again. Mention permissions, HTTPS, room name, signaling, and multi‑peer.";
      }
    }
  }

  button.addEventListener("click", check);
  render();
}
