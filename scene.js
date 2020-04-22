export class Scene {
	#settings = null;
	#decors = [];
	#persons = [];

	#controlled = [];
	constructor(id, settings) {
		this.#settings = settings.scenes[id];
	}

	draw(render) {
		this.#decors.forEach(decor => {
			decor.draw(render);
		});

		this.#persons.forEach(person => {
			person.draw(render);
		});
	}

	input(inputDriver) {

	}

	sound(soundDriver) {

	}

}