import { IPlugin } from "../common";

export class Plugin extends IPlugin {
	#bus;
	get bus() { return this.#bus; }

	init(bus) {
		this.#bus = bus;
	}
}
