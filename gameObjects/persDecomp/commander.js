import { Input } from "../../inputs/input.js";

export class Commander extends Input {
	#input;

	#ignoreRepeating = true;
	#accepted = [];

	constructor(input, ignoreRepeating = true) {
		this.#input = input;
		this.#ignoreRepeating = ignoreRepeating;
	}

	get() {
		_filter = (command) => {
			const includes = this.#accepted.includes(command);
			if (this.#ignoreRepeating && includes) return;

			this.#accepted.push(command);
		}

		const commands = this.#input.get();
		if (commands && commands.length > 0)
			commands.forEach(com => {
				_filter(com);
			});
		else _filter('idle');

		return this.#accepted;
	}
}
