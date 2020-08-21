import { IDriverEngine } from "../engines/engine.js";
import { IGameObject, IDrawing, IInput } from "../gameObjects/common.js";


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

		// if (!(inputEngine instanceof IInput)) throw (`${inputEngine} must be instanceof IInput`)
		// this.#input = inputEngine.interface;
		// inputEngine.setCallback(() => { this.input() });

	}

	input() {
		const tasks = this.#input.get();
		tasks.forEach(task => {
			this.parseAndTransferTask(task);
		})
	}

	parseAndTransferTask(task) {
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
		const accessories = object.accessories;
		accessories.forEach(accessory => {
			if (accessory instanceof IDrawing) {
				this.#drawings.push(accessory);
				// } else if (accessory instanceof Input) {
				// 	this.#inputs.push(accessory);
			}
		});

		// if (object instanceof IDrawingGameObject) {
		// 	this.#drawings.push(object);
		// }

	}
}

// class IDrawingGameObject extends IGameObject {
// 	draw(render) { throw ('draw must be implemented') }
// }