import { BaseObject } from "../gameObjects/gameObject.js";
import { GameObjects } from "../objects.js";

export class Scene extends BaseObject {
	// #settings = null;
	#name = '';
	get name() { return this.#name };

	#objects = null;

	constructor(params, objects) {
		super(params);
		this.#objects = new GameObjects(objects);
	}

	add(gameObject) {
		this.#objects.push(gameObject);
	}

	#controls = [];

	update() {

		this.#controls.forEach(con => {
			const obj = this.#objects.get(con.name);
			var com = con.input.pop();
			while (com) {
				obj.do(com);
				com = con.input.pop();
			}
		});

		this.render.clear();

		const objects = this.#objects.get();
		objects.forEach(obj => {
			obj.update();
		});
	}

	setControl(name, input) {
		this.#controls.push({
			name: name,
			input: input
		})
	}

}