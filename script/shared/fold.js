import { magneticPull } from "./magneticPull.js";

export default function fold() {
  return new Promise((resolve) => {
    const cards = Array.from(document.querySelectorAll("#game game-card"));
    const binPack = document.querySelector("#bin:first-child");

    if (cards.length === 0) return resolve();

    // Luo wrapper
    const wrapper = document.createElement("div");
    wrapper.id = "fold";
    wrapper.style.position = "absolute";
    wrapper.style.left = cards[0].offsetLeft + "px";
    wrapper.style.top = cards[0].offsetTop + "px";
    wrapper.style.minWidth = cards[0].offsetWidth + "px";
    wrapper.style.minHeight = cards[0].offsetHeight + "px";
    wrapper.style.pointerEvents = "none";
    wrapper.style.zIndex = "10";
    wrapper.style.top = "0"
    wrapper.style.left="50%"
    wrapper.style.transform="translate(-50%,0%)"



    document.querySelector("#game").appendChild(wrapper);

    cards.forEach((card) => {
      wrapper.appendChild(card);
    card.style.transition = "all 1s ease"

      setTimeout(()=>{
      Object.assign(card.style, {
        position: "absolute",
        top: "0",
        left: "50%",
        transform: "translate(-50%, 0%) rotateY(180deg)",
        minWidth: "100%",
      })},100)
    });

    // Käynnistä foldin siirto kokonaisuutena
    setTimeout(() => {
      magneticPull(binPack, wrapper).then(() => {
        Object.assign(wrapper.style, {
            transition: "all 1s",
            position: "absolute",
            top: "0",
            left: "50%",
            transform: "translate(-50%,0%)",
            width: "8%",
          });
        resolve();
      });
    }, 1000); // pieni viive käännöksen jälkeen
  });
}

