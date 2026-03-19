// modules/category-data.js
const CATEGORY_DATA = [
  {
    id: "websites",
    title: "Websites",
    description: "Learn to build cinematic, modern, responsive websites from scratch...",
    buildExamples: [
      "Business websites",
      "Portfolio sites",
      "E‑commerce stores",
      "Booking systems",
      "Custom dashboards",
      "Landing pages"
    ],
    workflows: [
      "Planning → Wireframing → Building → Deploying",
      "HTML → CSS → JavaScript → APIs",
      "Hosting, domains, and optimization"
    ],
    customization: [
      "Custom animations",
      "Custom forms",
      "Custom dashboards",
      "Custom themes",
      "Custom notifications"
    ],
    income: [
      "$500–$2,500 per website (beginner)",
      "$3,000–$10,000+ per website (intermediate)",
      "$15,000+ for full systems (advanced)"
    ],
    clayvontePromise:
      "I guide you step‑by‑step so you understand every workflow, every file, and every customization.",
    pricing: {
      single: 150,
      bundles: { two: 250, three: 350, four: 450 }
    },
    paywallUrl: "/pay/websites",        // paywall landing for Websites
    contentUrl: "/lessons/websites"     // protected content URL
  },

  {
    id: "apps",
    title: "Apps",
    description: "Learn to build real apps with authentication, databases, messaging...",
    buildExamples: [
      "Social apps",
      "Marketplace apps",
      "Booking apps",
      "Family apps",
      "Business tools",
      "Custom dashboards"
    ],
    workflows: [
      "Frontend → Backend → Database → Deployment",
      "Authentication, messaging, notifications",
      "APIs, cloud storage, and real‑time features"
    ],
    customization: [
      "Custom UI themes",
      "Custom APIs",
      "Custom push notifications",
      "Custom dashboards",
      "Custom user roles"
    ],
    income: [
      "$1,000–$5,000 per app (beginner)",
      "$6,000–$20,000 per app (intermediate)",
      "$25,000+ for full systems (advanced)"
    ],
    clayvontePromise:
      "I walk you through every workflow so you can build apps with confidence and clarity.",
    pricing: {
      single: 150,
      bundles: { two: 250, three: 350, four: 450 }
    },
    paywallUrl: "/pay/apps",
    contentUrl: "/lessons/apps"
  },

  {
    id: "microcontrollers",
    title: "Microcontrollers",
    description: "Learn to control sensors, cameras, lights, motors, and real‑world devices...",
    buildExamples: [
      "Smart home systems",
      "Security cameras",
      "Motion sensors",
      "LED systems",
      "Robotics",
      "Environmental monitors"
    ],
    workflows: [
      "Circuit → Code → Test → Deploy",
      "Sensors → Inputs → Outputs → Logic",
      "WiFi, Bluetooth, and automation"
    ],
    customization: [
      "Custom sensor logic",
      "Custom lighting patterns",
      "Custom camera triggers",
      "Custom automation rules",
      "Custom dashboards for control"
    ],
    income: [
      "$500–$2,000 per device system",
      "$3,000–$8,000 for smart home installs",
      "$10,000+ for business automation systems"
    ],
    clayvontePromise:
      "I help you understand every wire, every sensor, and every line of code.",
    pricing: {
      single: 150,
      bundles: { two: 250, three: 350, four: 450 }
    },
    paywallUrl: "/pay/microcontrollers",
    contentUrl: "/lessons/microcontrollers"
  },

  {
    id: "pentesting",
    title: "Pen Testing & Ethical Hacking",
    description: "Learn how hackers think, how systems get breached, and how to protect them...",
    buildExamples: [
      "Network scanners",
      "Password auditing tools",
      "WiFi testing tools",
      "Web vulnerability scanners",
      "Custom hacking scripts"
    ],
    workflows: [
      "Recon → Scanning → Exploitation → Reporting",
      "Linux, terminals, and automation",
      "Web, network, and device security"
    ],
    customization: [
      "Custom scripts",
      "Custom automation tools",
      "Custom dashboards",
      "Custom reporting tools"
    ],
    income: [
      "$50–$100/hr beginner audits",
      "$500–$2,000 per small business test",
      "$5,000–$20,000+ for full penetration tests"
    ],
    clayvontePromise:
      "I teach you the mindset, the tools, and the workflows so you understand everything clearly and safely.",
    pricing: {
      single: 150,
      bundles: { two: 250, three: 350, four: 450 }
    },
    paywallUrl: "/pay/pentesting",
    contentUrl: "/lessons/pentesting"
  }
];

export default CATEGORY_DATA;
