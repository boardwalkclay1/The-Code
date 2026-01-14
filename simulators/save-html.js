export function startHTMLSaveSimulator(container) {
  container.innerHTML = `
    <h2>Save an HTML File</h2>
    <p>Type the correct filename and choose the correct file type.</p>

    <div class="sim-box">
      <label>Filename:</label>
      <input id="htmlFilename" placeholder="index.html" />

      <label>Save as type:</label>
      <select id="htmlType">
        <option value="txt">Text Document (.txt)</option>
        <option value="all">All Files (*.*)</option>
      </select>

      <button id="saveHTMLBtn">Save File</button>

      <div id="htmlResult" class="sim-result"></div>
    </div>
  `;

  const filename = container.querySelector("#htmlFilename");
  const type = container.querySelector("#htmlType");
  const result = container.querySelector("#htmlResult");
  const saveBtn = container.querySelector("#saveHTMLBtn");

  saveBtn.addEventListener("click", () => {
    const name = filename.value.trim();
    const fileType = type.value;

    if (!name.endsWith(".html")) {
      result.textContent = "❌ Incorrect. The file must end with .html";
      result.style.color = "#ff4f4f";
      return;
    }

    if (fileType !== "all") {
      result.textContent = "❌ Incorrect. You must choose 'All Files (*.*)'";
      result.style.color = "#ff4f4f";
      return;
    }

    result.textContent = "✅ Correct! You saved index.html properly.";
    result.style.color = "#00ff7f";
  });
}
