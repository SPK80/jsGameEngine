import { Personage } from "./personage.js";
import { Animation } from "../animations/animation.js";
import { Frame } from "../animations/frame.js";
import { CircleCounter, RndCounter } from "../tools/counters.js";
import { inject } from "../tools/classUtils.js";

export class WhiteWolker extends Personage {
	#rndWolk;
	constructor(name, x, y, image) {
		const moveOrder = new CircleCounter(0, 2, 1);//[0, 1, 2];
		const idleOrder = new RndCounter(0, 3);//[0, 1, 2, 3];
		const moveDelay = 100;
		const idleDelay = 1000;
		super(name, x, y, image, {
			moveRight: new Animation([
				new Frame(6 * 32, 10 * 32, 32, 32, moveDelay),
				new Frame(7 * 32, 10 * 32, 32, 32, moveDelay),
				new Frame(8 * 32, 10 * 32, 32, 32, moveDelay)
			], moveOrder, true),
			moveLeft: new Animation([
				new Frame(6 * 32, 9 * 32, 32, 32, moveDelay),
				new Frame(7 * 32, 9 * 32, 32, 32, moveDelay),
				new Frame(8 * 32, 9 * 32, 32, 32, moveDelay)
			], moveOrder, true),
			moveDown: new Animation([
				new Frame(6 * 32, 8 * 32, 32, 32, moveDelay),
				new Frame(7 * 32, 8 * 32, 32, 32, moveDelay),
				new Frame(8 * 32, 8 * 32, 32, 32, moveDelay)
			], moveOrder, true),
			moveUp: new Animation([
				new Frame(6 * 32, 11 * 32, 32, 32, moveDelay),
				new Frame(7 * 32, 11 * 32, 32, 32, moveDelay),
				new Frame(8 * 32, 11 * 32, 32, 32, moveDelay)
			], moveOrder, true),
			idle: new Animation([
				new Frame(6 * 32, 8 * 32, 32, 32, idleDelay),
				new Frame(6 * 32, 9 * 32, 32, 32, idleDelay),
				new Frame(6 * 32, 10 * 32, 32, 32, idleDelay),
				new Frame(6 * 32, 11 * 32, 32, 32, idleDelay)
			], idleOrder, true),
		});
	}
	update(drivers) {
		const input = ... #TODO

		super.update(inject(drivers, 'input', input));
	}
}