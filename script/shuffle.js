// shuffleCards.js

export function shuffleCards() {
  const unShuffled = Array.from(document.querySelectorAll("game-card"));
  const zIndices = unShuffled.map((_, i) => i);

  // Fisher–Yates shuffle z‐indekseille
  for (let i = zIndices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [zIndices[i], zIndices[j]] = [zIndices[j], zIndices[i]];
  }

  unShuffled.forEach((card, i) => {
    const angle = Math.random() * 20 - 10;
    const x     = Math.random() * 120 - 60;
    const y     = Math.random() *  80 - 40;

    // 1) Satunnaisasettelu
    card.style.transition = "all 1s";
    setTimeout(() => {
      card.style.zIndex    = zIndices[i];
      card.style.transform = `translate(${x}px, ${y}px) rotateZ(${angle}deg)`;
    }, 100);

    // 2) Flip & pino lopuksi
    setTimeout(() => {
      let offset = `${zIndices[i]/4}`;
      card.style.transition = "transform 0.6s ease";
      card.style.transform  = `translate(${offset}px, -${offset}px) rotateZ(0deg) rotateY(180deg)`;
    }, 1200);
  });
}
