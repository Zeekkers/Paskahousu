const pictureCards = ['J', 'Q', 'K'];

export function getActiveRules(topCard) {
  const rank = topCard.getAttribute('card-rank');

  return {
    canUsePictureCards:  rank >= 8 || pictureCards.includes(rank) && !10,
    cantUsePictureCards: rank < 8,
    canAceMoveToBin:     pictureCards.includes(rank),
    canTenMoveToBin:     rank <= 9,
  };
}