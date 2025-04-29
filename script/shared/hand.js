import { magneticPull } from "./magneticPull.js";
// 1) MutationObserver ja konfiguraatio valmiiksi
const observerConfig = {
  childList: true,     // kuuntelee append/remove lapsimuutoksia
  subtree: false,      // ei kuuntele syvemmälle
  attributes: false    // ei kuuntele attribuuttimuutoksia
};

const observer = new MutationObserver((mutationsList) => {
    observer.disconnect();
    try {
      playerHand();
    } finally {
      const hand = document.querySelector('player-hand');
      if (hand) observer.observe(hand, observerConfig);
    }
});

// 2) Varsinainen renderöintifunktio
export default function playerHand() {
  const hand = document.querySelector('player-hand');
  if (!hand) return;

const isMarker = document.getElementById("puller")

  if (!isMarker) {
  const marker = document.createElement('div');
  marker.id = "puller";
  Object.assign(marker.style, {
    position: "absolute",
    transition:    'all 1s ease',
    aspectRatio:   '2.5/3.5',
    width:         '8%',
    background:    'transparent',
    borderRadius:  '1vh',
    pointerEvents: 'none',
  });
  hand.appendChild(marker);
}
 
  globalThis.children = Array.from(hand.children);
  globalThis.dealPack    = Array.from(document.querySelectorAll("#pack game-card"));

let initialDealt = false
if (!initialDealt && children.length === 6) {
  initialDealt = true;
  console.log(initialDealt)
}

if (initialDealt && children.length < 6) {
  const missing = 6 - children.length;
  console.log(missing);
  console.log(dealPack);
  for (let i = 0; i < missing; i++) {
    console.log("Olet gay")
    const card = dealPack.pop();
    magneticPull(marker, card);
  }
}


  // Z-index
  children.forEach((div, i) => {
    div.style.zIndex = i;
  });

  // Jaa keskipala pois
  const [firstHalf, secondHalf] = splitIgnoringMiddle(children);

  // Parametrit
  const angle   = 1;
  const offsetY = 2;
  const offsetX = 20;

// Vasemmanpuoleiset
firstHalf.reverse().forEach((div, i) => {
  const tx  = -(offsetX * (i + 1));
  const ty  =  offsetY * (i + 2);
  const rot = -angle * (i + 0.33);
  const baseHover = `translate(${tx}px, ${ty}px) rotate(${rot - 10}deg)`;
  const base      = `translate(${tx}px, ${ty}px) rotate(${rot}deg)`;

  div.style.transform = base;
  addTrackedListener(div, "mouseenter", () => {
    div.style.transform = baseHover;
  });
  addTrackedListener(div, "mouseleave", () => {
    div.style.transform = base;
  });
});

// Oikeanpuoleiset
secondHalf.forEach((div, i) => {
  const tx  =  offsetX * (i + 1);
  const ty  =  offsetY * (i + 2);
  const rot =  angle * (i + 0.33);
  const baseHover = `translate(${tx}px, ${ty}px) rotate(-10deg)`;
  const base      = `translate(${tx}px, ${ty}px) rotate(${rot}deg)`;

  div.style.transform = base;
  addTrackedListener(div, "mouseenter", () => {
    div.style.transform = baseHover;
  });
  addTrackedListener(div, "mouseleave", () => {
    div.style.transform = base;
  });
});
}

// 3) Käynnistetään aluksi render ja observer
playerHand();
const handEl = document.querySelector('player-hand');
if (handEl) observer.observe(handEl, observerConfig);

// apufunktio
function splitIgnoringMiddle(arr) {
  const len = arr.length;
  if (len % 2 === 1) {
    const mid = Math.floor(len / 2);
    // siirretään keskimmäistä alaspäin
    arr[mid].style.transform = 'translateY(5%)';
    return [ arr.slice(0, mid), arr.slice(mid + 1) ];
  } else {
    const half = len / 2;
    return [ arr.slice(0, half), arr.slice(half) ];
  }
}
