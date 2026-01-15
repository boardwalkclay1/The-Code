export const LESSONS = {
  1: {
    title: "Lesson 1 — What Makes a File HTML",
    intro: "HTML files are the foundation of every website.",
    body: "A file becomes HTML when it ends with .html and contains valid HTML tags.",
    extra: "Browsers read HTML first before loading CSS and JavaScript.",
    quiz: [
      {
        question: "What makes a file an HTML file?",
        options: ["It ends with .html", "It contains CSS", "It contains JavaScript"],
        correctIndex: 0,
        correctMessage: "Correct! The .html extension defines the file type.",
        wrongMessage: "Not quite."
      }
    ]
  },

  2: {
    title: "Lesson 2 — Saving index.html",
    intro: "index.html is the homepage of your project.",
    body: "Web servers automatically load index.html first.",
    extra: "Always save it as lowercase with no spaces.",
    quiz: [
      {
        question: "Why is index.html important?",
        options: ["It loads first automatically", "It styles your page", "It runs JavaScript"],
        correctIndex: 0,
        correctMessage: "Correct! Browsers look for index.html first.",
        wrongMessage: "Try again."
      }
    ]
  },

  3: {
    title: "Lesson 3 — HTML Structure",
    intro: "HTML uses tags to structure your content.",
    body: "The basic structure includes <!DOCTYPE html>, <html>, <head>, and <body>.",
    extra: "Everything visible goes inside <body>.",
    quiz: [
      {
        question: "Which tag contains visible content?",
        options: ["<head>", "<body>", "<meta>"],
        correctIndex: 1,
        correctMessage: "Correct! <body> holds everything the user sees.",
        wrongMessage: "Nope."
      }
    ]
  },

  4: {
    title: "Lesson 4 — The Head & Body",
    intro: "The head stores settings, the body stores content.",
    body: "<head> contains metadata, links, and scripts. <body> contains visible elements.",
    extra: "Think of head as the brain and body as the display.",
    quiz: [
      {
        question: "Where do you put visible elements?",
        options: ["<head>", "<body>", "<script>"],
        correctIndex: 1,
        correctMessage: "Correct!",
        wrongMessage: "Try again."
      }
    ]
  },

  5: {
    title: "Lesson 5 — Tags & Elements",
    intro: "Tags are the building blocks of HTML.",
    body: "Elements usually have an opening and closing tag.",
    extra: "Examples: <p>, <h1>, <div>, <img>.",
    quiz: [
      {
        question: "Which is a valid HTML element?",
        options: ["<hello>", "<p>", "<tag>"],
        correctIndex: 1,
        correctMessage: "Correct!",
        wrongMessage: "Incorrect."
      }
    ]
  },

  6: {
    title: "Lesson 6 — What Makes a File CSS",
    intro: "CSS controls the appearance of your website.",
    body: "A CSS file ends with .css and contains styling rules.",
    extra: "CSS stands for Cascading Style Sheets.",
    quiz: [
      {
        question: "What is CSS used for?",
        options: ["Structure", "Styling", "Logic"],
        correctIndex: 1,
        correctMessage: "Correct! CSS styles the page.",
        wrongMessage: "Nope."
      }
    ]
  },

  7: {
    title: "Lesson 7 — Saving style.css",
    intro: "style.css is your main stylesheet.",
    body: "Keep it inside a folder named styles/ for clean structure.",
    extra: "Never save CSS inside HTML unless necessary.",
    quiz: [
      {
        question: "Where should style.css go?",
        options: ["Root folder", "styles/ folder", "scripts/ folder"],
        correctIndex: 1,
        correctMessage: "Correct!",
        wrongMessage: "Try again."
      }
    ]
  },

  8: {
    title: "Lesson 8 — Linking CSS",
    intro: "CSS must be linked to HTML to work.",
    body: "Use <link rel='stylesheet' href='styles/style.css'> inside <head>.",
    extra: "If the path is wrong, CSS won’t load.",
    quiz: [
      {
        question: "Where do you link CSS?",
        options: ["Inside <body>", "Inside <head>", "At the bottom"],
        correctIndex: 1,
        correctMessage: "Correct!",
        wrongMessage: "Incorrect."
      }
    ]
  },

  9: {
    title: "Lesson 9 — Selectors & Classes",
    intro: "Selectors target elements to style.",
    body: "Classes let you style multiple elements at once.",
    extra: "Use .classname in CSS.",
    quiz: [
      {
        question: "How do you select a class in CSS?",
        options: ["#class", ".class", "class"],
        correctIndex: 1,
        correctMessage: "Correct!",
        wrongMessage: "Nope."
      }
    ]
  },

  10: {
    title: "Lesson 10 — Styling Your Page",
    intro: "CSS changes colors, spacing, layout, and more.",
    body: "Use properties like color, margin, padding, and background.",
    extra: "Small changes make big differences.",
    quiz: [
      {
        question: "Which CSS property changes text color?",
        options: ["font", "color", "text"],
        correctIndex: 1,
        correctMessage: "Correct!",
        wrongMessage: "Try again."
      }
    ]
  },

  11: {
    title: "Lesson 11 — What Makes a File JS",
    intro: "JavaScript adds behavior to your website.",
    body: "A JS file ends with .js and contains logic.",
    extra: "JS can change HTML, CSS, and respond to user actions.",
    quiz: [
      {
        question: "What does JavaScript control?",
        options: ["Structure", "Style", "Behavior"],
        correctIndex: 2,
        correctMessage: "Correct!",
        wrongMessage: "Incorrect."
      }
    ]
  },

  12: {
    title: "Lesson 12 — Saving app.js",
    intro: "app.js is your main script file.",
    body: "Keep it inside scripts/ for clean structure.",
    extra: "Use console.log() to test your code.",
    quiz: [
      {
        question: "Where should app.js go?",
        options: ["styles/", "scripts/", "root folder"],
        correctIndex: 1,
        correctMessage: "Correct!",
        wrongMessage: "Try again."
      }
    ]
  },

  13: {
    title: "Lesson 13 — Linking JavaScript",
    intro: "JS must be linked to HTML to run.",
    body: "Place <script src='scripts/app.js'></script> at the bottom of <body>.",
    extra: "This ensures HTML loads first.",
    quiz: [
      {
        question: "Where should you link app.js?",
        options: ["Inside <head>", "Top of <body>", "Bottom of <body>"],
        correctIndex: 2,
        correctMessage: "Correct!",
        wrongMessage: "Incorrect."
      }
    ]
  },

  14: {
    title: "Lesson 14 — Console & Variables",
    intro: "The console helps you debug.",
    body: "Variables store values you can reuse.",
    extra: "Use let, const, or var.",
    quiz: [
      {
        question: "Which keyword creates a variable?",
        options: ["make", "let", "store"],
        correctIndex: 1,
        correctMessage: "Correct!",
        wrongMessage: "Try again."
      }
    ]
  },

  15: {
    title: "Lesson 15 — Making Your First App",
    intro: "Now you combine HTML, CSS, and JS.",
    body: "Your first app should be simple and structured.",
    extra: "Focus on clean folders and linking.",
    quiz: [
      {
        question: "What do you need to build an app?",
        options: ["HTML only", "HTML + CSS + JS", "Just JavaScript"],
        correctIndex: 1,
        correctMessage: "Correct!",
        wrongMessage: "Nope."
      }
    ]
  }
};
