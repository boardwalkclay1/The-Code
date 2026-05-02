export const TerminalCore = {
    history: [],
    historyIndex: -1,
    outputElement: null,
    inputElement: null,

    init(outputEl, inputEl) {
        this.outputElement = outputEl;
        this.inputElement = inputEl;

        this.inputElement.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                const command = this.inputElement.value.trim();
                if (!command) return;
                this.history.push(command);
                this.historyIndex = this.history.length;
                this.print(`> ${command}`);
                this.inputElement.value = "";
                window.CommandRouter.run(command);
            }

            if (e.key === "ArrowUp") {
                if (this.historyIndex > 0) {
                    this.historyIndex--;
                    this.inputElement.value = this.history[this.historyIndex] || "";
                }
            }

            if (e.key === "ArrowDown") {
                if (this.historyIndex < this.history.length - 1) {
                    this.historyIndex++;
                    this.inputElement.value = this.history[this.historyIndex] || "";
                } else {
                    this.historyIndex = this.history.length;
                    this.inputElement.value = "";
                }
            }
        });
    },

    print(text) {
        const line = document.createElement("div");
        line.textContent = text;
        this.outputElement.appendChild(line);
        this.outputElement.scrollTop = this.outputElement.scrollHeight;
    }
};
