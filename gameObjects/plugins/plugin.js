import { IPlugin } from "./interfaces.js";

export class Plugin extends IPlugin {
	#bus;
	get bus() { return this.#bus; }

	init(bus) {
		this.#bus = bus;
	}
}
