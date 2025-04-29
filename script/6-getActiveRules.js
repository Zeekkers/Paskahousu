const pictureCards = ['J', 'Q', 'K'];

export default function getActiveRules() {
  return new Promise (resolve => {
  delay(600).then(()=> {
  const topCard = document.querySelector('#game game-card');
  const rank = topCard.getAttribute('card-rank');

  let activeRules = {
    canUsePictureCards:  rank >= 8 || pictureCards.includes(rank) && !10,
    cantUsePictureCards: rank < 8,
    canAceMoveToBin:     pictureCards.includes(rank),
    canTenMoveToBin:     rank <= 9,
  }

  globalThis.activeRules = activeRules;
  globalThis.activeRank = rank

  resolve();
})
});
}