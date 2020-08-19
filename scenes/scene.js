import { IDriverEngine } from "../engines/engine.js";
import { IGameObject } from "../gameObjects/common.js";
import { Body } from "../gameObjects/bodies.js";

export class FrameScene {
	#render;
	decorateRender(_class, ...params) {
		if (!_class) throw (`${_class} must be defined`);
		this.#render = new _class(...params, this.#render);
	}

	#input;
	decorateInput(_class, ...params) {
		if (!_class) throw (`${_class} must be defined`);
		this.#input = new _class(...params, this.#input);
	}

	#controlleds = [];

	#drawings = [];
	decorateDrawings(_class, ...params) {
		if (!_class) throw (`${_class} must be defined`);
		this.#drawings = new _class(...params, this.#drawings);
	}
	constructor(renderEngine, inputEngine) {
		if (!(renderEngine instanceof IDriverEngine)) throw (`${renderEngine} must be instanceof DriverEngine`)
		this.#render = renderEngine.interface;
		renderEngine.setCallback(() => { this.draw() });

		if (!(inputEngine instanceof IInputEngine)) throw (`${inputEngine} must be instanceof IInputEngine`)
		this.#input = inputEngine.interface;
		inputEngine.setCallback(() => { this.input() });

	}

	input() {
		const tasks = this.#input.get();
		tasks.forEach(task => {
			this.execTask(task);
		})
	}

	execTask(task) {
		if (!task || task == '') return;

		const [name, action] = task.split('.');

		if (name && action) {
			const controlled = this.#controlleds.find(o => { o.name == name });
			if (controlled)
				controlled.input(action);
		}

	}


	draw() {
		this.#render.clear();
		this.#drawings.forEach(dr => {
			dr.draw(this.#render);
		});
	}

	addObject(object) {
		if (!(object instanceof IGameObject)) throw (`${object} must be instanceof IGameObject`)
		if (object instanceof IDrawingGameObject) {

			this.#drawings.push(object);
		}

	}
}

class IDrawingGameObject extends IGameObject {
	draw(render) { throw ('draw must be implemented') }
}

export class RedRect extends IDrawingGameObject {

	// #object;

	get name() { return 'RedRect' };

	#body;
	get body() { return this.#body };

	constructor(pos, size) {
		super();
		this.#body = new Body(pos.x, pos.y, 1, size.x, size.y);

		// if (!(object instanceof IGameObject)) throw (`${object} must be instanceof IGameObject`)
		// this.#object = gameObject;
	}

	draw(render) {
		const pos = this.#body.pos;
		const size = this.#body.size;

		render.rect(pos.x, pos.y, size.x, size.y, '#F00000', true);
	}
}