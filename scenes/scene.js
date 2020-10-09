import { IGameObject, IDrawing, IController } from "../gameObjects/common.js";
import { AbstractRender } from "../graphics/abstractRender.js";

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

	//Accessories of all objects
	#drawings = new Accessories();
	#controllers = new Accessories();

	constructor(render, input) {

		if (!(render instanceof AbstractRender)) throw (`${render} must be instanceof AbstractRender`)
		this.#render = render;

		input.listen(() => { this.input(input.getData()) });
	}

	input(inputData) {
		console.log(inputData);
	}

	// parseInput(task) {
	// 	if (!task || task == '') return;

	// 	const [name, action] = task.split('.');

	// 	if (name && action) {
	// 		const controller = this.#controllers.find(o => { o.name == name });
	// 		if (controller)
	// 			controlled.send(action);
	// 	}
	// }

	draw() {
		this.#render.clear();
		this.#drawings.asArray.forEach(dr => {
			dr.draw(this.#render);
		});
	}

	addObject(object) {
		if (!(object instanceof IGameObject)) throw (`${object} must be instanceof IGameObject`)

		const accessories = object.accessories;

		//group accessories of object by Interface :
		accessories.forEach(accessory => {
			if (accessory instanceof IDrawing) {
				this.#drawings.add(object.name, accessory);
			}
			else if (accessory instanceof IController) {
				this.#controllers.add(object.name, accessory);
			}
		});

	}
}

// class IDrawingGameObject extends IGameObject {
// 	draw(render) { throw ('draw must be implemented') }
// }

class Accessories {
	#accessories = {};

	add(objName, accessory) {
		this.#accessories[objName] = accessory;
	}

	get(objName) {
		if (objName) return this.#accessories[objName];
		else return Object.assign({}, this.#accessories);
	}

	get asArray() {
		return Object.values(this.#accessories);
	}

	delete(objName) {
		delete this.#accessories[objName];
	}

}