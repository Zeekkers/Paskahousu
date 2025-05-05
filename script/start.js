export default (async () => {

  // ===================
  // Globaalit helperit
  // ===================
  globalThis.delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  globalThis.updateState = (msg) => {
    console.log(`[GAME] ${msg}`);
    document.querySelector("feedback").textContent = `Tila: ${msg}`;
  };
  globalThis.round = Number(sessionStorage.getItem("round") || 1);

  globalThis.addTrackedListener = (el, type, fn, opts) => {
    el._listeners = el._listeners || [];
    el._listeners.push({type, fn, opts});
    el.addEventListener(type, fn, opts);
  };

  globalThis.removeAllTracked = (el) => {
    if (!el._listeners) return;
    for (const {type, fn, opts} of el._listeners) {
      el.removeEventListener(type, fn, opts);
    }
    el._listeners.length = 0;
  };

  // ===================
  // Odota DOM
  // ===================
  if (document.readyState === 'loading') {
    await new Promise(res => window.addEventListener('DOMContentLoaded', res, { once: true }));
  }

  // ===================
  // Alustukset
  // ===================
  let initialDealt = false;
  const onKortteja = () => {
    return Array.from(document.querySelectorAll("player-hand game-card")).length !== 0;
  };

  // ===================
  // Pääsilmukka
  // ===================
  do {
    // A) Ensimmäinen kierros: korttien jako
    if (!initialDealt && round === 1) {
      await import("./1-createAndShufflePack.js").then(m => m.default());
      updateState("Pakka luotu ja sekoitettu.");

      await import("./2-getAllPlayers.js").then(m => m.default());
      updateState(`Pelaajien määrä ${playerCount}`);

      await import("./3-dealCards.js").then(m => m.default());
      updateState("Kortit jaettu.");

      await import("./4-chooseWhoStarts.js")
        .then(m => m.default())
        .then(result => updateState(result));

      await import("./5-playFirstCard.js").then(m => m.default());

      initialDealt = true;
    }

    // B) Kaikki kierrokset: pelin normaali kulku
    await import("./6-getActiveRules.js").then(m => m.default());
    await import("./7-trackRound.js").then(m => m.default());

    round++;
    sessionStorage.setItem("round", String(round));
    updateState(`Aloitetaan kierros ${round}.`);

  } while (!initialDealt || onKortteja());

  // ===================
  // Peli päättyi
  // ===================
  updateState("Peli päättyi. Kaikki kortit pelattu.");

})().catch(err => console.error(`[GAME] ${err}`));
