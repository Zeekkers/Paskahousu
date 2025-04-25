// shuffle.js
export function shuffleCards() {
  const cards      = Array.from(document.querySelectorAll("game-card"));
  const zIndices   = cards.map((_, i) => i);
  const firstDelay = 100;    // ms ennen ensimmäistä siirtoa
  const firstDur   = 1000;   // ms transform-animaation kesto
  const secondDelay  = 1200; // ms ennen toinen liike
  const secondDur    = 600;  // ms flip-animaation kesto

  // 1) Fisher–Yates z-indekseille
  for (let i = zIndices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [zIndices[i], zIndices[j]] = [zIndices[j], zIndices[i]];
  }

  // 2) Aseta tyylit ja ajoita timeoutit
  cards.forEach((card, i) => {
    const angle = Math.random() * 20 - 10;
    const x     = Math.random() * 120 - 60;
    const y     = Math.random() *  80 - 40;

    card.style.transition = "all 1s";

    setTimeout(() => {
      card.style.zIndex    = zIndices[i];
      card.style.transform = `translate(${x}px, ${y}px) rotateZ(${angle}deg)`;
    }, firstDelay);

    setTimeout(() => {
      const offset = zIndices[i] / 4;
      card.style.transition = "transform 0.6s ease";
      card.style.transform  = `translate(${offset}px, -${offset}px) rotateZ(0deg) rotateY(180deg)`;
    }, secondDelay);
  });

  // 3) Palauta Promise, joka resolveaa vasta kun kaikki animaatiot on ajettu läpi
  const totalTime = secondDelay + secondDur; // 1200 + 600 = 1800ms
  return new Promise(resolve => setTimeout(resolve, totalTime));
}
