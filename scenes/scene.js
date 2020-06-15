import { Composite } from "../gameObjects/composite.js";
import { EmptyDrawing, ImageDrawing, ClearDrawing } from "../gameObjects/drawings.js";
import { IGameObject } from "../gameObjects/gameObject.js";
import { Body } from "../gameObjects/bodies.js";

export class Scene extends IGameObject {

	#assembly;

	#landscape;

	constructor(objects, landscape, tiles, render) {
		super();
		this.#landscape = landscape;
		this.#assembly = new Composite(objects, //new ImageDrawing(tiles,
			// new ClearDrawing(
				new EmptyDrawing(render,
					new Body(0, 0, 0, tiles.width, tiles.height)));
	}

	addObject(object) {
		this.#assembly.add(object);
	}

	removeObject(object) {
		this.#assembly.remove(object);
	}

	setInput(objectName, input) {
		const obj = this.#assembly.get(objectName);
		if (obj)
			obj.setInput(input);
	}

	update() {
		this.#landscape.update();
		this.#assembly.update();		
	}
}

// import { Input } from "../inputs/input.js";
// import { BaseObject } from "../gameObjects/gameObject.js";
// import { GameObjects } from "../gameObjects/gameObjects.js";
// import { throwIfNotInstance, inject } from "../tools/classUtils.js";

// export class Scene extends BaseObject {
// 	// #settings = null;
// 	#name = '';
// 	get name() { return this.#name };

// 	#objects = null;
// 	#objectControllers = [];
// 	#debug = '';
// 	#refreshDebug = false;

// 	constructor(params, objects) {
// 		super(params);
// 		this.#objects = new GameObjects(objects);

// 		setInterval(() => this.#refreshDebug = true, 500);
// 	}

// 	addObject(gameObject) {
// 		this.#objects.add(gameObject);
// 	}

// 	setInput(objectName, input) {
// 		throwIfNotInstance(input, Input);
// 		const obj = this.#objects.get(objectName);
// 		if (obj)
// 			this.#objectControllers.push({ object: obj, input: input });
// 	}

// 	update(drivers) {
// 		function _us(t) {
// 			return Math.trunc(t * 1000)
// 		}
// 		let t = 0;

// 		const startPerf = () => {
// 			if (this.#refreshDebug) {
// 				t = performance.now();
// 			}
// 		}

// 		const calcPerf = () => {
// 			if (this.#refreshDebug) {
// 				this.#debug = `${_us(performance.now() - t)}us`;
// 				this.#refreshDebug = false;
// 			}
// 		}

// 		const render = drivers.render;
// 		startPerf();
// 		render.clear();

// 		const objects = this.#objects.get();
// 		objects.sort((a, b) => a.y - b.y);
// 		calcPerf();
// 		objects.forEach(obj => {
// 			const controller = this.#objectControllers.find((con) => con.object == obj);
// 			if (controller) obj.update(inject(drivers, 'input', controller.input));
// 			else obj.update(drivers);
// 		});

// 		render.text({
// 			text: this.#debug,
// 			x: 5,
// 			y: 20,
// 			color: 'red',
// 		});
// 	}
// }

