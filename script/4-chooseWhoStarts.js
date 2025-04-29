export default function chooseWhoStarts() {
  return new Promise(resolve => {
    const rankOrder = ['3','4','5','6','7','8','9'];
    for (const rank of rankOrder) {

        // Kerää ja globalisoi pelaajat
        let players = Object.entries(hands).map(([player, cards]) => ({player}))
        globalThis.players = players.map(obj => obj.player)
         

        // Kerää pelaajat, joilla on kortteja kyseisellä arvolla
           let mappedPlayers = Object.entries(hands)
          .map(([Aloittaja, cards]) => ({
            Aloittaja,
            matching: cards.filter(c => c.getAttribute('card-rank') === rank)
          }))
          .filter(({ matching }) => matching.length > 0);


        if (mappedPlayers.length > 0) {
          // Jos useammalla, valitse se, jolla eniten ko. kortteja
          mappedPlayers.sort((a, b) => b.matching.length - a.matching.length);
          const { Aloittaja, matching } = mappedPlayers[0];
          // Otetaan yksi näistä elementeistä (esim. ensimmäinen)
        globalThis.firstPlay = matching[0];
        globalThis.starter = Aloittaja
  
          resolve(`${JSON.stringify({ Aloittaja, Kortti: firstPlay })}`);
          return;
        }
      }
      resolve(null);
    });
}
