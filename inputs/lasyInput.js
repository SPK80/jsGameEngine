import { Input } from "./input.js";

export class LasyInput extends Input {
	#getter = () => [];

	init(getter) {
		this.#getter = getter;
	}

	get() {
		return this.#getter();
	}
}