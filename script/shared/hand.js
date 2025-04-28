
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
export default async function playerHand() {
  const hand = document.querySelector('player-hand');
  if (!hand) return;


  // Lisätään puller
  const marker = document.createElement('div');
  marker.id = "puller";
  Object.assign(marker.style, {
    position: "absolute",
    transition:    'all 1s ease',
    aspectRatio:   '2.5/3.5',
    width:         '8%',
    background:    'transparent',
    borderRadius:  '1vh',
  });
  hand.appendChild(marker);


await delay(200)
 
  const children = Array.from(hand.children);




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
    div.addEventListener('mouseenter', () => div.style.transform = baseHover);
    div.addEventListener('mouseleave', () => div.style.transform = base);
  });

  // Oikeanpuoleiset
  secondHalf.forEach((div, i) => {
    const tx  =  offsetX * (i + 1);
    const ty  =  offsetY * (i + 2);
    const rot =  angle * (i + 0.33);
    const baseHover = `translate(${tx}px, ${ty}px) rotate(-10deg)`;
    const base      = `translate(${tx}px, ${ty}px) rotate(${rot}deg)`;

    div.style.transform = base;
    div.addEventListener('mouseenter', () => div.style.transform = baseHover);
    div.addEventListener('mouseleave', () => div.style.transform = base);
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
