// public/courses/terminal-3/engine.js

const Terminal3 = (() => {
    // =========================
    // 1. State
    // =========================
    const state = {
        currentCourse: null,
        cwd: '/',
        fs: {},                 // virtual filesystem
        history: [],
        isInScreen: false,      // true when a help screen or flow is active
        activeScreen: null,     // 'help1', 'help2', etc.
        commands: {},           // core commands
        courseCommands: {},     // per-course commands
        helpScreens: {},        // help1..help10...
    };

    // =========================
    // 2. UI hooks (wire to your DOM)
    // =========================
    const ui = {
        print(line = '') {
            // Replace with your terminal output logic
            console.log(line);
        },
        clear() {
            console.clear();
        },
        setPromptActive(active) {
            // Enable/disable input field if needed
        },
        showFilePanel() {
            // Show the full-screen file area for Terminal 3
        },
        updateFilePanel(fsState) {
            // Render filesystem in clickable UI
        },
        updatePreview(fsState, cwd) {
            // Render preview iframe based on current project
        }
    };

    // =========================
    // 3. Command registry
    // =========================
    function registerCommand(name, handler, meta = {}) {
        state.commands[name] = { handler, meta };
    }

    function registerCourseCommands(courseName, commands) {
        if (!state.courseCommands[courseName]) {
            state.courseCommands[courseName] = {};
        }
        Object.assign(state.courseCommands[courseName], commands);
    }

    function getCommand(name) {
        // Course-specific first
        if (state.currentCourse &&
            state.courseCommands[state.currentCourse] &&
            state.courseCommands[state.currentCourse][name]) {
            return state.courseCommands[state.currentCourse][name];
        }
        // Core
        return state.commands[name] || null;
    }

    // =========================
    // 4. Help screens (help1..help10+)
    // =========================
    function registerHelpScreen(id, contentFn) {
        state.helpScreens[id] = contentFn;
    }

    function showHelpScreen(id) {
        const screen = state.helpScreens[id];
        if (!screen) {
            ui.print(`No help screen found for ${id}.`);
            return;
        }
        state.isInScreen = true;
        state.activeScreen = id;
        ui.clear();
        ui.print(`=== ${id.toUpperCase()} ===`);
        screen(ui.print);
        ui.print('');
        ui.print('Press Ctrl+C to exit this screen and return to the prompt.');
    }

    // =========================
    // 5. Filesystem helpers
    // =========================
    function normalizePath(path) {
        if (!path || path === '.') return state.cwd;
        if (path.startsWith('/')) return path;
        if (state.cwd === '/') return `/${path}`;
        return `${state.cwd}/${path}`;
    }

    function ensureDir(path) {
        if (!state.fs[path]) state.fs[path] = { type: 'dir', children: {} };
    }

    function ensureFile(path) {
        if (!state.fs[path]) state.fs[path] = { type: 'file', content: '' };
    }

    function listDir(path) {
        ensureDir(path);
        return Object.keys(state.fs[path].children || {});
    }

    function saveFS() {
        // You can switch to IndexedDB later; start with localStorage
        localStorage.setItem('terminal3_fs', JSON.stringify(state.fs));
    }

    function loadFS() {
        const raw = localStorage.getItem('terminal3_fs');
        if (raw) {
            try {
                state.fs = JSON.parse(raw);
            } catch (e) {
                state.fs = {};
            }
        }
        ui.updateFilePanel(state.fs);
    }

    // =========================
    // 6. Core Bash/system commands
    // =========================
    registerCommand('pwd', (args) => {
        ui.print(state.cwd);
    }, { group: 'bash', description: 'Show current directory' });

    registerCommand('ls', (args) => {
        const target = normalizePath(args[0] || state.cwd);
        ui.print(listDir(target).join('  '));
    }, { group: 'bash', description: 'List files and folders' });

    registerCommand('cd', (args) => {
        const target = args[0];
        if (!target) return ui.print('Usage: cd <path>. See help2 navigation.');
        const path = normalizePath(target);
        ensureDir(path);
        state.cwd = path;
        ui.print(`Moved to ${state.cwd}`);
        ui.updateFilePanel(state.fs);
    }, { group: 'bash', description: 'Change directory' });

    registerCommand('mkdir', (args) => {
        const name = args[0];
        if (!name) return ui.print('Usage: mkdir <folder>. See help2 filesystem.');
        const path = normalizePath(name);
        ensureDir(path);
        const parent = state.fs[state.cwd];
        if (parent && parent.children) {
            parent.children[name] = { type: 'dir', path };
        }
        ui.print(`Created folder ${name}`);
        ui.updateFilePanel(state.fs);
        saveFS();
    }, { group: 'bash', description: 'Create a folder' });

    registerCommand('touch', (args) => {
        const name = args[0];
        if (!name) return ui.print('Usage: touch <file>. See help2 filesystem.');
        const path = normalizePath(name);
        ensureFile(path);
        const parent = state.fs[state.cwd];
        if (parent && parent.children) {
            parent.children[name] = { type: 'file', path };
        }
        ui.print(`Created file ${name}`);
        ui.updateFilePanel(state.fs);
        saveFS();
    }, { group: 'bash', description: 'Create an empty file' });

    registerCommand('clear', (args) => {
        ui.clear();
    }, { group: 'bash', description: 'Clear the terminal screen' });

    // =========================
    // 7. Git commands (simulated core)
    // =========================
    const gitState = {
        initialized: false,
        branch: 'main',
        staged: [],
        commits: []
    };

    registerCommand('git', (args) => {
        const sub = args[0];
        const rest = args.slice(1);

        if (!sub) {
            ui.print('Usage: git <command>. See help2 git for full list.');
            return;
        }

        switch (sub) {
            case 'init':
                gitState.initialized = true;
                gitState.branch = 'main';
                gitState.staged = [];
                gitState.commits = [];
                ui.print('Initialized empty Git repository.');
                break;

            case 'status':
                if (!gitState.initialized) return ui.print('Git not initialized. Run: git init (see help2 git).');
                ui.print(`On branch ${gitState.branch}`);
                if (gitState.staged.length) {
                    ui.print('Changes to be committed:');
                    gitState.staged.forEach(f => ui.print(`  ${f}`));
                } else {
                    ui.print('No changes staged.');
                }
                break;

            case 'add':
                if (!gitState.initialized) return ui.print('Git not initialized. Run: git init.');
                if (!rest.length) return ui.print('Usage: git add <file>. See help2 git.');
                rest.forEach(f => gitState.staged.push(f));
                ui.print('Files staged.');
                break;

            case 'commit':
                if (!gitState.initialized) return ui.print('Git not initialized. Run: git init.');
                if (!gitState.staged.length) return ui.print('No changes staged.');
                const msgIndex = rest.indexOf('-m');
                if (msgIndex === -1 || !rest[msgIndex + 1]) {
                    return ui.print('Usage: git commit -m "message". See help2 git.');
                }
                const message = rest.slice(msgIndex + 1).join(' ').replace(/^"|"$/g, '');
                gitState.commits.push({
                    message,
                    files: [...gitState.staged],
                    branch: gitState.branch,
                    time: new Date().toISOString()
                });
                gitState.staged = [];
                ui.print(`[${gitState.branch}] ${message}`);
                break;

            case 'log':
                if (!gitState.initialized) return ui.print('Git not initialized. Run: git init.');
                if (!gitState.commits.length) return ui.print('No commits yet.');
                gitState.commits.forEach((c, i) => {
                    ui.print(`commit ${i + 1} (${c.branch})`);
                    ui.print(`Date: ${c.time}`);
                    ui.print(`    ${c.message}`);
                    ui.print('');
                });
                break;

            default:
                ui.print(`Unknown git command: ${sub}. See help2 git.`);
        }
    }, { group: 'git', description: 'Git version control (init, add, commit, status, log, ...)' });

    // =========================
    // 8. Help commands (help1..help10)
    // =========================
    registerCommand('help', (args) => {
        ui.print('Terminal 3 – Courses: Core help');
        ui.print('- help1  : Overview & mindset');
        ui.print('- help2  : Navigation & filesystem');
        ui.print('- help3  : Git basics');
        ui.print('- help4  : Branching & workflows');
        ui.print('- help5  : Bash essentials');
        ui.print('- help6  : Custom Go Time commands');
        ui.print('- help7  : Saving, loading, and projects');
        ui.print('- help8  : Preview & file panel');
        ui.print('- help9  : Course navigation from Terminal 3');
        ui.print('- help10 : Troubleshooting & common mistakes');
        ui.print('');
        ui.print('Type any of these (e.g., "help3") to open a full screen. Press Ctrl+C to exit.');
    }, { group: 'help', description: 'List help screens' });

    // Map help1..help10 to screens
    for (let i = 1; i <= 10; i++) {
        const id = `help${i}`;
        registerCommand(id, () => showHelpScreen(id), { group: 'help', description: `Open ${id} screen` });
    }

    // Example help screens (you’ll expand these)
    registerHelpScreen('help1', (print) => {
        print('Terminal 3 – Courses: Overview');
        print('- This is your master training terminal.');
        print('- All Bash, Git, and custom commands work here.');
        print('- From here, you can reach any course section.');
        print('- Use help2..help10 to dive into specific topics.');
    });

    registerHelpScreen('help2', (print) => {
        print('Navigation & Filesystem');
        print('- pwd      : show where you are');
        print('- ls       : list files and folders');
        print('- cd PATH  : move into a folder');
        print('- mkdir    : create a folder');
        print('- touch    : create a file');
        print('');
        print('These commands match real terminals so you can practice for any system.');
    });

    // ...you’ll define help3..help10 similarly, explaining Git, Bash, custom commands, etc.

    // =========================
    // 9. Custom Go Time commands (examples)
    // =========================
    registerCommand('project-save', (args) => {
        saveFS();
        ui.print('Project saved. (Terminal 3 filesystem snapshot updated.)');
    }, { group: 'project', description: 'Save current project state' });

    registerCommand('project-load', (args) => {
        loadFS();
        ui.print('Project loaded into Terminal 3.');
    }, { group: 'project', description: 'Load saved project state' });

    registerCommand('panel', (args) => {
        ui.showFilePanel();
        ui.print('File panel opened. Click to open/edit files. Use terminal commands alongside.');
    }, { group: 'ui', description: 'Open the full-screen file panel' });

    registerCommand('preview', (args) => {
        ui.updatePreview(state.fs, state.cwd);
        ui.print('Preview updated.');
    }, { group: 'ui', description: 'Update the preview screen' });

    registerCommand('course', (args) => {
        const name = args[0];
        if (!name) return ui.print('Usage: course <courseName>. See help9 for navigation.');
        state.currentCourse = name;
        ui.print(`Terminal 3 now focused on course: ${name}`);
    }, { group: 'courses', description: 'Set active course context for extra commands' });

    // =========================
    // 10. Ctrl+C handling
    // =========================
    function handleCtrlC() {
        if (state.isInScreen) {
            state.isInScreen = false;
            state.activeScreen = null;
            ui.clear();
            ui.print('Exited screen. Back to prompt.');
        } else {
            ui.print('^C');
        }
    }

    // =========================
    // 11. Execution
    // =========================
    function execute(input) {
        if (!input.trim()) return;
        state.history.push(input);

        if (state.isInScreen) {
            // While in a screen, only Ctrl+C matters (handled externally)
            ui.print('You are in a help screen. Press Ctrl+C to exit.');
            return;
        }

        const parts = input.trim().split(/\s+/);
        const cmdName = parts[0];
        const args = parts.slice(1);

        const cmd = getCommand(cmdName);
        if (!cmd) {
            ui.print(`Unknown command: ${cmdName}. Type "help" for options.`);
            return;
        }

        cmd.handler(args);
    }

    // =========================
    // 12. Public API
    // =========================
    return {
        execute,
        handleCtrlC,
        registerCourseCommands,
        setCourse(name) {
            state.currentCourse = name;
        },
        getState() {
            return state;
        }
    };
})();

window.Terminal3 = Terminal3;
