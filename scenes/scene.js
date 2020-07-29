import { IGameObject } from "../gameObjects/common.js";
import { Composite, SortingComposite, ResistantComposite } from "../gameObjects/composite.js";
import { IntersectComposite } from "../gameObjects/phisics/intersect.js";
import { PlugBus } from "../gameObjects/plugins/PlugBus.js";
import { Events } from "../gameObjects/events/events.js";

export class BaseScene extends IGameObject {

	#events = new Events();
	get events() { return this.#events }

	#plugBus = new PlugBus();
	get plugins() { return this.#plugBus }

	addPlugin(object) {
		this.#plugBus.plugin(object);
	}

	subscribeEvent(name, callback) {
		this.#events.subscribe(name, callback);
	}

	// constructor(objects, intersectDetect) {
	// 	super();
	// 	this.#assembly = new IntersectComposite(intersectDetect,
	// 		new ResistantComposite(0.1,
	// 			new SortingComposite(
	// 				new Composite(objects))));
	// }

	#assembly = new Composite();

	addObject(object) {
		this.#assembly.add(object);
	}

	removeObject(object) {
		this.#assembly.remove(object);
	}

	getObject(name) {
		this.#assembly.get(name);
	}

	update() {
		this.#plugBus.update();
		this.#assembly.update();
	}
}

export class Scene extends BaseScene {
	constructor() {
		const os = new ZSorter();
		this.addPlugin(SortingComposite)
	}

	addObject(object) {

	}

	getObject(name) {
		this.#assembly.get(name);
	}

}

class ZSorter {
	#composite;

	constructor(composite) {
		this.#composite = composite;
	}

	sort(){
		this.#composite.get()
			.sort((a, b) => a.body.pos.y - b.body.pos.y)
			.forEach(item => {
				item.update();
			});
	}
}