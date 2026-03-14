// modules/sections.js

// HEADER
document.getElementById("main-header").innerHTML = `
  <h1 class="page-title">THE CODE</h1>
  <p class="page-subtitle">
    You are inside a learning terminal designed to teach you how the digital world is built — from raw files to living systems.
  </p>
`;

// QUICK ACCESS
document.getElementById("quick-access").innerHTML = `
  <div class="bubble-row">
    <button class="bubble-button">HTML Foundations</button>
    <button class="bubble-button">CSS Styling</button>
    <button class="bubble-button">JavaScript Logic</button>
    <button class="bubble-button">Microcontrollers</button>
    <button class="bubble-button">Simulators</button>
    <button class="bubble-button">Real Projects</button>
  </div>
`;

// INTRO SECTION
document.getElementById("intro-section").innerHTML = `
  <section class="section-block">
    <h2 class="section-title">What This Course Is</h2>
    <p class="section-subtitle">
      A structured path from “I don’t know where to start” to “I can build and understand real systems.”
    </p>
    <p class="section-text">
      <span class="code-inline">The Code</span> is not just a collection of random tutorials. It is a carefully designed sequence of lessons, simulations, and mental models that teach you how to think like a developer.
    </p>
    <p class="section-text">
      You will learn how to create real files on your machine, how to connect them, how to debug them, and how to reason about what is happening behind the scenes. You will see how HTML defines structure, how CSS defines appearance, and how JavaScript defines behavior.
    </p>
    <p class="section-text">
      Beyond the browser, you will also explore how microcontrollers use similar logic to control physical systems — motors, sensors, lights, and more. The same thinking that powers a website can power a robot, a smart device, or an automated system.
    </p>
    <ul class="section-list">
      <li>Understand how files, folders, and links form the backbone of every project.</li>
      <li>Learn how to read and write code instead of just copying it.</li>
      <li>Gain the confidence to experiment, break things, and fix them.</li>
      <li>See how digital logic maps to real‑world hardware and microcontrollers.</li>
    </ul>
    <div class="tag-row">
      <span class="tag">HTML</span>
      <span class="tag">CSS</span>
      <span class="tag">JavaScript</span>
      <span class="tag">Microcontrollers</span>
      <span class="tag">Debugging</span>
      <span class="tag">Project Structure</span>
    </div>
  </section>
`;

