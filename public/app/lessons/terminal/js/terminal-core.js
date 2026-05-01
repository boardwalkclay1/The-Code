export const TerminalCore = {
    history: [],
    outputElement: null,
    inputElement: null,

    init(outputEl, inputEl) {
        this.outputElement = outputEl;
        this.inputElement = inputEl;

        this.inputElement.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                const command = this.inputElement.value.trim();
                this.history.push(command);
                this.print(`> ${command}`);
                this.inputElement.value = "";
                window.CommandRouter.run(command);
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
