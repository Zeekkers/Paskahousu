import Card from '/script/card.js';
import { shuffleCards } from '../shuffle.js';

const pack = document.getElementById("pack");

const countries = ['♠','♥','♦','♣'];
const cardRanks = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];

export function createPack() {
 for (const country of countries) {
  for (const rank of cardRanks) {
    const card = document.createElement('game-card');
    card.setAttribute('country', country);
    card.setAttribute('card-rank', rank);
    pack.appendChild(card);
  }
}
shuffleCards();
}