// LESSONS SECTION
document.getElementById("lessons-section").innerHTML = `
  <section class="section-block">
    <h2 class="section-title">Lessons — Detailed Breakdown</h2>
    <p class="section-subtitle">
      Each lesson is a focused mission. You are not just watching — you are building.
    </p>

    <div class="lesson-grid">
      <div class="lesson-card">
        <div class="lesson-title">Lesson 1 — What Makes a File HTML</div>
        <div class="lesson-meta">Focus: File types, extensions, and the browser.</div>
        <p class="lesson-desc">
          You learn what an HTML file actually is, why the <span class="code-inline">.html</span> extension matters, and how your computer and browser recognize it as a web page. This lesson removes the mystery around “web files” and shows you that they are just text with structure.
        </p>
        <ul class="lesson-outcomes">
          <li>Understand the difference between plain text and HTML.</li>
          <li>Know how to create and save a valid HTML file.</li>
          <li>See how the browser interprets your file as a page.</li>
        </ul>
        <a class="lesson-button" href="paywall.html?next=lesson1">Access Lesson 1</a>
      </div>

      <div class="lesson-card">
        <div class="lesson-title">Lesson 2 — Saving index.html</div>
        <div class="lesson-meta">Focus: Entry points and naming conventions.</div>
        <p class="lesson-desc">
          You learn why <span class="code-inline">index.html</span> is the default entry point for most websites and how servers and hosting platforms look for it automatically. This lesson teaches you how to structure your project so it behaves like a real site.
        </p>
        <ul class="lesson-outcomes">
          <li>Understand why <span class="code-inline">index.html</span> is special.</li>
          <li>Learn where to save it in your folder structure.</li>
          <li>Open it directly in the browser and see it render.</li>
        </ul>
        <a class="lesson-button" href="paywall.html?next=lesson2">Access Lesson 2</a>
      </div>

      <div class="lesson-card">
        <div class="lesson-title">Lesson 3 — HTML Structure</div>
        <div class="lesson-meta">Focus: The skeleton of every page.</div>
        <p class="lesson-desc">
          You learn the core structure of an HTML document: <span class="code-inline">&lt;!DOCTYPE html&gt;</span>, <span class="code-inline">&lt;html&gt;</span>, <span class="code-inline">&lt;head&gt;</span>, and <span class="code-inline">&lt;body&gt;</span>. You see how every page, no matter how complex, starts from this simple skeleton.
        </p>
        <ul class="lesson-outcomes">
          <li>Memorize the basic HTML document structure.</li>
          <li>Understand where metadata and visible content live.</li>
          <li>Be able to write a valid HTML skeleton from scratch.</li>
        </ul>
        <a class="lesson-button" href="paywall.html?next=lesson3">Access Lesson 3</a>
      </div>

      <div class="lesson-card">
        <div class="lesson-title">Lesson 4 — Head & Body</div>
        <div class="lesson-meta">Focus: Invisible vs visible content.</div>
        <p class="lesson-desc">
          You learn the difference between the <span class="code-inline">&lt;head&gt;</span> and <span class="code-inline">&lt;body&gt;</span> sections. The head controls metadata, titles, and linked files. The body controls what the user actually sees. This separation is key to building organized pages.
        </p>
        <ul class="lesson-outcomes">
          <li>Know what belongs in the head vs the body.</li>
          <li>Link CSS and JS correctly from the head or body.</li>
          <li>Understand how the browser reads your document.</li>
        </ul>
        <a class="lesson-button" href="paywall.html?next=lesson4">Access Lesson 4</a>
      </div>

      <div class="lesson-card">
        <div class="lesson-title">Lesson 5 — Tags & Elements</div>
        <div class="lesson-meta">Focus: The building blocks of HTML.</div>
        <p class="lesson-desc">
          You learn what tags and elements are, how opening and closing tags work, and how nesting creates structure. You see how everything on a page — text, images, buttons, layouts — is built from these simple pieces.
        </p>
        <ul class="lesson-outcomes">
          <li>Understand the concept of elements and attributes.</li>
          <li>Write clean, nested HTML without breaking structure.</li>
          <li>Recognize common tags used in real projects.</li>
        </ul>
        <a class="lesson-button" href="paywall.html?next=lesson5">Access Lesson 5</a>
      </div>

      <div class="lesson-card">
        <div class="lesson-title">Lesson 6 — What Makes a File CSS</div>
        <div class="lesson-meta">Focus: Styling and separation of concerns.</div>
        <p class="lesson-desc">
          You learn what a CSS file is, why the <span class="code-inline">.css</span> extension matters, and how it separates design from structure. You see how a single CSS file can control the look of an entire site.
        </p>
        <ul class="lesson-outcomes">
          <li>Understand the role of CSS in a project.</li>
          <li>Create and save a valid <span class="code-inline">style.css</span> file.</li>
          <li>See how CSS changes the appearance of HTML.</li>
        </ul>
        <a class="lesson-button" href="paywall.html?next=lesson6">Access Lesson 6</a>
      </div>

      <div class="lesson-card">
        <div class="lesson-title">Lesson 7 — Saving style.css</div>
        <div class="lesson-meta">Focus: File placement and organization.</div>
        <p class="lesson-desc">
          You learn where to place your CSS file in your project, how to name it, and how to keep your structure clean so you never lose track of your styles. This lesson sets the foundation for scalable projects.
        </p>
        <ul class="lesson-outcomes">
          <li>Choose a consistent folder structure for styles.</li>
          <li>Understand relative paths and how the browser finds files.</li>
          <li>Prepare your project for future growth.</li>
        </ul>
        <a class="lesson-button" href="paywall.html?next=lesson7">Access Lesson 7</a>
      </div>

      <div class="lesson-card">
        <div class="lesson-title">Lesson 8 — Linking CSS</div>
        <div class="lesson-meta">Focus: Connecting HTML and CSS.</div>
        <p class="lesson-desc">
          You learn how to use the <span class="code-inline">&lt;link&gt;</span> tag to connect your HTML and CSS. You see how a single line in the head can transform a plain document into a designed interface.
        </p>
        <ul class="lesson-outcomes">
          <li>Write a correct <span class="code-inline">&lt;link&gt;</span> tag.</li>
          <li>Fix common path errors that break styles.</li>
          <li>Verify that your CSS is loading correctly.</li>
        </ul>
        <a class="lesson-button" href="paywall.html?next=lesson8">Access Lesson 8</a>
      </div>

      <div class="lesson-card">
        <div class="lesson-title">Lesson 9 — Selectors & Classes</div>
        <div class="lesson-meta">Focus: Targeting elements with precision.</div>
        <p class="lesson-desc">
          You learn how CSS selectors work, how classes let you style specific elements, and how to avoid messy, unmaintainable styles. This is where you start to control the page with intention.
        </p>
        <ul class="lesson-outcomes">
          <li>Use class selectors to style groups of elements.</li>
          <li>Understand the difference between tags, classes, and IDs.</li>
          <li>Write clean, reusable CSS rules.</li>
        </ul>
        <a class="lesson-button" href="paywall.html?next=lesson9">Access Lesson 9</a>
      </div>

      <div class="lesson-card">
        <div class="lesson-title">Lesson 10 — Styling Your Page</div>
        <div class="lesson-meta">Focus: Turning structure into design.</div>
        <p class="lesson-desc">
          You apply everything you’ve learned to style a real page. Colors, spacing, fonts, layout — you see how CSS transforms raw HTML into something that feels intentional and alive.
        </p>
        <ul class="lesson-outcomes">
          <li>Control typography, spacing, and layout.</li>
          <li>Use classes to create consistent visual patterns.</li>
          <li>Start thinking like a UI designer and developer.</li>
        </ul>
        <a class="lesson-button" href="paywall.html?next=lesson10">Access Lesson 10</a>
      </div>

      <div class="lesson-card">
        <div class="lesson-title">Lesson 11 — What Makes a File JS</div>
        <div class="lesson-meta">Focus: Behavior and logic.</div>
        <p class="lesson-desc">
          You learn what a JavaScript file is, why the <span class="code-inline">.js</span> extension matters, and how it adds behavior to your pages. This is where your projects stop being static and start reacting.
        </p>
        <ul class="lesson-outcomes">
          <li>Understand the role of JavaScript in the stack.</li>
          <li>Create and save a valid <span class="code-inline">app.js</span> file.</li>
          <li>See how JS can change content and respond to input.</li>
        </ul>
        <a class="lesson-button" href="paywall.html?next=lesson11">Access Lesson 11</a>
      </div>

      <div class="lesson-card">
        <div class="lesson-title">Lesson 12 — Saving app.js</div>
        <div class="lesson-meta">Focus: Organizing your logic.</div>
        <p class="lesson-desc">
          You learn where to place your JavaScript file, how to name it, and how to keep your logic separate from your structure and styles. This lesson prepares you for real‑world project organization.
        </p>
        <ul class="lesson-outcomes">
          <li>Choose a consistent folder for scripts.</li>
          <li>Understand how browsers load JavaScript files.</li>
          <li>Prepare for more advanced logic and features.</li>
        </ul>
        <a class="lesson-button" href="paywall.html?next=lesson12">Access Lesson 12</a>
      </div>

      <div class="lesson-card">
        <div class="lesson-title">Lesson 13 — Linking JavaScript</div>
        <div class="lesson-meta">Focus: Connecting behavior to the page.</div>
        <p class="lesson-desc">
          You learn how to use the <span class="code-inline">&lt;script&gt;</span> tag to connect your HTML and JavaScript. You see how a single script file can control interactions across your entire page.
        </p>
        <ul class="lesson-outcomes">
          <li>Write a correct <span class="code-inline">&lt;script&gt;</span> tag.</li>
          <li>Fix common path and loading order issues.</li>
          <li>Verify that your JavaScript is running.</li>
        </ul>
        <a class="lesson-button" href="paywall.html?next=lesson13">Access Lesson 13</a>
      </div>

      <div class="lesson-card">
        <div class="lesson-title">Lesson 14 — Console & Variables</div>
        <div class="lesson-meta">Focus: Thinking like a programmer.</div>
        <p class="lesson-desc">
          You learn how to use the browser console to inspect values, debug code, and understand what your program is doing. You also learn what variables are and how they store information.
        </p>
        <ul class="lesson-outcomes">
          <li>Use <span class="code-inline">console.log()</span> to see what’s happening.</li>
          <li>Create and update variables in JavaScript.</li>
          <li>Start reasoning about data and state.</li>
        </ul>
        <a class="lesson-button" href="paywall.html?next=lesson14">Access Lesson 14</a>
      </div>

      <div class="lesson-card">
        <div class="lesson-title">Lesson 15 — Making Your First App</div>
        <div class="lesson-meta">Focus: Bringing everything together.</div>
        <p class="lesson-desc">
          You build a small but complete app that uses HTML, CSS, and JavaScript together. You see how structure, style, and logic combine into something interactive and real.
        </p>
        <ul class="lesson-outcomes">
          <li>Build a working mini‑application from scratch.</li>
          <li>Connect user input to visible changes on the page.</li>
          <li>Gain the confidence to start your own projects.</li>
        </ul>
        <a class="lesson-button" href="paywall.html?next=lesson15">Access Lesson 15</a>
      </div>
    </div>
  </section>
`;

