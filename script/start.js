export default (() => {
  function updateState(msg) {
    console.log(`[GAME] ${msg}`);
  }

  const round = Number(sessionStorage.getItem("round") || 1);

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
      // jos ei ensimmäinen kierros, hypätään yli
      return Promise.resolve();
    }


    // 1) luo ja sekoita pakka (odottaa shuffle-promisea)
    return import("./1-createAndShufflePack.js")
      .then(m => m.default)
      .then(() => updateState("Pakka luotu ja sekoitettu."))


    // 3) jaa kortit (odottaa dealCards-promisea)
      .then(() => import("./3-dealCards.js"))
      .then(m => m.default)
      .then(() => updateState("Kortit jaettu."));
  })



  // B) Jatka normaalia pelisilmukkaa (round > 1 tai luontijaon jälkeen)
  .then(() => {
    updateState(`Aloitetaan kierros ${round}.`);

    // 0) tarkista ketä aloittaa 

  })




  // X) Virheenkäsittely
  .catch(err => console.error(`[GAME] ${err}`));
})();
