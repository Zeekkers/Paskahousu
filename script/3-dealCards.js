// 3-dealCards.js
import { magneticPull } from "./shared/magneticPull.js";

export default function dealCards() {
  return new Promise(resolve => {
    const pack     = Array.from(document.querySelectorAll("game-card")); // pohjassa on jo sekoitus tehtynä
    const cardHand   = document.querySelector("player-hand");
    const perHand  = 5;

    // pelaajalista: 'user' ensin, sitten botti1…bottiN
    const players = [
      "user",
      ...Array.from({ length: playerCount - 1 }, (_, i) => `computer${i + 1}`)
    ];

    // tallenna kortit muistiin pelaajakohtaisesti
    const hands = players.reduce((acc, p) => { acc[p] = []; return acc; }, {});

    const dealDelayStep = 500; // ms väli jokaisen kortin jaon välillä
    const moveDuration   = 500; // ms animaation kesto

    let dealCount = 0;
    for (let round = 0; round < perHand; round++) {
      for (let pi = 0; pi < players.length; pi++) {
        const player    = players[pi];
        const delayStart = dealCount * dealDelayStep;

        setTimeout(() => {
          // 1) ota pakasta aina päällimmäinen kortti
          const card = pack.pop();
          hands[player].push(card);

          // 2) animointi: user alas, botit ylös
          card.style.transition = `transform ${moveDuration}ms ease`;
          if (player !== "user") {
          card.style.transform  = "translateY(-600%) rotateY(180deg)";
          } else {
            let puller = document.querySelector("#puller")
            let pulled = card
            setTimeout(()=>{
        magneticPull(puller,pulled)
            },500)
          }

          // 3) append tai remove ja palauta transform
          setTimeout(() => {
            if (player !== "user") {
              card.remove();
            }
              card.style.transform = "translateY(0%) rotateY(0deg)";
          }, moveDuration);
        }, delayStart);

        dealCount++;
      }
    }

    // 4) kun viimeinen animaatio on valmis, logataan bottien kädet ja resolve
    const totalTime = dealCount * dealDelayStep + moveDuration;
    setTimeout(() => {
      sessionStorage.setItem("hands", hands)
      globalThis.hands = hands || sessionStorage.getItem("hands")
      globalThis.popCardFromHands = function(cardElement) {
        for (const [player, hand] of Object.entries(hands)) {
          const index = hand.indexOf(cardElement);
          if (index !== -1) {
            hand.splice(index, 1);
            return player;
          }
        }
        console.warn("[HANDS] Korttia ei löytynyt käsistä:", cardElement);
        return null;
      };
      resolve();
    }, totalTime);
  });
}