// SIMULATORS SECTION
document.getElementById("simulators-section").innerHTML = `
  <section class="section-block">
    <h2 class="section-title">Simulators — Practice in a Safe Environment</h2>
    <p class="section-subtitle">
      Simulators let you experiment without fear. You can break things, reset, and try again.
    </p>

    <div class="sim-grid">
      <div class="sim-card">
        <div class="sim-title">HTML Simulator</div>
        <div class="sim-meta">Focus: Structure, tags, and layout.</div>
        <p class="sim-desc">
          The HTML simulator gives you a live environment where you can type HTML and instantly see the result. You can test headings, paragraphs, lists, images, and layouts without touching your real files.
        </p>
        <ul class="sim-outcomes">
          <li>Practice writing clean, valid HTML.</li>
          <li>See how small changes affect structure.</li>
          <li>Build confidence before editing real projects.</li>
        </ul>
        <a class="sim-button" href="paywall.html?next=sim-html">Open HTML Simulator</a>
      </div>

      <div class="sim-card">
        <div class="sim-title">CSS Simulator</div>
        <div class="sim-meta">Focus: Colors, spacing, and visual design.</div>
        <p class="sim-desc">
          The CSS simulator lets you experiment with colors, fonts, spacing, and layout. You can see how different rules interact and how to avoid conflicts and messy styles.
        </p>
        <ul class="sim-outcomes">
          <li>Understand how selectors and properties work together.</li>
          <li>Test different visual ideas quickly.</li>
          <li>Learn how to debug broken or conflicting styles.</li>
        </ul>
        <a class="sim-button" href="paywall.html?next=sim-css">Open CSS Simulator</a>
      </div>

      <div class="sim-card">
        <div class="sim-title">JavaScript Simulator</div>
        <div class="sim-meta">Focus: Logic, events, and interaction.</div>
        <p class="sim-desc">
          The JavaScript simulator gives you a safe space to write and run code. You can test variables, functions, events, and DOM manipulation without breaking anything important.
        </p>
        <ul class="sim-outcomes">
          <li>Practice writing and running JavaScript code.</li>
          <li>See how logic flows step by step.</li>
          <li>Learn how to respond to user actions.</li>
        </ul>
        <a class="sim-button" href="paywall.html?next=sim-js">Open JavaScript Simulator</a>
      </div>

      <div class="sim-card">
        <div class="sim-title">Microcontroller Logic Lab</div>
        <div class="sim-meta">Focus: Digital logic and real‑world systems.</div>
        <p class="sim-desc">
          The microcontroller simulator shows you how code can control physical systems. You experiment with virtual sensors, LEDs, and motors, and see how simple logic can create complex behavior.
        </p>
        <ul class="sim-outcomes">
          <li>Understand how microcontrollers read inputs and send outputs.</li>
          <li>See how timing, loops, and conditions control hardware.</li>
          <li>Connect web logic to real‑world devices.</li>
        </ul>
        <a class="sim-button" href="paywall.html?next=sim-micro">Open Microcontroller Lab</a>
      </div>
    </div>
  </section>
`;

