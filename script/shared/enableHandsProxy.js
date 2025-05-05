import { magneticPull } from "./magneticPull.js";

const moveDuration = 500;
const drawPile = Array.from(document.querySelectorAll("#pack game-card"));

function drawCard() {
  return drawPile.length > 0 ? drawPile.pop() : null;
}

function animateCardToHand(card, player) {
  if (player === "user") {
    const puller = document.getElementById("puller");
    if (puller) {
      setTimeout(() => {
        magneticPull(puller, card);
      }, 500);
    }
  } else {
    card.style.transform = "translateY(-600%) rotateY(180deg)";
    setTimeout(() => {
      card.remove();
      card.style.transform = "translateY(0%) rotateY(0deg)";
    }, moveDuration);
  }
}

function fillToFive(array, playerKey) {
  while (array.length < 5 && drawPile.length > 0) {
    const card = drawCard();
    if (card) {
      array.push(card);
      animateCardToHand(card, playerKey);
    }
  }
}

export default function enableHandsProxy() {
  if (!globalThis.hands) throw new Error("globalThis.hands is not defined");

  globalThis.hands = new Proxy(globalThis.hands, {
    get(target, prop) {
      if (Array.isArray(target[prop])) {
        if (target[prop].length < 5) {
          fillToFive(target[prop], prop);
          // Päivitä sessionStorage aina kun käsi täytetään
          sessionStorage.setItem('hands', JSON.stringify(target));
        }
        return target[prop];
      }
      return undefined;
    },
    set(target, prop, value) {
      if (Array.isArray(value)) {
        target[prop] = value;
        if (value.length < 5) {
          fillToFive(value, prop);
        }
      } else {
        target[prop] = value;
      }

      // fallback-varmistus kaikille käsille
      for (const key of Object.keys(target)) {
        const hand = target[key];
        if (Array.isArray(hand) && hand.length < 5) {
          fillToFive(hand, key);
        }
      }

      // Päivitä sessionStorage aina kun hands-proxyn set-metodi aktivoituu
      sessionStorage.setItem('hands', JSON.stringify(target));
      return true;
    }
  });
}
