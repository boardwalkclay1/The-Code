export const TipsEngine = {
    tips: [],
    index: 0,

    load(tipsArray) {
        this.tips = tipsArray;
    },

    show() {
        if (this.tips.length === 0) {
            return window.TerminalCore.print("No tips loaded.");
        }
        window.TerminalCore.print(this.tips[this.index]);
        this.index = (this.index + 1) % this.tips.length;
    }
};