// MICROCONTROLLERS SECTION
document.getElementById("microcontrollers-section").innerHTML = `
  <section class="section-block">
    <h2 class="section-title">Microcontrollers & The Real World</h2>
    <p class="section-subtitle">
      The same logic that powers a website can power a machine.
    </p>

    <div class="micro-grid">
      <div class="micro-card">
        <div class="micro-title">What Is a Microcontroller?</div>
        <p class="micro-desc">
          A microcontroller is a tiny computer that lives inside everyday devices. It reads inputs (buttons, sensors, signals), runs logic, and sends outputs (lights, motors, sounds). It is the invisible brain behind modern systems.
        </p>
        <ul class="micro-list">
          <li>Found in cars, appliances, toys, and tools.</li>
          <li>Runs code that you can write and understand.</li>
          <li>Bridges the gap between software and hardware.</li>
        </ul>
      </div>

      <div class="micro-card">
        <div class="micro-title">Why Programmers Matter</div>
        <p class="micro-desc">
          Every microcontroller needs instructions. Those instructions are written by programmers. When you learn to code, you gain the ability to define how machines behave — how they react, how they protect, how they automate.
        </p>
        <ul class="micro-list">
          <li>Design systems that respond to the real world.</li>
          <li>Automate tasks that used to be manual.</li>
          <li>Build tools that scale beyond your physical presence.</li>
        </ul>
      </div>

      <div class="micro-card">
        <div class="micro-title">From Web to Hardware</div>
        <p class="micro-desc">
          The mental models you build in this course — variables, conditions, loops, events — are the same models used in embedded systems. Once you understand them in the browser, you can apply them to microcontrollers.
        </p>
        <ul class="micro-list">
          <li>Use the same logic to control LEDs and UI elements.</li>
          <li>Think in terms of inputs, processing, and outputs.</li>
          <li>See code as a universal language for systems.</li>
        </ul>
      </div>
    </div>
  </section>
`;

