import { ChainAnimation } from "../animations/chainAnimation.js";
import { ChainFrame } from "../animations/chainFrame.js";

console.log('anim');

const anim = new ChainAnimation(new ChainFrame(0, 0, 10, 10, 100));
console.log(anim);
anim.addNext(10, 0, 10, 20, 200);
console.log(anim);
