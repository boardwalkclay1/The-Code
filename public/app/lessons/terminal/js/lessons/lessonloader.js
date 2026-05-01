export const LessonLoader = {
    handle(args) {
        const action = args[0];

        if (action === "search") {
            const keyword = args[1];
            return window.LessonSearch.find(keyword);
        }

        window.TerminalCore.print("Lesson command not recognized.");
    }
};
