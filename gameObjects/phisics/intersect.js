import { CompositeDecorator } from "../composite.js";
import { InteractGameObject, IUpdating, IGameObject } from "../common.js";

export class IntersectComposite extends CompositeDecorator {
	#predicate;
	#events;
	constructor(events, predicate, object) {
		super(object);
		this.#predicate = predicate;
		this.#events = events;
	}

	update() {
		super.update();
		//Apply intersectDetect foreach IntersectBody
		//If true, call body1.interaction(body2); body2.interaction(body1)
		const objects = this.get().filter(obj => obj instanceof IGameObject);
		// console.log(objects);
		objects.forEach(obj1 => {
			objects.forEach(obj2 => {
				if (obj2 != obj1 &&
					this.#predicate(obj1, obj2)) {
					// console.log(obj1, obj2);
					this.#events.call('intersect', { object1: obj1, object2: obj2 });
				}
			});
		});
	}
}