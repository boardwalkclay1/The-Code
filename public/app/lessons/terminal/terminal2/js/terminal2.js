// ------------------------------------------------------------
// LOADERS
// ------------------------------------------------------------
let commandIndex  = [];
let commandOutput = {};

async function safeFetch(path) {
  try {
    const res = await fetch(path);
    if (!res.ok) {
      console.warn("[Terminal2] Failed to load:", path, res.status);
      return "";
    }
    return await res.text();
  } catch (err) {
    console.error("[Terminal2] Fetch error:", path, err);
    return "";
  }
}

async function loadCommandIndex() {
  const path = "../txt/command.txt";
  const text = await safeFetch(path);

  if (!text) {
    commandIndex = [];
    return;
  }

  commandIndex = text
    .split("\n")
    .map(line => line.trim())
    .filter(line => line && !line.startsWith("//"))
    .map(line => {
      const [cmd, desc] = line.split("::");
      return {
        command: (cmd || "").trim().toLowerCase(),
        description: (desc || "").trim()
      };
    })
    .sort((a, b) => a.command.localeCompare(b.command));
}

async function loadCommandOutput() {
  const path = "../txt/command-output.txt";
  const text = await safeFetch(path);

  if (!text) {
    commandOutput = {};
    return;
  }

  const blocks = text
    .split("===")
    .map(b => b.trim())
    .filter(b => b);

  blocks.forEach(block => {
    const lines = block.split("\n");
    const key = lines[0].trim().toLowerCase();
    const content = lines.slice(1).join("\n");
    commandOutput[key] = content;
  });
}
