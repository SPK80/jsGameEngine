import { Personage } from "./personage.js";
import { Animation } from "../animations/animation.js";
import { Frame } from "../animations/frame.js";

export class WhiteWolker extends Personage {

	constructor(name, x, y, image, input, render) {
		const order = [0, 1, 2];
		const moveDelay = 100;
		const idleDelay = 1000;
		super(name, x, y, 32, 32, image, {
			moveRight: new Animation([
				new Frame(6 * 32, 10 * 32, 32, 32, moveDelay),
				new Frame(7 * 32, 10 * 32, 32, 32, moveDelay),
				new Frame(8 * 32, 10 * 32, 32, 32, moveDelay)
			], order, true),
			moveLeft: new Animation([
				new Frame(6 * 32, 9 * 32, 32, 32, moveDelay),
				new Frame(7 * 32, 9 * 32, 32, 32, moveDelay),
				new Frame(8 * 32, 9 * 32, 32, 32, moveDelay)
			], order, true),
			moveDown: new Animation([
				new Frame(6 * 32, 8 * 32, 32, 32, moveDelay),
				new Frame(7 * 32, 8 * 32, 32, 32, moveDelay),
				new Frame(8 * 32, 8 * 32, 32, 32, moveDelay)
			], order, true),
			moveUp: new Animation([
				new Frame(6 * 32, 11 * 32, 32, 32, moveDelay),
				new Frame(7 * 32, 11 * 32, 32, 32, moveDelay),
				new Frame(8 * 32, 11 * 32, 32, 32, moveDelay)
			], order, true),
			idle: new Animation([
				new Frame(6 * 32, 8 * 32, 32, 32, idleDelay),
				new Frame(6 * 32, 9 * 32, 32, 32, idleDelay),
				new Frame(6 * 32, 10 * 32, 32, 32, idleDelay),
				new Frame(6 * 32, 11 * 32, 32, 32, idleDelay)
			], [0, 1, 2, 3], true),
		},
			input, render
		);
	}
}