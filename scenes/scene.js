export class Scene {
	// #settings = null;
	#displayed = [];
	#controlled = [];
	#sounding = [];
	constructor(id, settings) {
		// this.#settings = settings.scenes[id];
	}

	addControlled(personage) {
		this.#controlled.push(personage);
	}

	addDisplayed(personage) {
		this.#displayed.push(personage);
	}

	addSounding(personage) {
		this.#sounding.push(personage);
	}

	draw(render) {
		render.clear();
		this.#displayed.forEach(person => {
			person.draw(render);
		});
	}

	input(inputDriver) {

		this.#controlled.forEach(person => {
			person.input(inputDriver);
		});

	}

	sound(soundDriver) {

		this.#sounding.forEach(person => {
			person.sound(soundDriver);
		});
	}
}