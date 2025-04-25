export function checkCardAgainstRules(attemptCard, activeRules, activeRank) {
  const rank = attemptCard.getAttribute('card-rank');
  console.log("rank:", rank);

  const isPicture = ['J', 'Q', 'K'].includes(rank);
  console.log(isPicture)
  const isAce = rank === 'A';
  const isTenOrLess = Number(rank) <= 9;
  const isTen = Number(rank) === 10;
  const isTwo = Number(rank) === 2;
  const isLessThanOrEqualToSelf = Number(rank) >= Number(activeRank)
  console.log(`[PienempiTaiSamaKuinItse]${isLessThanOrEqualToSelf},${rank},${activeRank}`)

  const matches = {
    ace:     activeRules.canAceMoveToBin     && isAce,
    pictureCard:  activeRules.canUsePictureCards  && isPicture,
    ten:  activeRules.canTenMoveToBin && isTen,
    number:     activeRules.canTenMoveToBin && isLessThanOrEqualToSelf && isTenOrLess && !isTwo,
    two: isTwo && !['10', 'A'].includes(activeRank)
  };

  const isValid = Object.values(matches).some(Boolean);

  return {
    matches,
    isValid,
  };
}
