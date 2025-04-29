export default (() => {

// ===================
// Globaalit helpperit
// ===================
  globalThis.delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  globalThis.updateState = (msg)=> {
    console.log(`[GAME] ${msg}`);
    document.querySelector("feedback").textContent=`Tila: ${msg}`
  }

  globalThis.round = Number(sessionStorage.getItem("round") || 1);
  let playersResult;


  globalThis.addTrackedListener=(el, type, fn, opts)=> {
    el._listeners = el._listeners || [];
    el._listeners.push({type, fn, opts});
    el.addEventListener(type, fn, opts);
  }

  globalThis.removeAllTracked=(el)=> {
    if (!el._listeners) return;
    for (const {type, fn, opts} of el._listeners) {
      el.removeEventListener(type, fn, opts);
    }
    el._listeners.length = 0;
  }
  



// ================
// Varsinainen Peli
// ================
  return new Promise(res => {
    if (document.readyState === 'loading') {
      window.addEventListener('DOMContentLoaded', res, { once: true });
    } else {
      res();
    }
  })
  // A) Jos round === 1, sekoita pakka ja jaa kortit
  .then(() => {
    if (round !== 1) {
      return Promise.resolve();
    }
    // 1) luo ja sekoita pakka (odottaa shuffle-promisea)
    return import("./1-createAndShufflePack.js")
      .then(m => m.default)
      .then(() => updateState("Pakka luotu ja sekoitettu."))

      // 2) haetaan pelaajat (odottaa getAllPlayers-promisea)
      .then(() => import("./2-getAllPlayers.js"))
      .then(m => m.default())
      .then(() => updateState(`Pelaajien määrä ${playerCount}`))

      // 3) jaa kortit (odottaa dealCards-promisea)
      .then(()=> import("./3-dealCards.js"))
      .then(m => m.default())
      .then(() => updateState("Kortit jaettu."))

      // 4) valitaan aloittaja pienimmän kortin mukaan
      .then(()=> import("./4-chooseWhoStarts.js"))
      .then(m=> m.default())
      .then((result)=> updateState(result))

      // 5) pelataan aloittajan kortti
      .then(()=> import("./5-playFirstCard.js"))
      .then(m => m.default())

  })
  // B) Jatka normaalia pelisilmukkaa (round > 1 tai luontijaon jälkeen)
  .then(() => {

    // 6) tarkistetaan aktiiviset säännöt
    return import("./6-getActiveRules.js")
   .then(m => m.default())

   // 7) Aloita kierroksen seuranta
   .then(()=> import("./7-trackRound.js"))
   .then(m => m.default())
  })
  // Y) Aloitetaan uusi kierros
  .finally(()=>{ round++
    updateState(`Aloitetaan kierros ${round}.`)
  })
  // X) Virheenkäsittely
  .catch(err => console.error(`[GAME] ${err}`));
})();
