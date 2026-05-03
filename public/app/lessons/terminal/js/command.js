export const CommandEngine = {
  commands: {},

  async load() {
    const res = await fetch("../txt/commands.txt");
    const text = await res.text();

    text.split("\n").forEach(line => {
      const parts = line.split("::");
      if (parts.length === 2) {
        const cmd = parts[0].trim().toLowerCase();
        const def = parts[1].trim();
        this.commands[cmd] = def;
      }
    });
  },

  async run(cmd) {
    if (!this.commandsLoaded) {
      await this.load();
      this.commandsLoaded = true;
    }

    if (this.commands[cmd]) {
      return true;
    }

    return false;
  },

  async explain(cmd) {
    if (!this.commandsLoaded) {
      await this.load();
      this.commandsLoaded = true;
    }

    return this.commands[cmd] || null;
  }
};
