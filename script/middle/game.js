// gameRules.js

const pictureCards = ['J', 'Q', 'K'];

/**
 * Muuntaa kortin rankin numeroksi:
 * 2–10 → vastaava luku,
 * J→11, Q→12, K→13, A→14
 */
function getRankValue(rank) {
  if (rank === 'A') return 14;
  if (pictureCards.includes(rank)) return pictureCards.indexOf(rank) + 11;
  const n = parseInt(rank, 10);
  return isNaN(n) ? 0 : n;
}

/**
 * Kokoaa pelipakan tilan ja palauttaa
 * neljään pääasialliseen sääntöön perustuvan objektin.
 * Jos neljä ylimmäistä korttia ovat samaa maata, pakka kaatuu.
 */
function updateGamePileRules() {
  const pile    = Array.from(document.querySelectorAll("game-card[zone='gamePile']"));
  const topCard = pile[pile.length - 1];
  const topFour = pile.slice(-4);

  // 1) Kaada pakka, jos neljä päällimmäistä samaa country-arvoa
  if (
    topFour.length === 4 &&
    topFour.every(c => c.getAttribute('country') === topFour[0].getAttribute('country'))
  ) {
    moveGameToBin();
    return null;
  }

  const rank = topCard.getAttribute('rank');
  const val  = getRankValue(rank);

  return {
    // Kuvakortteja (J/Q/K) voi pelata, kun päällimmäinen kortti on >= 8
    canUsePictureCards:  () => val >= 8,

    // Muut kortit (alle 8) eivät kuulu kuva­korttien sääntöön
    cantUsePictureCards: () => val < 8,

    // Ässä kaataa pinon vain jos päällimmäinen on kuvakortti (J/Q/K)
    canAceMoveToBin:     () => pictureCards.includes(rank),

    // Kymppi kaataa pinon vain jos päällimmäinen on 9 tai pienempi
    canTenMoveToBin:     () => val <= 9,
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



import { canPlaceCard } from './gameRules.js';

// Kuvakorttien määrittely (same as gameRules.js)
const pictureCards = ['J','Q','K'];

/**
 * Käsittele pelaajan kortin peliyritys.
 * @param {Element} cardEl - Klikattu <game-card> elementti
 */
function attemptPlayCard(cardEl) {
  const rank = cardEl.getAttribute('rank');
  let ruleKey;

  // 1) Valitse sääntö avaimella rankin mukaan
  if (pictureCards.includes(rank)) {
    // Kuvakortit (J/Q/K)
    ruleKey = 'canUsePictureCards';
  } else if (rank === 'A') {
    // Ässä kaataa vain kun päällimmäinen oli kuvakortti
    ruleKey = 'canAceMoveToBin';
  } else if (rank === '10') {
    // Kymppi kaataa kun päällimmäinen oli 9 tai alle
    ruleKey = 'canTenMoveToBin';
  } else {
    // Muut numerot alle 8
    ruleKey = 'cantUsePictureCards';
  }

  // 2) Tarkista sääntö
  const ok = canPlaceCard(ruleKey, cardEl);

  if (ok) {
    // 3a) Siirrä kortti peli-pakan DOMiin
    document
      .querySelector("game-card[zone='gamePile']")
      .appendChild(cardEl); // tai muu logiikka siirrolle

    console.log(`Kortti ${rank} pelattu.`);
  } else {
    // 3b) Estä ja näytä palaute
    console.warn(`Korttia ${rank} ei voi pelata nyt.`);
    showInvalidMoveFeedback(cardEl);
  }
}

// Esimerkki event-käsittelijä kädessä oleville korteille
document.querySelectorAll("game-card[zone='hand']").forEach(cardEl => {
  cardEl.addEventListener('click', () => attemptPlayCard(cardEl));
});
