// modules/sections.js
// FINAL MATRIX VERSION — Correct routing, no overrides, no light theme

(function () {
  const $ = id => document.getElementById(id);

  // --- Category data ---
  const categories = [
    {
      id: 'websites',
      title: 'Websites',
      subtitle: 'Build pages, stores, dashboards, and custom sites',
      bullets: [
        'Personal sites and portfolios',
        'Business websites and landing pages',
        'E‑commerce and booking systems',
        'Interactive dashboards and admin panels',
        'Custom UI/UX, animations, and forms'
      ],
      workflow: 'Design → Structure (HTML/CSS) → Interactivity (JS) → Backend/API → Deploy & Monitor',
      income: '$300–$20,000+ per project depending on scope',
      deepPage: 'pages/websites.html',
      paywall: 'paywalls/websites-paywall.html'
    },
    {
      id: 'apps',
      title: 'Apps',
      subtitle: 'Web and mobile apps, tools, and utilities',
      bullets: [
        'Web apps and single‑page apps',
        'Mobile apps and progressive web apps',
        'Real‑time dashboards and chat systems',
        'Custom business tools and integrations',
        'Recurring revenue via maintenance and subscriptions'
      ],
      workflow: 'Idea → Wireframes → Frontend → Backend & Data → Testing → Release & Iterate',
      income: '$50–$150/hr; $3,000–$25,000+ per custom app',
      deepPage: 'pages/apps.html',
      paywall: 'paywalls/apps-paywall.html'
    },
    {
      id: 'microcontrollers',
      title: 'Microcontrollers',
      subtitle: 'Sensors, cameras, lights, robotics, and automation',
      bullets: [
        'Sensor systems (temperature, motion, light)',
        'Smart lights and home automation',
        'Motion‑activated cameras and monitoring',
        'Wearables and robotics basics',
        'Custom devices that connect to apps and dashboards'
      ],
      workflow: 'Prototype → Wiring & Firmware → Data collection → Connectivity → Integration with apps',
      income: '$500–$50,000+ per project depending on scale',
      deepPage: 'pages/microcontrollers.html',
      paywall: 'paywalls/microcontrollers-paywall.html'
    },
    {
      id: 'cybersecurity',
      title: 'Cybersecurity (Pen Testing & Ethical Hacking)',
      subtitle: 'Learn to secure systems and think like an ethical tester',
      bullets: [
        'Network fundamentals and threat models',
        'Vulnerability discovery and safe testing (ethical only)',
        'Secure coding and hardening apps',
        'Traffic analysis and incident response basics',
        'Building safer systems and audits'
      ],
      workflow: 'Recon → Test (safe, legal) → Report → Remediate → Harden & Monitor',
      income: '$75–$150/hr; $1,000–$10,000+ per audit; high full‑time salaries',
      deepPage: 'pages/cybersecurity.html',
      paywall: 'paywalls/cybersecurity-paywall.html'
    }
  ];

  window.APP_CATEGORIES = categories;

  // --- Intro content ---
  const introHTML = `
    <div class="section-block">
      <h1 class="page-title">The Code</h1>
      <p class="page-subtitle">Websites • Apps • Microcontrollers • Cybersecurity</p>
      <p class="section-text">Each path teaches real workflows, real projects, and real income opportunities.</p>
      <div class="bubble-row">
        <button class="bubble-button" data-action="explore-courses">Explore Courses</button>
        <button class="bubble-button" data-action="pricing">Pricing & Bundles</button>
        <button class="bubble-button" data-action="all-lessons">All Lessons</button>
      </div>
    </div>
  `;

  // --- Category cards ---
  function renderCategoryCards() {
    return categories.map(cat => `
      <article class="lesson-card section-block" id="cat-${cat.id}">
        <h3 class="lesson-title">${cat.title}</h3>
        <p class="lesson-meta">${cat.subtitle}</p>
        <ul class="lesson-outcomes">
          ${cat.bullets.map(b => `<li>${b}</li>`).join('')}
        </ul>
        <p class="lesson-desc"><strong>Workflow:</strong> ${cat.workflow}</p>
        <p class="lesson-meta"><strong>Income potential:</strong> ${cat.income}</p>
        <div style="margin-top:10px;">
          <a class="lesson-button" href="${cat.paywall}">Start ${cat.title}</a>
          <button class="lesson-button" data-action="learn-more" data-cat="${cat.id}" style="margin-left:8px;">Learn More</button>
        </div>
      </article>
    `).join('');
  }

  // --- Pricing block ---
  const pricingHTML = `
    <div class="section-block" id="pricing-block">
      <h3 class="section-title">Pricing</h3>
      <p class="section-text">One‑time fee per category. Bundle for discounts.</p>
      <button class="bubble-button" onclick="location.href='pages/pricing.html'">View Pricing Details</button>
    </div>
  `;

  // --- Support block ---
  const supportHTML = `
    <div class="section-block">
      <h3 class="section-title">Guided learning</h3>
      <p class="section-text">You will be guided through every step of the code.</p>
      <p class="section-text">Microcontroller lessons show sensors, cameras, lights, relays, motors, and automation.</p>
    </div>
  `;

  // --- Lessons section ---
  const lessonsHTML = `
    <div class="section-block">
      <h2 class="section-title">What you can build</h2>
      <p class="section-text">Each category contains multiple projects and workflows.</p>
      <div class="lesson-grid">
        ${renderCategoryCards()}
      </div>
      ${pricingHTML}
      ${supportHTML}
    </div>
  `;

  // --- Sidebar (Matrix version ONLY) ---
  function renderSidebar() {
    const sidebar = $('sidebar');
    if (!sidebar) return;

    sidebar.innerHTML = `
      <div>
        <div class="sidebar-title">THE CODE</div>
        <div class="sidebar-sub">Matrix Terminal • Learning Interface</div>
      </div>

      <div>
        <div class="sidebar-section-label">Categories</div>
        <ul class="sidebar-menu">
          ${categories.map(c => `
            <li>
              <a class="sidebar-link" href="${c.deepPage}">
                <span>${c.title}</span>
              </a>
            </li>
          `).join('')}
        </ul>
      </div>

      <div style="margin-top:auto;">
        <div class="sidebar-section-label">Quick</div>
        <ul class="sidebar-menu">
          <li><a class="sidebar-link" href="pages/pricing.html">Pricing</a></li>
          <li><a class="sidebar-link" href="pages/simulators.html">Simulators</a></li>
        </ul>
      </div>
    `;
  }

  // --- Handlers ---
  function setupHandlers() {
    document.addEventListener('click', (e) => {
      const explore = e.target.closest('[data-action="explore-courses"]');
      if (explore) {
        window.location.href = 'pages/courses.html';
        return;
      }
      const pricing = e.target.closest('[data-action="pricing"]');
      if (pricing) {
        window.location.href = 'pages/pricing.html';
        return;
      }
      const allLessons = e.target.closest('[data-action="all-lessons"]');
      if (allLessons) {
        window.location.href = 'pages/all-lessons.html';
        return;
      }
      const learnMore = e.target.closest('[data-action="learn-more"]');
      if (learnMore) {
        const cat = learnMore.dataset.cat;
        const category = categories.find(c => c.id === cat);
        window.location.href = category.deepPage;
        return;
      }
    });
  }

  // --- Inject content ---
  function inject() {
    $('intro-section').innerHTML = introHTML;
    $('lessons-section').innerHTML = lessonsHTML;
    $('microcontrollers-section').innerHTML = '';
    $('gain-section').innerHTML = '';
    $('footer').innerHTML = `<div class="footer"><span>© The Code — Matrix Interface</span></div>`;

    renderSidebar();
    setupHandlers();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
