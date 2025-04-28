import { magneticPull } from "./shared/magneticPull.js";
let whoStarts
const gamePile = document.getElementById("game-chalk")

export default function playFirstCard() {

    
return new Promise ( resolve => {
if (starter === "user") {
    firstPlay.style.transition = "all 1s";

    magneticPull(gamePile, firstPlay)


resolve(console.log(`Käyttäjä aloitti pelin`))
return
}

document.body.appendChild(firstPlay)
Object.assign(firstPlay.style, {
    transition: "all 0.5s",
    position: "fixed",
    top: "-100%",
    left: "56%",
    transform: "translate(-50%,0%)"
})



setTimeout(()=>{
    Object.assign(firstPlay.style, {
        position: "absolute",
        top: "0",
        left: "50%",
        transform: "translate(-50%,175%)"
    })
},100)

setTimeout(()=>{
    document.getElementById("game").appendChild(firstPlay)
    firstPlay.style.transform = "translate(-50%,0%)"
    },500)
    resolve(console.log(`Tietokone aloitti pelin`))
    return
})};