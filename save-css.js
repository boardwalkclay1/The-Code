export function startCSSSaveSimulator(container) {
  container.innerHTML = `
    <h2>Save a CSS File</h2>
    <p>Your task: Save <strong>style.css</strong> inside the <strong>styles/</strong> folder.</p>

    <div class="sim-box">
      <label>Select folder:</label>
      <select id="cssFolder">
        <option value="">-- choose folder --</option>
        <option value="root">root/</option>
        <option value="styles">styles/</option>
        <option value="scripts">scripts/</option>
      </select>

      <label>Filename:</label>
      <input id="cssFilename" placeholder="style.css" />

      <label>Save as type:</label>
      <select id="cssType">
        <option value="txt">Text Document (.txt)</option>
        <option value="all">All Files (*.*)</option>
      </select>

      <button id="saveCSSBtn">Save File</button>

      <div id="cssResult" class="sim-result"></div>
    </div>
  `;

  const folder = container.querySelector("#cssFolder");
  const filename = container.querySelector("#cssFilename");
  const type = container.querySelector("#cssType");
  const result = container.querySelector("#cssResult");
  const saveBtn = container.querySelector("#saveCSSBtn");

  saveBtn.addEventListener("click", () => {
    const chosenFolder = folder.value;
    const name = filename.value.trim();
    const fileType = type.value;

    if (chosenFolder !== "styles") {
      result.textContent = "❌ Incorrect. You must save this file inside the styles/ folder.";
      result.style.color = "#ff4f4f";
      return;
    }

    if (!name.endsWith(".css")) {
      result.textContent = "❌ Incorrect. The file must end with .css";
      result.style.color = "#ff4f4f";
      return;
    }

    if (fileType !== "all") {
      result.textContent = "❌ Incorrect. Choose 'All Files (*.*)' so the extension is respected.";
      result.style.color = "#ff4f4f";
      return;
    }

    result.textContent = "✅ Correct! You saved style.css in the right folder.";
    result.style.color = "#00ff7f";
  });
}
