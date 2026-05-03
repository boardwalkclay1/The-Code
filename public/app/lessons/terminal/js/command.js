// public/app/lessons/terminal/js/command.js

export const CommandEngine = {
  commands: {},
  loaded: false,

  async load() {
    if (this.loaded) return;
    try {
      const res = await fetch("../txt/commands.txt");
      const text = await res.text();
      text.split("\n").forEach(line => {
        const parts = line.split("::");
        if (parts.length === 2) {
          const cmd = parts[0].trim().toLowerCase();
          const def = parts[1].trim();
          if (cmd) this.commands[cmd] = def;
        }
      });
      this.loaded = true;
    } catch (e) {
      this.loaded = true;
    }
  },

  async run(raw) {
    await this.load();
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return false;

    // HELP
    if (cmd === "help" || cmd === "-help") {
      return this.showHelp();
    }

    // LISTS
    if (cmd === "courses") return this.showCourses();
    if (cmd === "list courses") return this.listCourses();
    if (cmd === "games") return this.showGames();
    if (cmd === "list games") return this.listGames();
    if (cmd === "flash") return this.showFlash();
    if (cmd === "list flash") return this.listFlash();
    if (cmd === "list bundles") return this.listBundles();

    // SYSTEM / CONTROL / PRICING
    if (cmd === "system") return this.showSystem();
    if (cmd === "control c") return this.showControlC();
    if (cmd === "pricing") return this.showPricing();

    // FULL SYSTEM ACCESS
    if (cmd === "code unlock") return this.showCodeUnlock();

    // EXPLAIN COMMANDS
    if (cmd.endsWith(" explain")) {
      const base = cmd.replace(" explain", "").trim();
      return this.showExplain(base);
    }

    // COURSE PAYWALL COMMANDS
    if ([
      "web","apps","mcu","hacking",
      "automation","github","bash",
      "widgets","tools"
    ].includes(cmd)) {
      return this.showCoursePaywall(cmd);
    }

    // FLASH PAYWALL
    if (cmd === "flash-run") return this.showFlashPaywall();

    // GAMES EXPLAIN (system-level)
    if (cmd === "games explain") return this.showGamesExplain();

    return false;
  },

  // HELP / LISTS / SYSTEM

  async showHelp() {
    await typeLine("COMMANDS // PREVIEW TERMINAL");
    await typeLine("--------------------------------");
    await typeLine("type a command to explore it:");
    await typeLine("");
    await typeLine("courses, list courses");
    await typeLine("games, list games, games explain");
    await typeLine("flash, list flash, flash-run");
    await typeLine("pricing, list bundles, system");
    await typeLine("code unlock");
    await typeLine("");
    await typeLine("courses (with explain):");
    await typeLine("  web, web explain");
    await typeLine("  apps, apps explain");
    await typeLine("  mcu, mcu explain");
    await typeLine("  hacking, hacking explain");
    await typeLine("  automation, automation explain");
    await typeLine("  github, github explain");
    await typeLine("  bash, bash explain");
    await typeLine("  widgets, widgets explain");
    await typeLine("  tools, tools explain");
    await typeLine("");
    await typeLine("utility:");
    await typeLine("  control c  // exit current screen");
  },

  async showCourses() {
    await typeLine("COURSES // OVERVIEW");
    await typeLine("--------------------");
    await typeLine("core:");
    await typeLine("  web");
    await typeLine("  apps");
    await typeLine("  mcu");
    await typeLine("  hacking");
    await typeLine("  automation");
    await typeLine("");
    await typeLine("bonus:");
    await typeLine("  github");
    await typeLine("  bash");
    await typeLine("");
    await typeLine("systems:");
    await typeLine("  widgets");
    await typeLine("  tools");
    await typeLine("");
    await typeLine("type '<course> explain' for details.");
    await typeLine("type '<course>' to see price and paywall.");
  },

  async listCourses() {
    await typeLine("COURSES // ALPHABETICAL");
    await typeLine("------------------------");
    await typeLine("apps");
    await typeLine("automation");
    await typeLine("bash");
    await typeLine("github");
    await typeLine("hacking");
    await typeLine("mcu");
    await typeLine("tools");
    await typeLine("web");
    await typeLine("widgets");
  },

  async showGames() {
    await typeLine("GAMES // OVERVIEW");
    await typeLine("------------------");
    await typeLine("these are interactive systems inside full access:");
    await typeLine("  code flash sequences");
    await typeLine("  bugfix-style challenges");
    await typeLine("  system navigation drills");
    await typeLine("");
    await typeLine("type 'games explain' for a full breakdown.");
  },

  async listGames() {
    await typeLine("GAMES // LIST");
    await typeLine("--------------");
    await typeLine("code-flash");
    await typeLine("bugfix");
    await typeLine("system-nav");
  },

  async showFlash() {
    await typeLine("FLASH LEARNING // OVERVIEW");
    await typeLine("---------------------------");
    await typeLine("flash learning is a rapid-fire sequence of terms, diagrams, and code fragments.");
    await typeLine("designed to burn concepts into your memory in under 10 seconds per run.");
    await typeLine("");
    await typeLine("type 'flash explain' for details.");
    await typeLine("type 'flash-run' to see price and access info.");
  },

  async listFlash() {
    await typeLine("FLASH LEARNING // SEQUENCES");
    await typeLine("----------------------------");
    await typeLine("html-basics");
    await typeLine("css-layout");
    await typeLine("js-core");
    await typeLine("systems-map");
  },

  async listBundles() {
    await typeLine("BUNDLES // DEALS");
    await typeLine("-----------------");
    await typeLine("buy 1 core course → $300 + choose github OR bash free");
    await typeLine("buy 2 core courses → $600 + get BOTH bonuses free");
    await typeLine("buy 3+ core courses → $300 each, minus $50 for every extra");
    await typeLine("automation is automatically included with web and apps.");
  },

  async showSystem() {
    await typeLine("SYSTEM // OVERVIEW");
    await typeLine("-------------------");
    await typeLine("this preview terminal shows you the map of what you can unlock.");
    await typeLine("full system access gives you:");
    await typeLine("  • course terminals");
    await typeLine("  • flash learning sequences");
    await typeLine("  • interactive games and drills");
    await typeLine("  • widgets and tools dashboards");
    await typeLine("");
    await typeLine("type 'code unlock' to see how full access works.");
  },

  async showControlC() {
    await typeLine("CONTROL C // EXIT");
    await typeLine("------------------");
    await typeLine("use this when a screen is done and you want to return to the prompt.");
    await typeLine("in the full system, control + c also exits certain running modules.");
  },

  async showPricing() {
    await typeLine("PRICING // SUMMARY");
    await typeLine("-------------------");
    await typeLine("core courses: $300 each");
    await typeLine("bonus courses: $200 each (github, bash)");
    await typeLine("");
    await typeLine("bundles:");
    await this.listBundles();
  },

  async showCodeUnlock() {
    await typeLine("FULL SYSTEM ACCESS // CODE UNLOCK");
    await typeLine("----------------------------------");
    await typeLine("this command is your bridge from preview into the full system.");
    await typeLine("");
    await typeLine("inside the real environment, 'code unlock' will:");
    await typeLine("  • verify your access");
    await typeLine("  • drop the preview shell");
    await typeLine("  • open your full system terminal");
    await typeLine("");
    await typeLine("from there, you can run:");
    await typeLine("  • course terminals");
    await typeLine("  • flash learning engines");
    await typeLine("  • games and drills");
    await typeLine("  • widgets and tools dashboards");
  },

  // PAYWALLS

  getCoursePaywallInfo(cmd) {
    const map = {
      web: {
        title: "WEB COURSE",
        price: "$300",
        link: "/paywall/web"
      },
      apps: {
        title: "APPS COURSE",
        price: "$300",
        link: "/paywall/apps"
      },
      mcu: {
        title: "MCU COURSE",
        price: "$300",
        link: "/paywall/mcu"
      },
      hacking: {
        title: "HACKING COURSE",
        price: "$300",
        link: "/paywall/hacking"
      },
      automation: {
        title: "AUTOMATION COURSE",
        price: "$300",
        link: "/paywall/automation"
      },
      github: {
        title: "GITHUB BONUS COURSE",
        price: "$200",
        link: "/paywall/github"
      },
      bash: {
        title: "BASH BONUS COURSE",
        price: "$200",
        link: "/paywall/bash"
      },
      widgets: {
        title: "WIDGETS SYSTEM COURSE",
        price: "$300",
        link: "/paywall/widgets"
      },
      tools: {
        title: "TOOLS SYSTEM COURSE",
        price: "$300",
        link: "/paywall/tools"
      }
    };
    return map[cmd] || null;
  },

  async showCoursePaywall(cmd) {
    const info = this.getCoursePaywallInfo(cmd);
    if (!info) {
      await typeLine("no paywall info available for: " + cmd);
      return;
    }
    await typeLine(`${info.title} // ACCESS`);
    await typeLine("---------------------------");
    await typeLine(`price: ${info.price}`);
    await typeLine(`link:  ${info.link}`);
    await typeLine("");
    await typeLine(`to see what you learn, type: '${cmd} explain'`);
  },

  async showFlashPaywall() {
    await typeLine("FLASH LEARNING // ACCESS");
    await typeLine("-------------------------");
    await typeLine("flash learning is included with full system access.");
    await typeLine("certain sequences are tied to specific courses.");
    await typeLine("");
    await typeLine("for example:");
    await typeLine("  web course → web flash sequences");
    await typeLine("  apps course → app architecture flashes");
    await typeLine("");
    await typeLine("to understand flash learning, type: 'flash explain'");
  },

  // EXPLAINERS

  async showExplain(cmd) {
    const text = this.getExplainText(cmd);
    if (!text) {
      await typeLine("no explanation found for: " + cmd);
      return;
    }
    await typeLine(text);
  },

  getExplainText(cmd) {
    const map = {
      web: `
WEB COURSE // EXPLAIN

web development is the layer everyone touches but few understand.
this course walks you from zero to building real interfaces people can use.

you will learn:
  • how the browser actually reads HTML, CSS, and JS
  • how to structure pages so they are stable and maintainable
  • how to connect your UI to real data and APIs
  • how to deploy a web app so it runs like a product, not a demo

this is the foundation for everything else in the system.

to enter this course, type: 'web'
      `,
      apps: `
APPS COURSE // EXPLAIN

apps are how people experience software in their hands.
this course focuses on app-like experiences built with web tech and modern stacks.

you will learn:
  • responsive layouts that feel native on phones and tablets
  • app shell patterns, routing, and state
  • offline-first thinking and caching strategies
  • how to ship something that feels installable and real

to enter this course, type: 'apps'
      `,
      mcu: `
MCU COURSE // EXPLAIN

microcontrollers are how code touches the physical world.
this course shows you how factories, cars, drones, and devices are actually controlled.

you will learn:
  • how to think in terms of signals, sensors, and actuators
  • how to write code that runs on tiny hardware with strict limits
  • how to design safe control flows for motors and sensors
  • how software and hardware teams talk to each other

to enter this course, type: 'mcu'
      `,
      hacking: `
HACKING COURSE // EXPLAIN

hacking here means understanding how systems break so you can design them to be safer.
this is about visibility, not chaos.

you will learn:
  • how to see attack surfaces in normal systems
  • how to layer defenses so one failure doesn’t collapse everything
  • how to read logs and traces to understand what really happened
  • how to think like an attacker while acting like a defender

to enter this course, type: 'hacking'
      `,
      automation: `
AUTOMATION COURSE // EXPLAIN

automation is how you scale yourself.
this course is about building workflows that run while you sleep.

you will learn:
  • how to design triggers and events
  • how to move data between tools and systems safely
  • how to chain actions into reliable workflows
  • how to turn manual tasks into repeatable pipelines

to enter this course, type: 'automation'
      `,
      github: `
GITHUB COURSE // EXPLAIN

github is how modern teams track code and collaborate.
this course makes version control feel normal instead of scary.

you will learn:
  • how repos, branches, and commits actually work
  • how to use pull requests to review and merge changes
  • how to avoid losing work and keep history clean
  • how to use github as a backbone for your projects

to enter this course, type: 'github'
      `,
      bash: `
BASH COURSE // EXPLAIN

bash is the language of the terminal.
this course gives you the commands you actually need, not a wall of syntax.

you will learn:
  • how to move through directories without getting lost
  • how to inspect files and logs quickly
  • how to write small scripts that save you hours
  • how to stay safe while using powerful commands

to enter this course, type: 'bash'
      `,
      widgets: `
WIDGETS COURSE // EXPLAIN

widgets are focused, reusable interface blocks that plug into your systems.
this course is about building small pieces that feel premium and can be reused everywhere.

you will learn:
  • how to design self-contained UI components
  • how to wire widgets into dashboards and terminals
  • how to theme and brand widgets without breaking them
  • how to think in terms of systems of parts, not single pages

to enter this course, type: 'widgets'
      `,
      tools: `
TOOLS COURSE // EXPLAIN

tools are the internal utilities that make your work faster and cleaner.
this course is about building your own internal software, not waiting for someone else’s.

you will learn:
  • how to design small tools that solve real workflow problems
  • how to connect tools to your existing data and systems
  • how to keep tools simple, stable, and easy to maintain
  • how to build a personal toolkit that grows with you

to enter this course, type: 'tools'
      `,
      flash: `
FLASH LEARNING // EXPLAIN

flash learning is a rapid-fire mode.
you get a burst of terms, diagrams, and code fragments in under 10 seconds.

you will:
  • see the same concepts from multiple angles
  • build recognition speed for key ideas
  • use it as a warmup before deeper sessions
  • treat it like mental sprints instead of long lectures

to see access info, type: 'flash-run'
      `,
      games: `
GAMES SYSTEM // EXPLAIN

games here are not toys — they are controlled environments for practice.

you will:
  • debug broken code under time pressure
  • navigate systems and file structures with intent
  • make decisions with incomplete information
  • build instincts you can’t get from static lessons

to see the list, type: 'list games'
      `
    };
    return map[cmd] || null;
  }
};
