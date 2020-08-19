export class TaskInput {
	#input;
	#map;

	constructor(input, map) {
		this.#input = input;
		this.#map = map;
	}

	get() {
		const keys = this.#input.get()
			.map(key => this.#map[key])
			.filter(v => v);
	}
}