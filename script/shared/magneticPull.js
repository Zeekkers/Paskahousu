export function magneticPull(puller, pulled) {
  const pr = puller.getBoundingClientRect();
  const dr = pulled.getBoundingClientRect();

  Object.assign(pulled.style, {
    position:        'fixed',
    left:            `${dr.left}px`,
    top:             `${dr.top}px`,
    width:           `${dr.width}px`,
    height:          `${dr.height}px`,
    transition:      'all 1s ease',
    zIndex: '10'
  });
  document.body.appendChild(pulled);

  
setTimeout(()=>{
  Object.assign(pulled.style, {
    left:            `${pr.left}px`,
    top:             `${pr.top}px`,
    width:           `${pr.width}px`,
    height:          `${pr.height}px`,
    transform: ""

  });
},100)
setTimeout(()=>{
puller.replaceWith(pulled)
},1100)


}
