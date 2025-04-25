// shuffle.js
export function shuffleCards() {
  const container   = document.getElementById("pack");
  const cards       = Array.from(container.querySelectorAll("game-card"));
  const zIndices    = cards.map((_, i) => i);
  const firstDelay  = 100;   // ms ennen ensimmäistä siirtoa
  const firstDur    = 1000;  // ms transform-animaation kesto
  const secondDelay = 1200;  // ms ennen toinen liike
  const secondDur   = 600;   // ms flip-animaation kesto

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

  // 3) Palauta Promise, ja odota animaatioiden loppuun ennen DOM-järjestystä
  const totalTime = secondDelay + secondDur; // 1200 + 600 = 1800ms
  return new Promise(resolve => {
    setTimeout(() => {
      // DOM-järjestyksen päivitys z-indexin mukaisesti
      const mapZ = new Map(cards.map((card, i) => [card, zIndices[i]]));
      cards
        .slice()
        .sort((a, b) => mapZ.get(a) - mapZ.get(b))
        .forEach(card => container.appendChild(card));
      resolve();
    }, totalTime);
  });
}
