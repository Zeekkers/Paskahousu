export function checkCardAgainstRules(attemptCard, activeRules, activeRank) {
  const rank = attemptCard.getAttribute('card-rank');

  const topCard = document.querySelector('#game game-card:last-of-type');

  const pictureCardRanks = ['J', 'Q', 'K']
  const isPicture = pictureCardRanks.includes(rank);
  const isAce = rank === 'A';
  const isTenOrLess = Number(rank) <= 9;
  const isTen = Number(rank) === 10;
  const isTwo = Number(rank) === 2;
  const isLessThanOrEqualToSelf = Number(rank) >= Number(activeRank)
  const canOnlyPlayTwo = activeRank === '2'
  let attemptPictureIsValid
  
  if (isPicture){
  const indexOfRank = pictureCardRanks.indexOf(rank)
  const indexOfActiveRank = pictureCardRanks.indexOf(activeRank)
  attemptPictureIsValid = indexOfRank >= indexOfActiveRank;
  }

  if (!topCard) {
      const matches = {
    ace:     true,
    pictureCard:  true,
    ten:  true,
    number:     true,
    two: true
  };
  const isValid = Object.values(matches).some(Boolean);

    return {
    matches,
    isValid,
  };
  }
  const matches = {
    ace:     activeRules.canAceMoveToBin  && isAce && !canOnlyPlayTwo,
    pictureCard:  activeRules.canUsePictureCards  && isPicture && attemptPictureIsValid && !canOnlyPlayTwo,
    ten:  activeRules.canTenMoveToBin && isTen && !canOnlyPlayTwo,
    number:     activeRules.canTenMoveToBin && isLessThanOrEqualToSelf && isTenOrLess && !canOnlyPlayTwo,
    two: isTwo && !['10', 'A'].includes(activeRank) && canOnlyPlayTwo
  };

  const isValid = Object.values(matches).some(Boolean);

  return {
    matches,
    isValid,
  };
}
