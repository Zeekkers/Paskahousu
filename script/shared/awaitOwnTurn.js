export default function awaitOwnTurn() {
    return new Promise(resolve => {
      if (activePlayer === 'user') {
        updateState("Sinun vuorosi")
        resolve();
        return;
      }
return;
    })}
  