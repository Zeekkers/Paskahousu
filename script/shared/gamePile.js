const observerConfig = {
    childList: true,
    subtree: false,
    attributes: false
  };
  
  // Ei globaalia `pile`, vaan funktiossa joka kerta
  const observer = new MutationObserver((mutationsList) => {
    observer.disconnect();
    try {
      gamePile(); // lisää uusi slot jos puuttuu
    } finally {
      const currentPile = document.getElementById("game");
      if (currentPile) observer.observe(currentPile, observerConfig);
    }
  });
  
  export default function gamePile() {
    const pile = document.getElementById("game");
    const children = Array.from(pile.children);
  
    const hasSlot = children.some(child => child.id === "slot");
    if (hasSlot) return;
  
    const slot = document.createElement("div");
    slot.id = "slot";
    pile.appendChild(slot);
  
    const folds = ['10', 'A'];
    const lastFour = children.filter(el => el.tagName === "GAME-CARD").slice(-4);
    const topCard = lastFour[lastFour.length - 1];
  
    const allSameRank =
      lastFour.length === 4 &&
      lastFour.every(el => el.getAttribute("card-rank") === lastFour[0].getAttribute("card-rank"));
  
      if (
        topCard &&
        (allSameRank || folds.includes(topCard.getAttribute("card-rank")))
      ) {
        import("./fold.js").then(m => m.default()).then(() => {
          import("./updateBinContainer.js").then(b => b.default());
        });
      }
      
    setTimeout(()=>{
    children.forEach( (child, i)=> {
      if (i !== 0) {
      const y = (i-1);
      child.style.transition= "all 0.1s"
      setTimeout(()=>{
      child.style.transform = `translate(-50%,-${y}px)`;
    },100);
      }
      }),100});
  }
  
  
  // Käynnistä observer heti
  const pile = document.getElementById("game");
  if (pile) observer.observe(pile, observerConfig);
  