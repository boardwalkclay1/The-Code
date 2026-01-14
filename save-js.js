export function startJSSaveSimulator(container) {
  container.innerHTML = `
    <h2>Save a JavaScript File</h2>
    <p>Your task: Save <strong>app.js</strong> inside the <strong>scripts/</strong> folder.</p>

    <div class="sim-box">
      <label>Select folder:</label>
      <select id="jsFolder">
        <option value="">-- choose folder --</option>
        <option value="root">root/</option>
        <option value="styles">styles/</option>
        <option value="scripts">scripts/</option>
      </select>

      <label>Filename:</label>
      <input id="jsFilename" placeholder="app.js" />

      <label>Save as type:</label>
      <select id="jsType">
        <option value="txt">Text Document (.txt)</option>
        <option value="all">All Files (*.*)</option>
      </select>

      <button id="saveJSBtn">Save File</button>

      <div id="jsResult" class="sim-result"></div>
    </div>
  `;

  const folder = container.querySelector("#jsFolder");
  const filename = container.querySelector("#jsFilename");
  const type = container.querySelector("#jsType");
  const result = container.querySelector("#jsResult");
  const saveBtn = container.querySelector("#saveJSBtn");

  saveBtn.addEventListener("click", () => {
    const chosenFolder = folder.value;
    const name = filename.value.trim();
    const fileType = type.value;

    if (chosenFolder !== "scripts") {
      result.textContent = "❌ Incorrect. JavaScript files belong in the scripts/ folder.";
      result.style.color = "#ff4f4f";
      return;
    }

    if (!name.endsWith(".js")) {
      result.textContent = "❌ Incorrect. The file must end with .js";
      result.style.color = "#ff4f4f";
      return;
    }

    if (fileType !== "all") {
      result.textContent = "❌ Incorrect. Choose 'All Files (*.*)' so the extension is correct.";
      result.style.color = "#ff4f4f";
      return;
    }

    result.textContent = "✅ Correct! You saved app.js in the right folder.";
    result.style.color = "#00ff7f";
  });
}
