// 2-getAllPlayers.js
export default function getAllPlayers() {
    return new Promise(resolve => {
      const basePlayers = ["user","computer1","computer2"];

      // Palautetaan satunnainen kokonaisluku 3–5
      const playerCount = Math.floor(Math.random() * 3) + basePlayers.length;
      globalThis.playerCount = playerCount
      resolve(playerCount);
    });
  }
  