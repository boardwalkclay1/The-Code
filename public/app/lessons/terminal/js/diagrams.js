// public/app/lessons/terminal/js/diagrams.js

export const Diagrams = {
  web: `
[ WEB STACK ]

  browser
    ↓
  html  →  css  →  js
    ↓
  ui  →  logic  →  data

  request  →  response
  client   →  server
`,

  apps: `
[ APP ARCHITECTURE ]

  screen
    ↓
  ui layer
    ↓
  state / routing
    ↓
  api calls
    ↓
  storage

  one flow:
  tap → event → state → api → render
`,

  mcu: `
[ MCU FLOW ]

  sensor input
      ↓
   adc / read
      ↓
   logic loop
      ↓
   pwm / output
      ↓
   motor / actuator

  code runs in tight loops, not big frameworks.
`,

  hacking: `
[ HACKING VIEW ]

  surface:
    • login
    • forms
    • api
    • files

  paths:
    • input → validation → storage
    • auth → session → actions

  you look for:
    • where checks are missing
    • where data is trusted too early
`,

  automation: `
[ AUTOMATION PIPELINE ]

  trigger
    ↓
  input data
    ↓
  transform / clean
    ↓
  actions (email, db, api)
    ↓
  log / report

  design once → runs many times.
`,

  github: `
[ GITHUB FLOW ]

  working dir
    ↓
  git add
    ↓
  git commit
    ↓
  git push
    ↓
  pull request
    ↓
  review / merge

  history is the real product.
`,

  bash: `
[ BASH MENTAL MAP ]

  pwd   → where am i
  ls    → what is here
  cd    → move
  cat   → read
  tail  → watch
  grep  → find

  small commands, chained with pipes.
`,

  widgets: `
[ WIDGET SYSTEM ]

  widget:
    • input
    • display
    • actions

  many widgets:
    • dashboard
    • terminal panels
    • overlays

  one design → reused everywhere.
`,

  tools: `
[ TOOLS ECOSYSTEM ]

  problem
    ↓
  tiny tool
    ↓
  saves time
    ↓
  becomes part of your workflow

  many tools:
    • checkers
    • converters
    • generators
`,

  flash: `
[ FLASH LEARNING LOOP ]

  burst:
    • term
    • diagram
    • code fragment

  cycle:
    see → recall → reinforce

  short, sharp, repeatable.
`,

  games: `
[ GAMES AS PRACTICE ]

  scenario
    ↓
  constraint (time, info)
    ↓
  decision
    ↓
  feedback

  repeat until instinctive.
`
};
