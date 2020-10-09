import { Vector3, Vector2 } from "../geometry/vectors.js";
import { FrameScene } from "./scene.js";
import { KeybToTaskMapper } from "../inputs/TaskInput.js";
import { Body } from "../gameObjects/bodies.js";
import { IDrawing, IGameObject, IInput } from "../gameObjects/common.js";

export class TestScene extends FrameScene {
	constructor(render, input) {

		super(render, input);

		const redRect = new RedRect(
			new Vector3(100, 200, 1),
			new Vector2(150, 100),
			input);

		this.addObject(redRect);
	}
}

export class RedRect extends IGameObject {

	get name() { return 'RedRect' };

	#accessories = [];
	get accessories() {
		return this.#accessories.slice();
	}

	constructor(pos, size, input) {
		super();
		const body = new Body(pos.x, pos.y, 1, size.x, size.y);
		this.#accessories.push(body);
		this.#accessories.push(new RectDrawing(body, '#F00000'));
		this.#accessories.push(input);

	}
}
class Function {
	#type = 'unknown';
	#func = () => { };
	constructor(type, func) {
		this.#type = type;
		this.#func = func;
	}
}

// class RectInput extends IInput {
// 	#input;
// 	constructor(input) {
// 		if (!(input instanceof IInput)) throw (`${input} must be instanceof IInput`);
// 		this.#input = input;
// 	}

// 	getData() {
// 		return this.#input.getData();
// 	}

// 	listen(callback) {
// 		this.#input.listen(callback);
// 	}
// }

class RectDrawing extends IDrawing {
	#body;
	#color;

	constructor(body, color) {
		super();
		this.#body = body;
		this.#color = color;
	}

	draw(render) {
		const pos = this.#body.pos;
		const size = this.#body.size;
		render.rect(pos.x, pos.y, size.x, size.y, this.#color, true);
	}
}