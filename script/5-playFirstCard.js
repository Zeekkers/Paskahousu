import { magneticPull } from "./shared/magneticPull.js";
import enableHandsProxy from "./shared/enableHandsProxy.js";enableHandsProxy();
import gamePile from "./shared/gamePile.js";gamePile();
let whoStarts
const slot = document.getElementById("slot");

export default function playFirstCard() {

    
return new Promise ( resolve => {

// 1) Käyttäjä aloittaa
if (starter === "user") {
    magneticPull(slot, firstPlay).then(()=>
        Object.assign(
            firstPlay.style,{
                transition: "all 1s",
                position: "absolute",
                top: "0",
                left: "50%",
                transform: "translate(-50%,0%)",
                width: "8%",
            })
    )
    popCardFromHands(firstPlay);
    hands[starter]
resolve(updateState(`Käyttäjä aloitti pelin`))
return
}


// 2) Tietokone aloittaa
document.body.appendChild(firstPlay)
Object.assign(firstPlay.style, {
    transition: "all 0.5s",
    position: "fixed",
    top: "-100%",
    left: "50%",
    transform: "translate(-50%,0%)"
});

magneticPull(slot, firstPlay).then(()=>
    Object.assign(
        firstPlay.style,{
            transition: "all 1s",
            position: "absolute",
            top: "0",
            left: "50%",
            transform: "translate(-50%,0%)",
            width: "8%",
        }));

        popCardFromHands(firstPlay);
        hands[starter]

    resolve(updateState(`Tietokone aloitti pelin`));
    return
})};