// GAIN SECTION
document.getElementById("gain-section").innerHTML = `
  <section class="section-block">
    <h2 class="section-title">What You Will Gain</h2>
    <p class="section-subtitle">
      This is not just about learning syntax. It is about changing how you see the world.
    </p>
    <p class="section-text">
      By the end of this course, you will be able to look at a website, an app, or a device and understand that it is not magic — it is a series of decisions, structures, and instructions. You will know how to create your own.
    </p>
    <ul class="section-list">
      <li>A clear mental model of how the web works.</li>
      <li>The ability to build and host your own projects.</li>
      <li>The confidence to read, modify, and extend code.</li>
      <li>A foundation that can grow into advanced skills.</li>
    </ul>
  </section>
`;

// FOOTER
document.getElementById("footer").innerHTML = `
  <footer class="footer">
    <span>[ END OF PUBLIC INDEX ]</span>
    <span>To continue, you will pass through a paywall that verifies access and unlocks the full academy.</span>
    <span>All lessons, simulators, and tools are available after verification.</span>
  </footer>
`;

// BUBBLE BUTTON RIPPLE (placeholder, same as original intent)
document.querySelectorAll(".bubble-button").forEach(btn => {
  btn.addEventListener("click", (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // Placeholder: original code referenced ::after, which can't be selected directly.
    // You can extend this later with a real ripple implementation.
  });
});
