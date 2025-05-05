// bin.js

export function bin() {
    const binContainer = document.getElementById("game");
    if (!binContainer) return;
  
    const children = Array.from(binContainer.children);
  
    children.forEach((child, i) => {
      if (i !== 0) {
        const y = i - 1;
        child.style.transition = "all 0.1s";
        setTimeout(() => {
          child.style.transform = `translate(-50%, -${y}px)`;
        }, 100);
      }
    });
  }
  
  // Jos haluat myös MutationObserverin tässä:
  export function initBinObserver() {
    const binContainer = document.getElementById("game");
    const observerConfig = {
      childList: true,
      subtree: false,
      attributes: false,
    };
  
    const observer = new MutationObserver(() => {
      observer.disconnect();
      try {
        bin();
      } finally {
        if (binContainer) observer.observe(binContainer, observerConfig);
      }
    });
  
    if (binContainer) {
      observer.observe(binContainer, observerConfig);
    }
  }
  