import { AnimatedObject } from "./animatedObject.js";
import { StaticImageObject } from "./renderedObject.js";
import { CanvasRender } from "../graphics/renders.js";
import { Vector3, Vector2 } from "../geometry/vectors.js";
import { Personage as GameObject } from "../gameObjects/personage.js";
const anim = {
	moveRight: new Animation([
		new Frame(6 * 32, 10 * 32, 32, 32, moveDelay),
		new Frame(7 * 32, 10 * 32, 32, 32, moveDelay),
		new Frame(8 * 32, 10 * 32, 32, 32, moveDelay)
	], [0, 1, 2], true),
	moveLeft: new Animation([
		new Frame(6 * 32, 9 * 32, 32, 32, moveDelay),
		new Frame(7 * 32, 9 * 32, 32, 32, moveDelay),
		new Frame(8 * 32, 9 * 32, 32, 32, moveDelay)
	], [0, 1, 2], true),
	moveDown: new Animation([
		new Frame(6 * 32, 8 * 32, 32, 32, moveDelay),
		new Frame(7 * 32, 8 * 32, 32, 32, moveDelay),
		new Frame(8 * 32, 8 * 32, 32, 32, moveDelay)
	], [0, 1, 2], true),
	moveUp: new Animation([
		new Frame(6 * 32, 11 * 32, 32, 32, moveDelay),
		new Frame(7 * 32, 11 * 32, 32, 32, moveDelay),
		new Frame(8 * 32, 11 * 32, 32, 32, moveDelay)
	], [0, 1, 2], true),
	idle: new Animation([
		new Frame(6 * 32, 8 * 32, 32, 32, idleDelay),
		new Frame(6 * 32, 9 * 32, 32, 32, idleDelay),
		new Frame(6 * 32, 10 * 32, 32, 32, idleDelay),
		new Frame(6 * 32, 11 * 32, 32, 32, idleDelay)
	], [0, 1, 2, 3], true)
};

const tiles = new Image();

tiles.addEventListener("load", function () {
	const obj = new AnimatedObject(tiles, anim,
		new StaticImageObject(
			new CanvasRender(600, 400, '#004020'),
			new PositionObject(
				new Vector3(10, 20, 0),
				new Vector3(100, 100, 0),
				new GameObject('pers')
			)));
});

tiles.src = 'tiles.png';
class GameObject extends ObjectInterface {
	#name = '';
	get name() { return this.#name }

	constructor(name) {
		this.#name = name;
	}
}