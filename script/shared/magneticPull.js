export function magneticPull(puller, pulled) {
  const pr = puller.getBoundingClientRect();
  const dr = pulled.getBoundingClientRect();

  Object.assign(pulled.style, {
    position:   'fixed',
    left:       `${dr.left}px`,
    top:        `${dr.top}px`,
    width:      `${dr.width}px`,
    height:     `${dr.height}px`,
    transition: 'all 0.5s ease',
    zIndex:     '10'
  });
  document.body.appendChild(pulled);

  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        pulled.addEventListener('transitionend', function handler(event) {
          if (event.propertyName === 'left') {
            pulled.removeEventListener('transitionend', handler);
            removeAllTracked(pulled);
            puller.replaceWith(pulled);
            resolve();
          }
        });
        Object.assign(pulled.style, {
          left:      `${pr.left}px`,
          top:       `${pr.top}px`,
          width:     `${pr.width}px`,
          height:    `${pr.height}px`,
          transform: ''
        });
      });
    });
  });
}
