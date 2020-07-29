import { throwIfNotInstance } from "../../tools/utils";
import { IPlugBus, IPlugin } from "../common";

export class PlugBus extends IPlugBus {

	#plugged = [];

	plugin(object) {
		throwIfNotInstance(object, IPlugin);
		if (object == this)
			throw (`${object} is this!`);
		this.#plugged.push(object);
		object.init(this);
	}

	update() {
		this.#plugged.forEach(plugged => {
			plugged.update();
		});
		super.update();
	}
}