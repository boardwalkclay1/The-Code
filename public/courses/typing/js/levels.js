// js/levels.js

const TYPING_LEVELS = [
  {
    id: 1,
    title: "Level 1 – Boot Sequence",
    text: `The terminal wakes with a soft glow as the system boots into a minimal shell. You rest your fingers on the keyboard, ready to test your typing against simple commands and quiet prompts. Today is about rhythm, not speed. You type echo hello world and watch the text appear, clean and precise. Each letter is a tiny handshake with the machine. No hacking yet, just learning to trust your hands, to keep a steady pace, and to correct mistakes without panic. The console does not judge; it only reflects what you send.`
  },
  {
    id: 2,
    title: "Level 2 – First Commands",
    text: `You open a fresh session and begin exploring the filesystem like a new city at night. Commands like ls, cd, and pwd become street signs guiding your path. You type carefully, watching for stray characters that break the flow. A missing slash or extra space can send you somewhere unexpected. The goal is not to rush but to build muscle memory, letting your fingers remember patterns before your mind does. Each accurate line feels like a small exploit against confusion, a quiet victory over hesitation and noise.`
  },
  {
    id: 3,
    title: "Level 3 – Config Files",
    text: `Now you scroll through configuration files, lines of text that shape how the system behaves. You practice typing options, flags, and paths with deliberate focus. A single typo in a config can lock you out or open a door you never meant to touch. You repeat phrases like enable_logging true and auth_mode secure until they feel natural. The keyboard becomes a control panel, and you are learning every switch. Precision matters more than speed, but speed will grow from precision. Every correct character is another bit flipped in your favor.`
  },
  {
    id: 4,
    title: "Level 4 – Simple Scripts",
    text: `You begin writing tiny scripts that automate boring tasks. A loop here, a condition there, and suddenly the machine feels more alive. You type variables, function names, and comments that explain your intent. The script prints status messages like scanning ports and checking hashes, mimicking the tools of seasoned hackers. You are not breaking into anything; you are breaking down complexity into simple steps. Typing becomes a way to think, each keystroke a decision. The more you practice, the less you look at the keyboard, trusting your hands to follow the logic.`
  },
  {
    id: 5,
    title: "Level 5 – Debugging Output",
    text: `The screen fills with logs, timestamps, and cryptic error codes. You copy fragments into your editor, retyping them to understand what they mean. Messages like unauthorized access attempt and invalid token format appear in the stream. You practice typing them exactly, respecting every colon, bracket, and dash. Debugging is a form of investigation, and your accuracy is your flashlight. When you retype a stack trace without mistakes, you see patterns more clearly. The better you handle noisy output, the easier it becomes to spot the one line that truly matters.`
  },
  {
    id: 6,
    title: "Level 6 – API Keys and Tokens",
    text: `You now handle long strings that look like encrypted secrets, even when they are only practice. You type fake API keys, session identifiers, and hashed values with care. These sequences demand focus because they lack familiar words or rhythm. One wrong character can invalidate the entire token. You imagine protecting real systems, where such keys guard private data and critical services. Typing them correctly is an exercise in discipline. You breathe, slow your pace, and let your eyes guide your hands. Accuracy under pressure is the skill that separates guesswork from control.`
  },
  {
    id: 7,
    title: "Level 7 – Network Scans",
    text: `Your practice terminal now simulates network scans, listing ports, protocols, and addresses. You type commands that resemble nmap scans, ping sweeps, and traceroute paths. Lines like probing host, analyzing response, and logging open ports scroll by. You retype them, keeping punctuation and spacing exact. The language of networks is dense but predictable once you learn its patterns. Each accurate line feels like mapping another part of an invisible city. You are training your fingers to keep up with the pace of flowing data, staying calm even when the output looks chaotic.`
  },
  {
    id: 8,
    title: "Level 8 – Encryption Notes",
    text: `You write notes about encryption, ciphers, and keys, turning complex ideas into clear sentences. You type phrases like symmetric key exchange, public key infrastructure, and secure channel negotiation. These words are longer and more technical, pushing your accuracy and endurance. You imagine designing a secure protocol, where every detail matters. Typing becomes a rehearsal for explaining difficult concepts to others. The better you can type them, the better you can think through them. Your speed rises quietly as your confidence grows, one correctly spelled term at a time.`
  },
  {
    id: 9,
    title: "Level 9 – Exploit Walkthrough",
    text: `You now follow a fictional exploit walkthrough, step by step, purely for practice. The text describes finding a vulnerable service, crafting a payload, and monitoring logs for unusual behavior. You type sentences like the attacker injects code into the input field and the defender patches the endpoint quickly. The story reminds you that hacking is not magic; it is careful observation and precise action. Your typing mirrors that precision. You keep your posture relaxed, your breathing steady, and your focus sharp. Each paragraph you complete without major errors feels like securing another layer of your own skills.`
  },
  {
    id: 10,
    title: "Level 10 – Secure Coding Guidelines",
    text: `You study secure coding guidelines that read like a shield for your future projects. You type rules such as validate all input, escape user data, and never store passwords in plain text. The sentences grow longer, combining ideas about authentication, authorization, and logging. You practice typing them until they feel instinctive. Secure code begins with secure habits, and your keyboard is where those habits form. As you maintain accuracy, your speed starts to feel natural rather than forced. You are not just learning to type; you are learning to think like a careful engineer.`
  },
  {
    id: 11,
    title: "Level 11 – Code Unlock Protocol",
    text: `This level introduces a secret training protocol called code unlock, a phrase you will see again as you advance. The scenario describes a locked system that only responds to precise commands and clean syntax. You type instructions like initiate code unlock sequence and verify access token integrity with full attention. Any typo means the simulated gateway remains closed. The text reminds you that real systems can be just as strict, accepting only exact input. As you repeat the phrase code unlock, you connect accuracy with progress. Your fingers learn that every character is a key, and only the right keys open doors.`
  },
  {
    id: 12,
    title: "Level 12 – Incident Report",
    text: `You now type a fictional incident report describing a detected intrusion and the response that followed. The narrative includes timestamps, affected services, and mitigation steps. You write lines like the security team isolated the compromised node and forensic logs were archived for review. The language is formal and detailed, demanding careful attention to spelling and punctuation. Incident reports must be clear because others rely on them to understand what happened. As you type, you imagine being the one who documents the story accurately under pressure. Your growing speed makes it easier to keep up with your thoughts.`
  },
  {
    id: 13,
    title: "Level 13 – Red Team Briefing",
    text: `This level simulates a red team briefing, outlining a planned assessment of a target environment. You type descriptions of reconnaissance, social engineering tests, and controlled exploitation. Phrases like the objective is to reveal weaknesses before real attackers do and findings will guide future defenses appear throughout the text. The vocabulary is dense, mixing technical and strategic language. You maintain accuracy while your pace increases, proving you can handle complex material. The more you practice, the more natural it feels to translate ideas into keystrokes without hesitation or fear of mistakes.`
  },
  {
    id: 14,
    title: "Level 14 – Blue Team Playbook",
    text: `You switch perspectives and type from the viewpoint of a blue team defending critical systems. The playbook describes monitoring dashboards, tuning alerts, and responding to suspicious activity. You type sentences like analysts correlate events across logs and automated rules block known malicious patterns. The text emphasizes collaboration, communication, and continuous improvement. Your fingers move faster now, but you still respect every comma and period. Defense is about consistency, and your typing practice mirrors that mindset. Each accurate paragraph feels like reinforcing a digital wall, brick by brick, line by line.`
  },
  {
    id: 15,
    title: "Level 15 – Master Console",
    text: `In the final level, you imagine sitting at a master console overseeing a vast network of systems. Streams of data flow past as you type commands to deploy patches, rotate keys, and update access policies. The narrative blends offense and defense, reminding you that true mastery means understanding both. You type phrases like secure channels established, unauthorized attempts blocked, and audit trail verified without slowing down. Your speed and accuracy now work together, letting you focus on meaning instead of mechanics. The course ends, but the practice can continue as long as you choose to keep unlocking your own potential.`
  }
];
