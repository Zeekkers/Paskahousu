import { checkCardAgainstRules } from "./checkCardAgainstRules.js";
import { magneticPull } from "./magneticPull.js";

const cardRanks = ['3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A', '2'];

export default async function bot(instance) {
  const validCards = hands[instance].filter(card => {
    const result = checkCardAgainstRules(card, activeRules, activeRank);
    return result.isValid === true;
  });

  console.log('Valid cards for', instance, validCards);

  if (validCards.length === 0) {
    console.log('No valid cards.');
    return;
  }

  // 🔍 Valitaan pienin kortti
  let bestCard = validCards[0];
  let bestRankIndex = cardRanks.indexOf(bestCard.getAttribute('card-rank'));

  for (let i = 1; i < validCards.length; i++) {
    const card = validCards[i];
    const rank = card.getAttribute('card-rank');
    const rankIndex = cardRanks.indexOf(rank);

    if (rankIndex < bestRankIndex) {
      bestCard = card;
      bestRankIndex = rankIndex;
    }
  }

  console.log('Best card to play:', bestCard);

  // ⏳ Odotetaan että #slot ilmestyy DOMiin
  const slot = await new Promise(resolve => {
    const tryFind = () => {
      const el = document.getElementById("slot");
      if (el) return resolve(el);
      requestAnimationFrame(tryFind);
    };
    tryFind();
  });

  // 🧩 Lisätään kortti DOMiin ja asetetaan alkutyylit
  document.body.appendChild(bestCard);
  Object.assign(bestCard.style, {
    transition: "all 0.5s",
    position: "fixed",
    top: "-100%",
    left: "50%",
    transform: "translate(-50%, 0%)"
  });

  // 🧲 Suoritetaan magneticPull-animaatio
  await magneticPull(slot, bestCard);

  // 🎯 Viimeistelyanimaatio
  Object.assign(bestCard.style, {
    transition: "all 1s",
    position: "absolute",
    top: "0",
    left: "50%",
    transform: "translate(-50%, 0%)",
    width: "8%"
  });
}
