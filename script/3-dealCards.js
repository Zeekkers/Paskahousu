// 3-dealCards.js
export default function dealCards() {
  return new Promise(resolve => {
    const pack     = Array.from(document.querySelectorAll("game-card")); // pohjassa on jo sekoitus tehtynä
    const footer   = document.querySelector("footer");
    const perHand  = 5;

    // pelaajalista: 'user' ensin, sitten botti1…bottiN
    const players = [
      "user",
      ...Array.from({ length: playerCount - 1 }, (_, i) => `computer${i + 1}`)
    ];

    // tallenna kortit muistiin pelaajakohtaisesti
    const hands = players.reduce((acc, p) => { acc[p] = []; return acc; }, {});

    const dealDelayStep = 300; // ms väli jokaisen kortin jaon välillä
    const moveDuration   = 500; // ms animaation kesto

    let dealCount = 0;
    // jaa round-robin: user → botti1 → botti2 → …
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
          card.style.transform  = player === "user"
            ? "translateY(200%)"
            : "translateY(-200%) rotateY(180deg)";

          // 3) append tai remove ja palauta transform
          setTimeout(() => {
            if (player === "user") {
              footer.appendChild(card);
            } else {
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
      globalThis.hands = hands
      resolve();
    }, totalTime);
  });
}
