import { IGameObject } from "../gameObjects/common.js";
import { Composite, SortingComposite, ResistantComposite } from "../gameObjects/composite.js";
import { IntersectComposite } from "../gameObjects/phisics/intersect.js";

export class Scene extends IGameObject {
	#assembly;

	constructor(objects, intersectDetect) {
		super();
		this.#assembly = new IntersectComposite(intersectDetect,
			new ResistantComposite(0.1,
				new SortingComposite(
					new Composite(objects))));
	}

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
		this.#assembly.update();
	}
}