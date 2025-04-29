export default function makeDraggable () {
    const footer = document.querySelector('footer');
    const gameBoard = document.getElementById('game');
    if (!footer || !gameBoard) return;
  
    // 1. Varmistetaan, että kaikki kortit ovat vedettävissä
    footer.querySelectorAll('game-card').forEach(card => {
      card.draggable = true;
      card.setAttribute('tabindex', '0'); // saavutettavuus: näppäimistötuki
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
    gameBoard.addEventListener('dragover', ev => {
      ev.preventDefault(); // pakollinen, jotta drop sallitaan
    });
  
    gameBoard.addEventListener('dragenter', ev => {
      if (ev.target === gameBoard) {
        gameBoard.classList.add('drag-over');
      }
    });
  
    gameBoard.addEventListener('dragleave', ev => {
      if (ev.target === gameBoard) {
        gameBoard.classList.remove('drag-over');
      }
    });
  
    // 5. Drop – siirretään kortti DOMissa oikeaan paikkaan
    gameBoard.addEventListener('drop', ev => {
      ev.preventDefault();
      const cardId = ev.dataTransfer.getData('text/plain');
      const card = document.getElementById(cardId);
      if (card) {
        gameBoard.appendChild(card);
        card.classList.remove('dragging');
      }
      gameBoard.classList.remove('drag-over');
    });
  }
  