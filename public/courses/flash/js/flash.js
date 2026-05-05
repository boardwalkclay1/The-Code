// from flash-data.js
// const flashDeck = [ ... ];

const termEl = document.getElementById("termText");
const meaningEl = document.getElementById("meaningText");
const tierLabelEl = document.getElementById("tierLabel");
const cardEl = document.querySelector(".flash-card");

// mode: "free" for Terminal 1/2, "paid" for full deck
let mode = "free"; // change to "paid" in your paid experience

function getDeckForMode() {
  if (mode === "free") {
    return flashDeck.filter(c => c.tier === "free");
  }
  return flashDeck; // paid sees everything
}

let currentIndex = 0;
let currentTimeout = null;

function showCard(index) {
  const deck = getDeckForMode();
  if (deck.length === 0) return;

  const card = deck[index % deck.length];

  // update label
  tierLabelEl.textContent = mode === "free" ? "TERMINAL" : "FULL ACCESS";

  // animate out, then in
  cardEl.classList.add("fade-out");
  setTimeout(() => {
    termEl.textContent = card.term;
    meaningEl.textContent = card.meaning;
    cardEl.classList.remove("fade-out");
  }, 200);

  // schedule next
  clearTimeout(currentTimeout);
  currentTimeout = setTimeout(() => {
    currentIndex = (currentIndex + 1) % deck.length;
    showCard(currentIndex);
  }, card.duration);
}

// start
showCard(currentIndex);
