export default function waitForUser() {
    return new Promise(resolve => {
      const slot = document.getElementById("slot");
      if (!slot || !slot.parentNode) return resolve();
  
      const parent = slot.parentNode;
  
      const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          for (const removed of mutation.removedNodes) {
            if (removed === slot) {
              observer.disconnect();
              resolve();
            }
          }
        }
      });
  
      observer.observe(parent, {
        childList: true,
        subtree: false
      });
    });
  }
  


