import { getActiveRules } from "./1-getActiveRules.js"
import { isOverlapping } from "./2-isOverlapping.js"
import { checkCardAgainstRules } from "./3-checkCardAgainstRules.js"



export function test () {

const pile = Array.from(document.querySelectorAll("game-card"));
console.log(pile)

const topCard = pile.at(-1);
console.log(topCard)
const activeRules = getActiveRules(topCard);
const activeRank = topCard.getAttribute('card-rank');
console.log(activeRules);

const dragItem = document.querySelector("footer game-card");
console.log(dragItem);
    console.log(checkCardAgainstRules(dragItem,activeRules,activeRank))
}

const dropZone = document.getElementById("game");
console.log(dropZone);



export function validateIfHovering() {
  if (isOverlapping(dragItem, dropZone)) {

  }
}
