import { Animation } from "../animations/animation.js";
import { Animator } from "../animations/animator.js";
import { Frame } from "../animations/frame.js";

// console.log('anim');
// const anim = new Animation(['fr1', 'fr2', 'fr3'], [0, 1, 2,1], true);
// console.log(anim);
// console.log(anim.first);
// for (let i = 0; i < 10; i++) {
// 	console.log(anim.next);
// }

const animator = new Animator({
	idle: new Animation([
		new Frame(0 * 32, 8 * 32, 32, 32, 1000),
		new Frame(0 * 32, 9 * 32, 32, 32, 1000),
		new Frame(0 * 32, 10 * 32, 32, 32, 1000),
		new Frame(0 * 32, 11 * 32, 32, 32, 1000)
	], [0, 1, 2, 3], true),

});
// animator.start('idle');

const delays = [4000, 2000, 3000];
let pos = 0;
let max = 7;
console.log('start');

const loop = function () {
	console.log(delays[pos], max);
	if (max < 1) {
		console.log('stop');
		return;
	}
	setTimeout(loop, delays[pos]);
	pos++;
	max--;
	if (pos > 2) pos = 0;

}
loop();