import { IGameObject } from "./common.js";

export class PersonageDecorator extends IGameObject {
	#personage;
	get name() { return this.#personage.name; }
	get body() { return this.#personage.body; }

	constructor(personage) {
		super();
		this.#personage = throwIfNotInstance(personage, IGameObject);
	}

	update() {
		this.#personage.update();
	}
}

export class InteractPersonageDecorator extends PersonageDecorator {
	#interactSource;

	constructor(interactSource, personage) {
		super(personage);
		this.#interactSource = interactSource;
	}

	update() {
		const is = this.#interactSource.get();
		if (is && is.length > 0) {
			console.log('interac', this, is);
		}
		super.update();
	}
}