export const LESSONS = {
  1: {
    title: "Lesson 1 — What Makes a File HTML",
    intro: "HTML is the foundation of every website. It tells the browser what exists on the page.",
    body: "HTML stands for HyperText Markup Language. It uses tags to structure content such as text, images, buttons, and layouts. When a browser sees a .html file, it knows to render it as a webpage.",
    extra: "Every website you’ve ever visited starts with an index.html file. This is the entry point of the entire build.",
    quiz: [
      {
        question: "What does HTML control?",
        options: ["Structure", "Styling", "Logic"],
        correctIndex: 0,
        correctMessage: "Correct. HTML defines the structure of the page.",
        wrongMessage: "Not quite. HTML is responsible for structure."
      },
      {
        question: "What file extension does an HTML file use?",
        options: [".css", ".js", ".html"],
        correctIndex: 2,
        correctMessage: "Exactly. .html is the correct extension.",
        wrongMessage: "Incorrect. HTML files always end with .html."
      }
    ]
  },

  2: {
    title: "Lesson 2 — Saving index.html",
    intro: "index.html is the first file the browser looks for when loading a website.",
    body: "When you create a new project, the first file you save should be index.html. This becomes the homepage of your site and the root of your entire structure.",
    extra: "Every folder you build in the future will still rely on index.html as the starting point.",
    quiz: [
      {
        question: "Why is index.html important?",
        options: ["It stores images", "It is the default homepage", "It runs JavaScript"],
        correctIndex: 1,
        correctMessage: "Correct. Browsers automatically load index.html first.",
        wrongMessage: "Incorrect. index.html is the default homepage."
      },
      {
        question: "Where should index.html be saved?",
        options: ["Inside scripts/", "Inside styles/", "In the root folder"],
        correctIndex: 2,
        correctMessage: "Correct. index.html belongs in the root.",
        wrongMessage: "Not quite. index.html always goes in the root folder."
      }
    ]
  },

  3: {
    title: "Lesson 3 — HTML Structure",
    intro: "HTML uses a simple structure that every webpage follows.",
    body: "The basic structure includes <!DOCTYPE html>, <html>, <head>, and <body>. The head contains metadata, while the body contains everything the user sees.",
    extra: "Once you memorize this structure, building pages becomes effortless.",
    quiz: [
      {
        question: "Which tag contains visible content?",
        options: ["<head>", "<body>", "<meta>"],
        correctIndex: 1,
        correctMessage: "Correct. Everything visible goes inside <body>.",
        wrongMessage: "Incorrect. Visible content belongs in <body>."
      },
      {
        question: "What does <!DOCTYPE html> do?",
        options: ["Starts CSS", "Tells browser to use HTML5", "Runs JavaScript"],
        correctIndex: 1,
        correctMessage: "Correct. It activates HTML5 mode.",
        wrongMessage: "Incorrect. <!DOCTYPE html> tells the browser to use HTML5."
      }
    ]
  },

  4: {
    title: "Lesson 4 — The Head & Body",
    intro: "The head and body are the two main sections of an HTML document.",
    body: "The head contains metadata, links to CSS, fonts, and scripts. The body contains all visible elements such as text, images, buttons, and layouts.",
    extra: "Think of the head as the brain and the body as the physical form.",
    quiz: [
      {
        question: "Where do you link CSS?",
        options: ["Inside <body>", "Inside <head>", "At the bottom"],
        correctIndex: 1,
        correctMessage: "Correct. CSS belongs in the <head>.",
        wrongMessage: "Incorrect. CSS is always linked in the <head>."
      },
      {
        question: "Which section displays content?",
        options: ["<meta>", "<head>", "<body>"],
        correctIndex: 2,
        correctMessage: "Correct. The body displays content.",
        wrongMessage: "Incorrect. The body is the visible section."
      }
    ]
  },

  5: {
    title: "Lesson 5 — Tags & Elements",
    intro: "Tags are the building blocks of HTML.",
    body: "Tags wrap content and tell the browser what type of element it is. Examples include <p>, <h1>, <img>, <button>, and <div>.",
    extra: "Every element has an opening tag, content, and a closing tag — except self‑closing tags like <img>.",
    quiz: [
      {
        question: "Which is a self‑closing tag?",
        options: ["<p>", "<img>", "<button>"],
        correctIndex: 1,
        correctMessage: "Correct. <img> is self‑closing.",
        wrongMessage: "Incorrect. <img> is the self‑closing tag."
      },
      {
        question: "Which tag creates a paragraph?",
        options: ["<p>", "<div>", "<span>"],
        correctIndex: 0,
        correctMessage: "Correct. <p> is for paragraphs.",
        wrongMessage: "Incorrect. <p> creates paragraphs."
      }
    ]
  },

  6: {
    title: "Lesson 6 — What Makes a File CSS",
    intro: "CSS controls the appearance of your website.",
    body: "CSS stands for Cascading Style Sheets. It changes colors, spacing, layout, fonts, animations, and more.",
    extra: "HTML is the skeleton. CSS is the style.",
    quiz: [
      {
        question: "What does CSS control?",
        options: ["Structure", "Styling", "Logic"],
        correctIndex: 1,
        correctMessage: "Correct. CSS handles styling.",
        wrongMessage: "Incorrect. CSS is for styling."
      },
      {
        question: "What file extension does CSS use?",
        options: [".js", ".css", ".html"],
        correctIndex: 1,
        correctMessage: "Correct. CSS files end with .css.",
        wrongMessage: "Incorrect. CSS files use .css."
      }
    ]
  },

  7: {
    title: "Lesson 7 — Saving style.css",
    intro: "style.css is your main stylesheet.",
    body: "This file controls the look of your entire site. It should be saved inside a folder named styles/ or css/ depending on your structure.",
    extra: "Keeping CSS in its own folder keeps your project clean.",
    quiz: [
      {
        question: "Where should style.css be saved?",
        options: ["Root folder", "styles/ folder", "scripts/ folder"],
        correctIndex: 1,
        correctMessage: "Correct. CSS belongs in styles/.",
        wrongMessage: "Incorrect. style.css goes in styles/."
      },
      {
        question: "What does CSS stand for?",
        options: ["Cascading Style Sheets", "Creative Style System", "Code Styling Syntax"],
        correctIndex: 0,
        correctMessage: "Correct.",
        wrongMessage: "Incorrect. CSS means Cascading Style Sheets."
      }
    ]
  },

  8: {
    title: "Lesson 8 — Linking CSS",
    intro: "To apply CSS, you must link it to your HTML.",
    body: "You link CSS inside the <head> using <link rel='stylesheet' href='styles/style.css'>.",
    extra: "If CSS isn’t linked, your page will look plain.",
    quiz: [
      {
        question: "Where do you link CSS?",
        options: ["<body>", "<head>", "<footer>"],
        correctIndex: 1,
        correctMessage: "Correct.",
        wrongMessage: "Incorrect. CSS is linked in the <head>."
      },
      {
        question: "Which tag links CSS?",
        options: ["<script>", "<link>", "<style>"],
        correctIndex: 1,
        correctMessage: "Correct.",
        wrongMessage: "Incorrect. <link> is used for CSS."
      }
    ]
  },

  9: {
    title: "Lesson 9 — Selectors & Classes",
    intro: "Selectors target elements so you can style them.",
    body: "Classes are reusable labels you attach to elements. You style them in CSS using .classname.",
    extra: "Classes keep your styling organized and scalable.",
    quiz: [
      {
        question: "How do you select a class in CSS?",
        options: ["#class", ".class", "class"],
        correctIndex: 1,
        correctMessage: "Correct.",
        wrongMessage: "Incorrect. Classes use a dot: .class"
      },
      {
        question: "What are classes used for?",
        options: ["Styling", "Saving files", "Running JavaScript"],
        correctIndex: 0,
        correctMessage: "Correct.",
        wrongMessage: "Incorrect. Classes are for styling."
      }
    ]
  },

  10: {
    title: "Lesson 10 — Styling Your Page",
    intro: "CSS lets you control every visual detail.",
    body: "You can change colors, spacing, fonts, layout, animations, shadows, and more. CSS transforms plain HTML into a real design.",
    extra: "This is where your creativity comes alive.",
    quiz: [
      {
        question: "Which property changes text color?",
        options: ["font-size", "color", "padding"],
        correctIndex: 1,
        correctMessage: "Correct.",
        wrongMessage: "Incorrect. The color property changes text color."
      },
      {
        question: "Which property adds space inside an element?",
        options: ["margin", "padding", "border"],
        correctIndex: 1,
        correctMessage: "Correct.",
        wrongMessage: "Incorrect. Padding adds inner space."
      }
    ]
  },

  11: {
    title: "Lesson 11 — What Makes a File JS",
    intro: "JavaScript adds behavior and logic to your site.",
    body: "JS controls interactivity, animations, data, events, and dynamic content. It turns static pages into real applications.",
    extra: "HTML = structure. CSS = style. JS = behavior.",
    quiz: [
      {
        question: "What does JavaScript control?",
        options: ["Structure", "Styling", "Behavior"],
        correctIndex: 2,
        correctMessage: "Correct.",
        wrongMessage: "Incorrect. JavaScript controls behavior."
      },
      {
        question: "What file extension does JavaScript use?",
        options: [".js", ".java", ".script"],
        correctIndex: 0,
        correctMessage: "Correct.",
        wrongMessage: "Incorrect. JavaScript files end with .js."
      }
    ]
  },

  12: {
    title: "Lesson 12 — Saving app.js",
    intro: "app.js is your main JavaScript file.",
    body: "This file handles your site’s logic. Save it inside a folder named scripts/ or js/.",
    extra: "Keeping JS separate keeps your project clean.",
    quiz: [
      {
        question: "Where should app.js be saved?",
        options: ["styles/", "scripts/", "root folder"],
        correctIndex: 1,
        correctMessage: "Correct.",
        wrongMessage: "Incorrect. app.js belongs in scripts/."
      },
      {
        question: "What does JS stand for?",
        options: ["Java Syntax", "JavaScript", "Just Script"],
        correctIndex: 1,
        correctMessage: "Correct.",
        wrongMessage: "Incorrect. JS means JavaScript."
      }
    ]
  },

  13: {
    title: "Lesson 13 — Linking JavaScript",
    intro: "To activate JavaScript, you must link it.",
    body: "You link JS at the bottom of the <body> using <script src='scripts/app.js'></script>.",
    extra: "Linking at the bottom ensures the page loads first.",
    quiz: [
      {
        question: "Where should you link JavaScript?",
        options: ["<head>", "Top of <body>", "Bottom of <body>"],
        correctIndex: 2,
        correctMessage: "Correct.",
        wrongMessage: "Incorrect. JS is linked at the bottom of <body>."
      },
      {
        question: "Which tag loads JavaScript?",
        options: ["<script>", "<link>", "<js>"],
        correctIndex: 0,
        correctMessage: "Correct.",
        wrongMessage: "Incorrect. JavaScript uses the <script> tag."
      }
    ]
  },

  14: {
    title: "Lesson 14 — Console & Variables",
    intro: "The console is where you test and debug your code.",
    body: "Variables store data. You create them using let, const, or var. The console helps you see what your code is doing.",
    extra: "Learning the console makes debugging simple.",
    quiz: [
      {
        question: "Which keyword creates a variable?",
        options: ["let", "make", "varname"],
        correctIndex: 0,
        correctMessage: "Correct.",
        wrongMessage: "Incorrect. let is used to create variables."
      },
      {
        question: "Where do you test JavaScript?",
        options: ["The console", "The head", "The CSS file"],
        correctIndex: 0,
        correctMessage: "Correct.",
        wrongMessage: "Incorrect. You test JS in the console."
      }
    ]
  },

  15: {
    title: "Lesson 15 — Making Your First App",
    intro: "Now you combine HTML, CSS, and JS into a real app.",
    body: "You’ll build a simple interactive project that responds to user input. This is where everything you learned comes together.",
    extra: "This is your first real build — the beginning of your developer journey.",
    quiz: [
      {
        question: "Which languages work together to build an app?",
        options: ["HTML, CSS, JS", "Python only", "CSS only"],
        correctIndex: 0,
        correctMessage: "Correct. These three form the foundation.",
        wrongMessage: "Incorrect. HTML, CSS, and JS work together."
      },
      {
        question: "What does JavaScript add to your app?",
        options: ["Structure", "Style", "Interactivity"],
        correctIndex: 2,
        correctMessage: "Correct.",
        wrongMessage: "Incorrect. JavaScript adds interactivity."
      }
    ]
  }
};
