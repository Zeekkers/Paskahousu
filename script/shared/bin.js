export default function updateBinContainer() {
  const cards = Array.from(document.querySelectorAll("#game game-card fold")); // esim. folded-luokka
  if (cards.length === 0) return;

  let bin = document.getElementById("bin");
  if (!bin) {
    bin = document.createElement("div");
    bin.id = "bin";
    document.body.appendChild(bin);
  }

  // Perusasettelu binille
  const refCard = cards[0];
  bin.style.position = "absolute";
  bin.style.left = `${refCard.offsetLeft + refCard.offsetWidth / 2}px`;
  bin.style.top = `${refCard.offsetTop}px`;
  bin.style.transform = "translate(-50%, 0)";
  bin.style.minWidth = `${refCard.offsetWidth}px`;
  bin.style.minHeight = `${refCard.offsetHeight}px`;
  bin.style.pointerEvents = "none";
  bin.style.zIndex = "10";

  // Siirrä folded-kortit binin sisään
  cards.forEach((card, i) => {
    const offset = i * 3;

    card.style.position = "absolute";
    card.style.top = `-${offset}px`;
    card.style.left = `-${offset}px`;
    card.style.transform = `rotateZ(${(i - 2) * 4}deg)`;
    card.style.transition = "all 0.3s ease";
    card.style.zIndex = `${i}`;
    card.classList.add("in-bin");

    bin.appendChild(card); // siirrä DOM:issa kortti binin sisään
  });

  // Animaatio koko binille
  bin.style.transition = "transform 0.4s ease";
  setTimeout(() => {
    bin.style.transform = "translate(-50%, -10px)";
  }, 150);
}
