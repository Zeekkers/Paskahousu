import { checkCardAgainstRules } from "./checkCardAgainstRules.js";
import playPickedCard from "./playPickedCard.js"
import pickTopCard from "./pickTopCard.js"
import pickGamePack from "./pickGamePack.js"

const topCard = document.querySelector('#pack game-card:last-of-type');
const canUseTopCard = checkCardAgainstRules(topCard);

if (canUseTopCard) {
    playPickedCard()
  return
}
 pickTopCard()
 pickGamePack()
return