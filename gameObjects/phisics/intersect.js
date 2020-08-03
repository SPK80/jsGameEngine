import { CompositeDecorator } from "../composite.js";
import { IGameObject } from "../common.js";

export class IntersectComposite extends CompositeDecorator {
	#predicate;
	#event;
	constructor(event, predicate, object) {
		super(object);
		this.#predicate = predicate;
		this.#event = event;
	}

	update() {
		super.update();
		const objects = this.get().filter(obj => obj instanceof IGameObject);
		objects.forEach(obj1 => {
			objects.forEach(obj2 => {
				if (obj2 != obj1 &&
					this.#predicate(obj1, obj2)) {
					this.#event.call({ object1: obj1, object2: obj2 });
				}
			});
		});
	}
}