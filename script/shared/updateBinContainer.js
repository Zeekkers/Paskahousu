export default function updateBinContainer() {
  const foldCards = Array.from(document.querySelectorAll("#fold game-card"));
  if (foldCards.length === 0) return;

  // Hae olemassa oleva bin
  const bin = document.getElementById("bin");
  if (!bin) return console.warn("Bin-container puuttuu.");

  const oldCards = Array.from(bin.querySelectorAll("game-card"));
  oldCards.forEach(card => card.remove());

  // Siirrä kortit binin sisään offseteillä
  foldCards.forEach((card, i) => {
    const offset = i * 1 / 2;
    card.style.transition = "all 0.4s ease";

  setTimeout(()=>{
    card.style.position = "absolute";
    card.style.top = `-${offset}px`;
    card.style.left = `-${offset}px`;
    card.style.transform = `rotateY(180deg)`;
    card.style.pointerEvents = "none";
  },100);
  
    bin.appendChild(card);
  });
}
