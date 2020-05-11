import { Animation } from "../animations/animation.js";

console.log('anim');

const anim = new Animation(['fr1', 'fr2', 'fr3'], [0, 1, 2,1], true);
console.log(anim);
console.log(anim.first);
for (let i = 0; i < 10; i++) {
	console.log(anim.next);

}