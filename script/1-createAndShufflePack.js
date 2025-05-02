// 1-createAndShufflePack.js
import Card from '/script/shared/card.js';
import PlayerHand from '/script/shared/hand.js'
import { shuffleCards } from '/script/shared/shuffle.js';

const pack       = document.getElementById("pack");
const countries  = ['♠','♥','♦','♣'];
globalThis.cardRanks  = ['3','4','5','6','7','8','9','10','J','Q','K','A','2'];

export default async function createAndShufflePack ()  {
  // 1) Kerää kortit fragmenttiin ilman turhia reflowja
  const fragment = document.createDocumentFragment();
  for (const country of countries) {
    for (const rank of cardRanks) {
      const card = document.createElement('game-card');
      card.setAttribute('country', country);
      card.setAttribute('card-rank', rank);
      fragment.appendChild(card);
    }
  }

  // 2) Liitä DOM:iin kerralla
  pack.appendChild(fragment);

  // 3) Odota, että shuffleCards-animaatio valmistuu
  await shuffleCards();

  // 4) Odota vielä yksi frame, jotta selain ehtii piirtää lopullisen asennon
  await new Promise(r => requestAnimationFrame(r));
}
