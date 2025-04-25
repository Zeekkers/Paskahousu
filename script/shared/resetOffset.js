// resetOffset.js
export function resetOffset() {
    const cards      = Array.from(document.querySelectorAll("#pack game-card"));
    const zIndices   = cards.map((_, i) => i);
    const firstDelay = 100;    // ms ennen ensimmäistä siirtoa
    const firstDur   = 300;   // ms transform-animaation kesto
    const secondDelay  = 400; // ms ennen toinen liike
    const secondDur    = 300;  // ms flip-animaation kesto
  
    // 1) Fisher–Yates z-indekseille
    for (let i = zIndices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [zIndices[i], zIndices[j]] = [zIndices[j], zIndices[i]];
    }
  
    // 2) Aseta tyylit ja ajoita timeoutit
    cards.forEach((card, i) => {
  
      card.style.transition = "tranform 0.3s ease";
  
      setTimeout(() => {
        card.style.zIndex    = zIndices[i];
        card.style.transform = `translate(0, 0) rotateY(180deg)`;
      }, firstDelay);
  
      setTimeout(() => {
        const offset = zIndices[i] / 4;
        card.style.transform  = `translate(${offset}px, -${offset}px) rotateZ(0deg) rotateY(180deg)`;
      }, secondDelay);
    });
  
    // 3) Palauta Promise, joka resolveaa vasta kun kaikki animaatiot on ajettu läpi
    const totalTime = secondDelay + secondDur; // 1200 + 600 = 1800ms
    return new Promise(resolve => setTimeout(resolve, totalTime));
  }
  