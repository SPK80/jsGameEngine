import { Input } from "../inputs/input.js";
import { BaseObject, GameObject } from "../gameObjects/gameObject.js";
import { GameObjects } from "../gameObjects/gameObjects.js";
import { throwIfNotInstance } from "../tools/classUtils.js";
import { CompositeObject } from "../gameObjects/compositeObject.js";

export class Scene extends CompositeObject {
	// #settings = null;
	#name = '';
	get name() { return this.#name };

	#objects;
	#objectControllers = [];
	#debug = '';

	#refreshDebug = false;

	constructor(params, objects) {
		super(params);
		this.#objects = new GameObjects(objects);

		setInterval(() => this.#refreshDebug = true, 500);
	}

	addObject(gameObject) {
		this.#objects.add(gameObject);
	}

	// #viewPort = new ViewPort();

	// #character;
	// setCharacter(objectName, input) {
	// 	const obj = this.#objects.get(objectName);
	// 	if (obj) {
	// 		this.#character = obj;
	// 		setInput(objectName, input);
	// 		this.#viewPort.follow(this.#character);
	// 	}
	// }

	setInput(objectName, input) {
		throwIfNotInstance(input, Input);
		const obj = this.#objects.get(objectName);
		if (obj)
			this.#objectControllers.push({ object: obj, input: input });
	}

	update(drivers) {
		function _us(t) {
			return Math.trunc(t*1000)
		}
		let t = 0;

		const startPerf = () => {
			if (this.#refreshDebug) {
				t = performance.now();
			}
		}

		const calcPerf = () => {
			if (this.#refreshDebug) {
				this.#debug = `${_us(performance.now() - t)}us`;
				this.#refreshDebug = false;
			}
		}

		const render = drivers.render;
		startPerf();
		render.clear();

		const objects = this.#objects.get();
		objects.sort((a, b) => a.y - b.y);
		calcPerf();
		objects.forEach(obj => {
			let _drivers = {};
			const controller = this.#objectControllers.find((con) => con.object == obj);
			if (controller) {
				_drivers.input = controller.input;
			}
			obj.update(Object.assign(_drivers, drivers));
		});


		render.text({
			text: this.#debug,
			x: 5,
			y: 20,
			color: 'red',
		});

		// this.#viewPort.update(drivers);

	}
}

class ViewPort extends GameObject {

	constructor() {
		super();
	}

	#wi = 400;
	#he = 300;

	#tracked;

	follow(obj) {
		obj = throwIfNotInstance(obj, GameObject);
		this.#tracked = obj;
	}

	update(drivers) {
		this.x = obj.x;
		this.y = obj.y;
		drivers.render.viewPort(
			{
				x: this.x,
				y: this.y,
				// wi: this.#wi,
				// he: this.#he
			});
	}
}