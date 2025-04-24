import { createPack } from "./script/middle/pack.js";
import { dealCards } from "./script/bottom/1-deal-cards.js"
import { updateGamePileRules } from "./script/middle/game/gameRuleState.js"
import { canPlaceCard } from "./script/middle/game/gameRuleState.js"
import { test } from "./script/middle/game/index.js";



createPack();
setTimeout(()=>{
dealCards();
},2000)

setTimeout(()=>{
const mitä = test();
console.log(mitä)
},6000)