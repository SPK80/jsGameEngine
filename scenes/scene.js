import { IGameObject } from "../gameObjects/common.js";
import { Composite, SortingComposite, ResistantComposite } from "../gameObjects/composite.js";
// import { IntersectComposite } from "../gameObjects/phisics/intersect.js";
// import { PlugBus } from "../gameObjects/plugins/PlugBus.js";
// import { Events } from "../gameObjects/events/events.js";
// import { Plugin } from "../gameObjects/plugins/plugin.js";

export class Scene extends IGameObject {

	// #events = new Events();
	// get events() { return this.#events }

	// subscribeEvent(name, callback) {
	// 	this.#events.subscribe(name, callback);
	// }

	// #plugBus = new PlugBus();
	// get plugins() { return this.#plugBus }

	// addPlugin(object) {
	// 	this.#plugBus.plugin(object);
	// }

	// constructor(objects, intersectDetect) {
	// 	super();
	// 	this.#assembly = new IntersectComposite(intersectDetect,
	// 		new ResistantComposite(0.1,
	// 			new SortingComposite(
	// 				new Composite(objects))));
	// }

	#assembly = new Composite();
	decorateAssembly(_class, ...params) {
		this.#assembly = new _class(...params, this.#assembly);
	}


	addObject(object) {
		this.#assembly.add(object);
	}

	removeObject(object) {
		this.#assembly.remove(object);
	}

	getObject(name) {
		console.log(name, this.#assembly);
		return this.#assembly.get(name);
	}

	update() {
		// this.#plugBus.update();
		if (this.#assembly) this.#assembly.update();
	}

}

// export class Scene extends BaseScene {
// 	constructor() {
// 		super();

// 	}
// }