const pictureCards = ['J', 'Q', 'K'];


export function updateGamePileRules() {
  const pile = Array.from(document.querySelectorAll("game-card"));
  const topCard = pile.at(-1);
  const topFour = pile.slice(-4);

  // 1) Kaada pakka, jos neljä päällimmäistä samaa kortti-arvoa
  if (topFour.every(c => c.getAttribute('card-rank') === topFour[0].getAttribute('card-rank'))) {return null;}

  const rank = topCard.getAttribute('card-rank');
 console.log(rank)
 if (rank === 'A') { return null}

  return {
    canUsePictureCards:  () => rank >= 8,

    cantUsePictureCards: () => rank < 8,

    canAceMoveToBin:     () => pictureCards.includes(rank),

    canTenMoveToBin:     () => rank <= 9,
  };
}

/**
 * Tarkistaa, voiko ruleKey:n mukainen toimenpide tapahtua.
 * @param {'canUsePictureCards'|'cantUsePictureCards'|'canAceMoveToBin'|'canTenMoveToBin'} ruleKey
 * @returns {boolean}
 */
export function canPlaceCard(ruleKey) {
  const rules = updateGamePileRules();
  if (!rules) return false;
  const fn = rules[ruleKey];
  return typeof fn === 'function' ? fn() : false;
}
