const observerConfig = {
    childList: true,
    subtree: false,
    attributes: false
  };
  
  // Ei globaalia `pile`, vaan funktiossa joka kerta
  const observer = new MutationObserver((mutationsList) => {
    observer.disconnect();
    try {
      console.log("lisätty");
      gamePile(); // lisää uusi slot jos puuttuu
    } finally {
      const currentPile = document.getElementById("game");
      if (currentPile) observer.observe(currentPile, observerConfig);
    }
  });
  
  export default function gamePile() {
    const pile = document.getElementById("game");
  
    // Tarkista ettei tyhjää slottia jo ole
    const hasSlot = Array.from(pile.children).some(child => child.id === "slot");
    if (hasSlot) return;
  
    const slot = document.createElement("div");
    slot.id = "slot";
    pile.appendChild(slot);
  }
  
  // Käynnistä observer heti
  const pile = document.getElementById("game");
  if (pile) observer.observe(pile, observerConfig);
  