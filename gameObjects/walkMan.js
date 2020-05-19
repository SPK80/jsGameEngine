import { Personage } from "./personage.js";
import { Animation } from "../animations/animation.js";
import { Frame } from "../animations/frame.js";
import { CircleCounter, RndCounter } from "../tools/counters.js";

export class WalkMan extends Personage {

	constructor(name, x, y, image) {
		const moveOrder = new CircleCounter(0, 2, 1);//[0, 1, 2];
		const idleOrder = new RndCounter(0, 3);//[0, 1, 2, 3];
		const moveDelay = 100;
		const idleDelay = 1000;

		super(name, x, y, image, {
			moveRight: new Animation([
				new Frame(0 * 32, 10 * 32, 32, 32, moveDelay),
				new Frame(1 * 32, 10 * 32, 32, 32, moveDelay),
				new Frame(2 * 32, 10 * 32, 32, 32, moveDelay)
			], moveOrder, true),
			moveLeft: new Animation([
				new Frame(0 * 32, 9 * 32, 32, 32, moveDelay),
				new Frame(1 * 32, 9 * 32, 32, 32, moveDelay),
				new Frame(2 * 32, 9 * 32, 32, 32, moveDelay)
			], moveOrder, true),
			moveDown: new Animation([
				new Frame(0 * 32, 8 * 32, 32, 32, moveDelay),
				new Frame(1 * 32, 8 * 32, 32, 32, moveDelay),
				new Frame(2 * 32, 8 * 32, 32, 32, moveDelay)
			], moveOrder, true),
			moveUp: new Animation([
				new Frame(0 * 32, 11 * 32, 32, 32, moveDelay),
				new Frame(1 * 32, 11 * 32, 32, 32, moveDelay),
				new Frame(2 * 32, 11 * 32, 32, 32, moveDelay)
			], moveOrder, true),
			idle: new Animation([
				new Frame(0 * 32, 8 * 32, 32, 32, idleDelay),
				new Frame(0 * 32, 9 * 32, 32, 32, idleDelay),
				new Frame(0 * 32, 10 * 32, 32, 32, idleDelay),
				new Frame(0 * 32, 11 * 32, 32, 32, idleDelay)
			], idleOrder, true),
		}
		);
	}

}