export default function makeDraggable () {
    const footer = document.querySelector('footer');
    const slot = document.getElementById('slot');
    if (!footer || !slot) return;
  
    footer.querySelectorAll('game-card').forEach(card => {
      card.draggable = true;
      card.setAttribute('tabindex', '0');
    });
  
    // 2. Dragstart – asetetaan siirrettävä data ja ghost-kuva
    footer.addEventListener('dragstart', ev => {
      const card = ev.target.closest('game-card');
      if (!card) return;
  
      ev.dataTransfer.setData('text/plain', card.id);
      ev.dataTransfer.setDragImage(card, 0, 0);
      card.classList.add('dragging');
    });
  
    // 3. Dragend – poistetaan visuaalinen tila
    footer.addEventListener('dragend', ev => {
      const card = ev.target.closest('game-card');
      if (card) card.classList.remove('dragging');
    });
  
    // 4. Pudotusalue – dragover: salli pudotus ja korosta alue
    slot.addEventListener('dragover', ev => {
      ev.preventDefault(); // pakollinen, jotta drop sallitaan
    });
  
    slot.addEventListener('dragenter', ev => {
      if (ev.target === slot) {
        slot.classList.add('drag-over');
      }
    });
  
    slot.addEventListener('dragleave', ev => {
      if (ev.target === slot) {
        slot.classList.remove('drag-over');
      }
    });
  
    // 5. Drop – siirretään kortti DOMissa oikeaan paikkaan
    slot.addEventListener('drop', ev => {
      ev.preventDefault();
      const cardId = ev.dataTransfer.getData('text/plain');
      const card = document.getElementById(cardId);
      if (card) {
        slot.replaceWith(card)
          Object.assign(
              card.style,{
                  transition: "all 1s",
                  position: "absolute",
                  top: "0",
                  zIndex: "10",
                  left: "50%",
                  transform: "translate(-50%,0)",
                  width: "8%",
                  cursor: "none",
              })

              popCardFromHands(card)
      
        card.classList.remove('dragging');
      }
      slot.classList.remove('drag-over');
    });
  }
  