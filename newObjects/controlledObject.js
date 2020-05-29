import { ObjectDecorator } from "./objectDecorator";
import { throwIfNotInstance } from "../tools/utils";
import { Input } from "../inputs/input";

export class ControlledObject extends ObjectDecorator {
	#input;

	constructor(object, input) {
		super(object);
		// this.#object = throwIfNotInstance(object, ObjectInterface);
		this.#input = throwIfNotInstance(input, Input);
	}

	update() {
		const commands = this.#input.get();
		commands.forEach(command => {
			this.#object[command]();
		});
		// this.#object.input(commands);
		this.#object.update();
	}
}