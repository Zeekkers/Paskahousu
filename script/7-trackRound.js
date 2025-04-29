import getActiveRules from "./6-getActiveRules.js";
import makeDraggable from "./shared/makeDraggable.js";
import bot from "./shared/bot.js"


export default async function trackRound() {
  console.log('starter:', starter);
  console.log('players:', players);
  console.log('activeRules:', activeRules);

  let startIndex = players.indexOf(starter);
  let index = startIndex;

  do {
    globalThis.activePlayer = players[index];
    console.log(`Aktiivinen pelaaja: ${activePlayer}`);

    await getActiveRules();
    console.log(activeRules);

    if (players[index] === 'user') {
      updateState("Sinun vuorosi");
      makeDraggable();
      await delay(500)
    } else {
      await bot(players[index]);
    }

    index = (index + 1) % players.length;

  } while (index !== startIndex);

  resolve
}