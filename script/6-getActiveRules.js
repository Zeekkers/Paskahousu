import playFirstCard from "./5-playFirstCard.js";

const pictureCards = ['J', 'Q', 'K'];

export default function getActiveRules() {
  return new Promise(resolve => {
    // 1) Viive pelin rytmittämiseksi
    delay(600).then(() => {
      
      // 2) Haetaan viimeisin kortti
      const topCard = document.querySelector('#game game-card:last-of-type');
      
      // 2a) Jos ei korttia, käytetään oletussääntöjä ja palautetaan ne heti
      if (!topCard) {
        const defaultRules = {
          canUsePictureCards:  false,
          cantUsePictureCards: false,
          canAceMoveToBin:     false,
          canTenMoveToBin:     false,
        };
        globalThis.activeRules = defaultRules;
        globalThis.activeRank  = null;
        resolve();
        return; // Early return säästää turhia vertailuja ja alustusoperaatioita
      }
      
      // 3) Luetaan kortin arvo
      const rankAttr = topCard.getAttribute('card-rank'); 
      const isPicture = pictureCards.includes(rankAttr);
      const numericRank = isPicture ? NaN : +rankAttr; 
      // Unaarinen plus on kevyin tapa merkkijonon muunnokseen
      
      // 4) Lasketaan säännöt selkeästi eriteltyinä
      const computedRules = {
        canUsePictureCards:  (isPicture && numericRank !== 10) || numericRank >= 8,
        cantUsePictureCards: !isPicture && numericRank < 8,
        canAceMoveToBin:     isPicture,
        canTenMoveToBin:     !isPicture && numericRank <= 9,
      };
      
      // 5) Päivitetään globaali tila ja palautetaan
      Object.assign(globalThis, {
        activeRules: computedRules,
        activeRank:  rankAttr
      });
      
      resolve();
    });
  });
}
