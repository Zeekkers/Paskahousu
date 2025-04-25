// 2-dealCards.js
export default (() => {
  return new Promise(resolve => {
    const pack = Array.from(document.querySelectorAll("game-card"));
    const footer = document.querySelector("footer");
    const selected = pickRandom(pack, 5);

    const dealDelay = 500;     // delay per card
    const moveDuration = 500;  // animation duration
    const resetPause = 250;    // odotus animaation jälkeen

    // Animoidaan ja siirretään kortit
    selected.forEach((card, i) => {
      const delayStart = i * dealDelay;
      const resetDelay = delayStart + moveDuration + resetPause;

      // 1) nosta kortti
      setTimeout(() => {
        card.style.transform = "translateY(100%)";
      }, delayStart);

      // 2) siirrä footeriin
      setTimeout(() => {
        footer.appendChild(card);
      }, delayStart + moveDuration);

      // 3) palauta nollatilaan
      setTimeout(() => {
        card.style.transform = "translateY(0%) rotateY(0deg)";
      }, resetDelay);
    });

    // 4) resolvaa vasta kun viimeinenkin animaatio on valmis
    const lastIndex = selected.length - 1;
    const totalTime = lastIndex * dealDelay + moveDuration + resetPause;
    setTimeout(resolve, totalTime);
  });
})();

// apufunktio
function pickRandom(array, count) {
  const copy = [...array];
  const result = [];
  for (let i = 0; i < count && copy.length > 0; i++) {
    const idx = Math.floor(Math.random() * copy.length);
    result.push(copy.splice(idx, 1)[0]);
  }
  return result;
}
