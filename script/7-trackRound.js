import getActiveRules from "./6-getActiveRules.js";
import makeDraggable from "./shared/makeDraggable.js";
import waitForUser from "./shared/waitForUser.js";
import bot from "./shared/bot.js"


export default async function trackRound() {

  let startIndex = players.indexOf(starter);
  let index = startIndex;

  do {

    if (round === 1 && index === startIndex) {
      index = (index + 1) % players.length;
      continue;
    }

    globalThis.activePlayer = players[index];

    await getActiveRules();
    

    if (players[index] === 'user') {
      updateState("Sinun vuorosi");
      makeDraggable();
      await waitForUser();
    } else {
      await bot(players[index]);
    }

    index = (index + 1) % players.length;

    hands[activePlayer];
    console.log(hands)

  } while (index !== startIndex);
}
