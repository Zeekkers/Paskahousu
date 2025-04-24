import { createPack } from "./script/middle/pack.js";
import { dealCards } from "./script/bottom/1-deal-cards.js"

createPack();
setTimeout(()=>{
dealCards();
},2000)

