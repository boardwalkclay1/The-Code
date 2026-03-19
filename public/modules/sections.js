// modules/sections.js
// FINAL MATRIX VERSION — no light theme, no inline CSS, no overrides

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
      link: 'lessons.html?category=websites'
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
      link: 'lessons.html?category=apps'
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
      link: 'lessons.html?category=microcontrollers'
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
      link: 'lessons.html?category=cybersecurity'
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
        <a class="bubble-button" href="lessons.html">All Lessons</a>
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
          <a class="lesson-button" href="${cat.link}">Start ${cat.title}</a>
          <button class="lesson-button" data-action="learn-more" data-cat="${cat.id}" style="margin-left:8px;">Learn More</button>
        </div>
      </article>
    `).join('');
  }

  // --- Pricing ---
  const pricingHTML = `
    <div class="section-block" id="pricing-block">
      <h3 class="section-title">Pricing</h3>
      <p class="section-text">One‑time fee per category. Bundle for discounts.</p>
      <table style="width:100%;margin-top:8px;border-collapse:collapse;">
        <tr><td style="padding:6px;border-bottom:1px solid rgba(0,255,65,0.08)"><strong>Single category</strong></td><td style="padding:6px;border-bottom:1px solid rgba(0,255,65,0.08)">$150</td></tr>
        <tr><td style="padding:6px;border-bottom:1px solid rgba(0,255,65,0.08)"><strong>Any 2 categories</strong></td><td style="padding:6px;border-bottom:1px solid rgba(0,255,65,0.08)">$250</td></tr>
        <tr><td style="padding:6px;border-bottom:1px solid rgba(0,255,65,0.08)"><strong>Any 3 categories</strong></td><td style="padding:6px;border-bottom:1px solid rgba(0,255,65,0.08)">$350</td></tr>
        <tr><td style="padding:6px;"><strong>All 4 categories</strong></td><td style="padding:6px;">$450</td></tr>
      </table>

      <div style="margin-top:12px;">
        <label style="display:block;margin-bottom:6px;">Select categories:</label>
        <div class="tag-row" id="bundle-checkboxes">
          ${categories.map(c => `<label class="tag"><input type="checkbox" class="bundle-checkbox" value="${c.id}" style="margin-right:6px;"> ${c.title}</label>`).join('')}
        </div>
        <div style="margin-top:10px;">Selected: <strong id="bundle-count">0</strong> — Price: <strong id="bundle-price">$0</strong></div>
        <div style="margin-top:10px;">
          <button id="bundle-continue" class="bubble-button" disabled>Proceed to Checkout</button>
        </div>
      </div>
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
              <a class="sidebar-link" href="${c.link}">
                <span>${c.title}</span>
              </a>
            </li>
          `).join('')}
        </ul>
      </div>

      <div style="margin-top:auto;">
        <div class="sidebar-section-label">Quick</div>
        <ul class="sidebar-menu">
          <li><a class="sidebar-link" href="checkout.html">Pricing</a></li>
          <li><a class="sidebar-link" href="simulators.html">Simulators</a></li>
        </ul>
      </div>
    `;
  }

  // --- Bundle logic ---
  function setupBundleLogic() {
    const checkboxes = Array.from(document.querySelectorAll('.bundle-checkbox'));
    const countEl = $('bundle-count');
    const priceEl = $('bundle-price');
    const proceedBtn = $('bundle-continue');

    function computePrice(n) {
      if (n === 0) return 0;
      if (n === 1) return 150;
      if (n === 2) return 250;
      if (n === 3) return 350;
      if (n === 4) return 450;
      return 150 * n;
    }

    function update() {
      const selected = checkboxes.filter(cb => cb.checked).map(cb => cb.value);
      const n = selected.length;
      const price = computePrice(n);
      countEl.textContent = n;
      priceEl.textContent = `$${price}`;
      proceedBtn.disabled = n === 0;
      proceedBtn.dataset.selected = selected.join(',');
    }

    checkboxes.forEach(cb => cb.addEventListener('change', update));
    update();

    proceedBtn.addEventListener('click', () => {
      const selected = proceedBtn.dataset.selected || '';
      window.location.href = `checkout.html?categories=${encodeURIComponent(selected)}`;
    });
  }

  // --- Handlers ---
  function setupHandlers() {
    document.addEventListener('click', (e) => {
      const explore = e.target.closest('[data-action="explore-courses"]');
      if (explore) {
        window.location.href = 'lessons.html';
        return;
      }
      const pricing = e.target.closest('[data-action="pricing"]');
      if (pricing) {
        const pricingBlock = $('pricing-block');
        if (pricingBlock) pricingBlock.scrollIntoView({ behavior: 'smooth' });
        return;
      }
      const learnMore = e.target.closest('[data-action="learn-more"]');
      if (learnMore) {
        const cat = learnMore.dataset.cat;
        window.location.href = `lessons.html?category=${encodeURIComponent(cat)}`;
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
    setupBundleLogic();
    setupHandlers();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
