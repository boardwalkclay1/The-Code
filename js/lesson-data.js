export const LESSONS = {
  1: {
    title: "Lesson 1 — What Makes a File HTML",
    intro: "HTML files are just text files that end with .html. That’s it.",
    body: "When you save a file as index.html, you’re telling the browser: “This is a webpage.” The content inside is text, but the name and extension give it meaning.",
    extra: "Don’t overthink it. A file becomes HTML because you name it something like index.html, about.html, or contact.html.",
    quiz: [
      {
        question: "What makes a file an HTML file?",
        options: [
          "The program you used to type it",
          "The .html at the end of the filename",
          "The color of the text"
        ],
        correctIndex: 1,
        correctMessage: "Exactly. The extension .html is what matters.",
        wrongMessage: "Not quite. It’s not about the editor or colors."
      },
      {
        question: "Which of these is a valid HTML filename?",
        options: [
          "index.txt",
          "index.html.txt",
          "index.html"
        ],
        correctIndex: 2,
        correctMessage: "Correct. index.html is a proper HTML file.",
        wrongMessage: "Close, but remember: only one .html at the end."
      }
    ]
  },

  2: {
    title: "Lesson 2 — Saving index.html",
    intro: "index.html is usually the “home page” of your site.",
    body: "When a browser or hosting service looks at your project, it often looks for index.html first. That’s why we use that name for the main entry point.",
    extra: "You’ll practice saving index.html correctly in the HTML simulator after this lesson.",
    quiz: [
      {
        question: "Why is index.html a special filename?",
        options: [
          "Browsers often load it first by default",
          "It makes your site faster",
          "It changes your internet speed"
        ],
        correctIndex: 0,
        correctMessage: "Right. Many servers look for index.html automatically.",
        wrongMessage: "Nope. It’s about default loading, not speed."
      },
      {
        question: "When saving index.html, what should you choose?",
        options: [
          "Save as type: Text Document (.txt)",
          "Save as type: All Files (*.*)",
          "Save as type: Image File"
        ],
        correctIndex: 1,
        correctMessage: "Correct. All Files lets .html stay as the extension.",
        wrongMessage: "Remember: choose All Files so .html is respected."
      }
    ]
  },

  3: {
    title: "Lesson 3 — HTML Structure",
    intro: "HTML gives structure to your page: head, body, and elements.",
    body: "A basic HTML file has a doctype, an html tag, a head for meta info, and a body for what you see on the page.",
    extra: "You don’t need to memorize everything at once—just recognize the pattern.",
    quiz: [
      {
        question: "Which part of HTML holds what you see on the page?",
        options: [
          "<head>",
          "<body>",
          "<meta>"
        ],
        correctIndex: 1,
        correctMessage: "Yes. The body contains visible content.",
        wrongMessage: "Think about where text and buttons actually appear."
      },
      {
        question: "What does <!DOCTYPE html> do?",
        options: [
          "Tells the browser this is an HTML5 document",
          "Changes the font",
          "Saves the file automatically"
        ],
        correctIndex: 0,
        correctMessage: "Exactly. It declares the document type.",
        wrongMessage: "It’s not about style or saving—it's a declaration."
      }
    ]
  },

  4: {
    title: "Lesson 4 — The Head & Body",
    intro: "The head is for information about the page; the body is for the page itself.",
    body: "In the head, you put the title, meta tags, and links to CSS. In the body, you put headings, paragraphs, buttons, and more.",
    extra: "Think of head as the brain and body as the visible body of your page.",
    quiz: [
      {
        question: "Where do you put the <title> tag?",
        options: [
          "Inside <head>",
          "Inside <body>",
          "Outside <html>"
        ],
        correctIndex: 0,
        correctMessage: "Correct. Titles live in the head.",
        wrongMessage: "Titles don’t go in the body—they describe the page."
      },
      {
        question: "Where do users see most of your content?",
        options: [
          "In the head",
          "In the body",
          "In the URL bar only"
        ],
        correctIndex: 1,
        correctMessage: "Right. The body holds visible content.",
        wrongMessage: "Remember: body = what you see."
      }
    ]
  },

  5: {
    title: "Lesson 5 — Tags & Elements",
    intro: "HTML is made of tags that wrap content and give it meaning.",
    body: "Tags like <h1>, <p>, and <button> tell the browser what kind of content something is. Together, they form elements.",
    extra: "You don’t have to know every tag—just start with a few and build from there.",
    quiz: [
      {
        question: "Which tag is best for a main heading?",
        options: [
          "<p>",
          "<h1>",
          "<div>"
        ],
        correctIndex: 1,
        correctMessage: "Yes. <h1> is the main heading.",
        wrongMessage: "Think about “heading 1” — that’s <h1>."
      },
      {
        question: "What do tags like <p> and </p> represent?",
        options: [
          "A paragraph element",
          "A picture",
          "A video"
        ],
        correctIndex: 0,
        correctMessage: "Correct. <p> wraps paragraphs.",
        wrongMessage: "They’re not media—they’re text containers."
      }
    ]
  },

  6: {
    title: "Lesson 6 — What Makes a File CSS",
    intro: "CSS files are text files that end with .css.",
    body: "CSS controls how things look: colors, fonts, spacing, layout. The .css extension tells the browser this file is for styling.",
    extra: "Again, the name and extension are what define the file type.",
    quiz: [
      {
        question: "What makes a file a CSS file?",
        options: [
          "The .css extension",
          "The font you use",
          "The editor theme"
        ],
        correctIndex: 0,
        correctMessage: "Exactly. .css is the key.",
        wrongMessage: "It’s not about visuals—it’s the extension."
      },
      {
        question: "Which is a valid CSS filename?",
        options: [
          "style.css",
          "style.html",
          "style.txt"
        ],
        correctIndex: 0,
        correctMessage: "Correct. style.css is a CSS file.",
        wrongMessage: "Remember: .css at the end."
      }
    ]
  },

  7: {
    title: "Lesson 7 — Saving style.css",
    intro: "We usually keep style.css in a styles/ folder.",
    body: "This keeps your project organized: HTML in the root, CSS in styles/, JS in scripts/.",
    extra: "You’ll practice this in the CSS save simulator.",
    quiz: [
      {
        question: "Where should style.css usually live?",
        options: [
          "In styles/",
          "In scripts/",
          "In downloads/"
        ],
        correctIndex: 0,
        correctMessage: "Right. styles/ is for CSS.",
        wrongMessage: "Think: styles → styling → CSS."
      },
      {
        question: "When saving style.css, which type should you choose?",
        options: [
          "Text Document (.txt)",
          "All Files (*.*)",
          "Image File"
        ],
        correctIndex: 1,
        correctMessage: "Correct. All Files keeps .css intact.",
        wrongMessage: "Choose All Files so .css is respected."
      }
    ]
  },

  8: {
    title: "Lesson 8 — Linking CSS",
    intro: "To use CSS, you link it in your HTML head.",
    body: "You use a <link> tag with rel=\"stylesheet\" and href=\"styles/style.css\" (or whatever your path is).",
    extra: "If the link path is wrong, your styles won’t show up.",
    quiz: [
      {
        question: "Where do you usually link CSS?",
        options: [
          "Inside <head>",
          "At the bottom of <body>",
          "Outside <html>"
        ],
        correctIndex: 0,
        correctMessage: "Yes. CSS links go in the head.",
        wrongMessage: "Think: head = setup, including styles."
      },
      {
        question: "Which is a correct CSS link?",
        options: [
          "<link rel=\"stylesheet\" href=\"styles/style.css\">",
          "<style src=\"styles/style.css\">",
          "<script href=\"styles/style.css\"></script>"
        ],
        correctIndex: 0,
        correctMessage: "Correct. That’s the proper link syntax.",
        wrongMessage: "Look for rel=\"stylesheet\" and href."
      }
    ]
  },

  9: {
    title: "Lesson 9 — Selectors & Classes",
    intro: "Selectors target elements; classes let you style groups of elements.",
    body: "You can give an element class=\"btn\" and then style .btn in your CSS.",
    extra: "Classes are reusable labels you attach to elements.",
    quiz: [
      {
        question: "How do you select a class named btn in CSS?",
        options: [
          "btn { }",
          ".btn { }",
          "#btn { }"
        ],
        correctIndex: 1,
        correctMessage: "Exactly. A dot means class.",
        wrongMessage: "Remember: .className for classes."
      },
      {
        question: "What does class=\"highlight\" do in HTML?",
        options: [
          "Gives the element a reusable label",
          "Changes the font automatically",
          "Saves the file"
        ],
        correctIndex: 0,
        correctMessage: "Correct. It labels the element for styling.",
        wrongMessage: "It doesn’t style by itself—it labels."
      }
    ]
  },

  10: {
    title: "Lesson 10 — Styling Your Page",
    intro: "CSS lets you control colors, spacing, fonts, and layout.",
    body: "You can start simple: change background colors, text colors, and font sizes to make your page readable and clean.",
    extra: "Small, intentional changes are better than random styling.",
    quiz: [
      {
        question: "Which property changes text color?",
        options: [
          "background-color",
          "color",
          "font-weight"
        ],
        correctIndex: 1,
        correctMessage: "Yes. color controls text color.",
        wrongMessage: "Think: color = text color."
      },
      {
        question: "Which property adds space outside an element?",
        options: [
          "padding",
          "margin",
          "border-radius"
        ],
        correctIndex: 1,
        correctMessage: "Correct. margin is outside space.",
        wrongMessage: "Padding is inside; margin is outside."
      }
    ]
  },

  11: {
    title: "Lesson 11 — What Makes a File JS",
    intro: "JavaScript files are text files that end with .js.",
    body: "JS controls behavior: clicks, animations, logic, data. The .js extension tells the browser this file contains JavaScript.",
    extra: "Again, it’s just text with a specific name and extension.",
    quiz: [
      {
        question: "What makes a file a JS file?",
        options: [
          "The .js extension",
          "The font color",
          "The file size"
        ],
        correctIndex: 0,
        correctMessage: "Exactly. .js is what matters.",
        wrongMessage: "It’s not about visuals or size."
      },
      {
        question: "Which is a valid JS filename?",
        options: [
          "app.js",
          "app.html",
          "app.css"
        ],
        correctIndex: 0,
        correctMessage: "Correct. app.js is JavaScript.",
        wrongMessage: "Remember: .js at the end."
      }
    ]
  },

  12: {
    title: "Lesson 12 — Saving app.js",
    intro: "We usually keep app.js in a scripts/ folder.",
    body: "This keeps your logic separate from your structure (HTML) and style (CSS).",
    extra: "You’ll practice this in the JS save simulator.",
    quiz: [
      {
        question: "Where should app.js usually live?",
        options: [
          "In scripts/",
          "In styles/",
          "In images/"
        ],
        correctIndex: 0,
        correctMessage: "Right. scripts/ is for JS.",
        wrongMessage: "Think: scripts → JavaScript."
      },
      {
        question: "When saving app.js, which type should you choose?",
        options: [
          "Text Document (.txt)",
          "All Files (*.*)",
          "PDF"
        ],
        correctIndex: 1,
        correctMessage: "Correct. All Files keeps .js intact.",
        wrongMessage: "Choose All Files so .js is respected."
      }
    ]
  },

  13: {
    title: "Lesson 13 — Linking JavaScript",
    intro: "To use JS, you link it in your HTML, usually before </body>.",
    body: "You use a <script src=\"scripts/app.js\"></script> tag so the browser loads your logic.",
    extra: "Putting scripts at the bottom helps the page load content first.",
    quiz: [
      {
        question: "Where do we usually place script tags?",
        options: [
          "At the top of <head>",
          "At the bottom of <body>",
          "Outside <html>"
        ],
        correctIndex: 1,
        correctMessage: "Yes. Bottom of body is common.",
        wrongMessage: "We want the page to load before scripts run."
      },
      {
        question: "Which is a correct JS script tag?",
        options: [
          "<script src=\"scripts/app.js\"></script>",
          "<link src=\"scripts/app.js\">",
          "<style src=\"scripts/app.js\"></style>"
        ],
        correctIndex: 0,
        correctMessage: "Correct. That’s the proper script syntax.",
        wrongMessage: "Look for <script> with src."
      }
    ]
  },

  14: {
    title: "Lesson 14 — Console & Variables",
    intro: "The console lets you see what your code is doing; variables store values.",
    body: "You can use console.log() to print messages, and let or const to store data.",
    extra: "The console is your friend when debugging and learning.",
    quiz: [
      {
        question: "What does console.log() do?",
        options: [
          "Shows a message in the browser console",
          "Changes the background color",
          "Saves the file"
        ],
        correctIndex: 0,
        correctMessage: "Exactly. It logs to the console.",
        wrongMessage: "It’s for debugging, not styling or saving."
      },
      {
        question: "Which keyword can you use to create a variable?",
        options: [
          "let",
          "style",
          "html"
        ],
        correctIndex: 0,
        correctMessage: "Correct. let creates a variable.",
        wrongMessage: "Think: let x = 5; that’s a variable."
      }
    ]
  },

  15: {
    title: "Lesson 15 — Making Your First App",
    intro: "Now you combine HTML, CSS, and JS into a small app.",
    body: "You might build a simple counter, a button that changes text, or a small interactive card.",
    extra: "The goal is not complexity—it’s seeing all three files working together.",
    quiz: [
      {
        question: "Which three files usually work together in a basic web app?",
        options: [
          "HTML, CSS, JS",
          "PDF, DOCX, JPG",
          "MP3, MP4, ZIP"
        ],
        correctIndex: 0,
        correctMessage: "Exactly. Structure, style, behavior.",
        wrongMessage: "Think: structure, style, logic."
      },
      {
        question: "After building your first app, what’s a powerful next step?",
        options: [
          "Delete it",
          "Upload it to GitHub and share it",
          "Never look at it again"
        ],
        correctIndex: 1,
        correctMessage: "Correct. Put it on GitHub and make it real.",
        wrongMessage: "You want to publish, not hide, your work."
      }
    ]
  }
};
