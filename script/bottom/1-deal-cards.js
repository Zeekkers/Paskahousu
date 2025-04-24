export function dealCards() {
  const pack = Array.from(document.querySelectorAll("game-card"));
  const footer = document.querySelector("footer");

  const selected = pickRandom(pack, 5);

  selected.forEach((card, i) => {
    const dealDelay = i * 500;     // Milloin kortti alkaa liikkua
    const moveDuration = 500;      // Kuinka kauan translateY kestää
    const appendDelay = dealDelay + moveDuration;
    const resetDelay = appendDelay + 250; // Pieni tauko ennen paluuanimaatiota

    // 1. Animaatio alas
    setTimeout(() => {
      card.style.transform = "translateY(100%)";
    }, dealDelay);

    // 2. Siirto footeriin
    setTimeout(() => {
      footer.appendChild(card);
    }, appendDelay);

    // 3. Paluu nollatilaan (footerissä)
    setTimeout(() => {
      card.style.transform = "translateY(0%) rotateY(0deg)";
    }, resetDelay);
  });
}


  function pickRandom(array, count) {
    const copy = [...array];
    const result = [];
  
    for (let i = 0; i < count && copy.length > 0; i++) {
      const index = Math.floor(Math.random() * copy.length);
      result.push(copy.splice(index, 1)[0]);
    }
  
    return result;
  }
  