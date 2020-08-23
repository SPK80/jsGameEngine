import { IGameObject, IDrawing, IInput, IController, IDriverEngine } from "../gameObjects/common.js";

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

	#drawings = [];
	decorateDrawings(_class, ...params) {
		if (!_class) throw (`${_class} must be defined`);
		this.#drawings = new _class(...params, this.#drawings);
	}

	#controllers = {};

	constructor(renderEngine, input) {
		if (!(renderEngine instanceof IDriverEngine)) throw (`${renderEngine} must be instanceof DriverEngine`)
		this.#render = renderEngine.interface;
		renderEngine.listen(() => { this.draw() });

		if (!(input instanceof IInput)) throw (`${input} must be instanceof IInput`)
		this.#input = input;
		this.#input.listen(() => { this.input() });

	}

	input() {
		// const tasks = this.#input.get();
		// tasks.forEach(task => {
		// 	this.parseAndTransferTask(task);
		// })
		const task = this.#input.getData();
		console.log(task);

		this.#controllers.forEach((controller) => {
			controller.send(task);
		});
	}

	parseInput(task) {
		if (!task || task == '') return;

		const [name, action] = task.split('.');

		if (name && action) {
			const controller = this.#controllers.find(o => { o.name == name });
			if (controller)
				controlled.send(action);
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
			} else if (accessory instanceof IController) {
				this.#controllers.push(accessory);
				console.log(this.#controllers);
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
class Accessories{
	add(objName, accessory){

	}
}