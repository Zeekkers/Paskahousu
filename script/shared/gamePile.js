const observerConfig = {
    childList: true,
    subtree: false,
    attributes: false
  };
  const pile = document.getElementById("game");

  const observer = new MutationObserver((mutationsList) => {
    observer.disconnect();
    try {
        gamePile();
    }
    finally {

    if(pile) observer.observe(pile, observerConfig)
    }
})

export default function gamePile() {
    const slot = document.createElement("div");
    slot.id = "slot"
    pile.appendChild(slot);

}