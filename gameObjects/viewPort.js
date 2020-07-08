import { IGameObject, IUpdating } from "./common.js";
import { throwIfNotInstance } from "../tools/utils.js";

export class ViewPort extends IGameObject {

	#name = 'ViewPort';
	get name() { return this.#name }
	get body() { return this.#closer }
	#closer;

	constructor(name, closer) {
		super();
		this.#closer = throwIfNotInstance(closer, IUpdating);
		this.#name = name;
	}
	update() {
		this.#closer.update();
	}
}