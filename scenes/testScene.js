import { Vector3, Vector2 } from "../geometry/vectors.js";
import { FrameScene } from "./scene.js";
import { KeybToTaskMapper } from "../inputs/TaskInput.js";
import { Body } from "../gameObjects/bodies.js";
import { IDrawing, IGameObject, IInput } from "../gameObjects/common.js";

export class TestScene extends FrameScene {
	constructor(renderEngine, inputEngine) {

		super(renderEngine, inputEngine);
		const tasksMap = {};

		// this.decorateInput(KeybToTaskMapper,);

		const redRect = new RedRect(new Vector3(100, 200, 1), new Vector2(150, 100));
		this.addObject(redRect);
	}
}

export class RedRect extends IGameObject {

	// #object;

	get name() { return 'RedRect' };

	#accessories = [];
	get accessories() {
		return this.#accessories.slice();
	}

	// #body;
	// get body() { return this.#body };

	constructor(pos, size) {
		super();
		const body = new Body(pos.x, pos.y, 1, size.x, size.y);
		this.#accessories.push(body);
		this.#accessories.push(new RectDrawing(body, '#F00000'));
		this.#accessories.push(new RectInput());
		// this.#body = new Body(pos.x, pos.y, 1, size.x, size.y);

		// if (!(object instanceof IGameObject)) throw (`${object} must be instanceof IGameObject`)
		// this.#object = gameObject;
	}
	// draw(render) {
	// 	const pos = this.#body.pos;
	// 	const size = this.#body.size;

	// 	render.rect(pos.x, pos.y, size.x, size.y, '#F00000', true);
	// }
}

class RectInput extends IInput{
	getData() {
		return this.#keyb.get();
	}

	listen(callback) {
		this.#event.subscribe(callback);
	}
}

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