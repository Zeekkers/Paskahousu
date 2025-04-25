console.log(firstPlay)
console.log(starter)
let whoStarts
export default function playFirstCard() {
return new Promise ( resolve => {
if (starter === "user") {
    firstPlay.style.transition = "all 1s";
    document.body.appendChild(firstPlay)
setTimeout(()=>{
Object.assign(firstPlay.style, {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)"
})},100);
setTimeout(()=>{
    document.getElementById("game").appendChild(firstPlay)
    Object.assign(firstPlay.style, {
    position: "absolute",
    top: "0",
    left: "50%",
    transform: "translate(-50%,0%)"
    });
    },1000)
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