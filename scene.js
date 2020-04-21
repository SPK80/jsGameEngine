export class Scene {
	#settings = null;

	#decors = [];
	#persons = [];
	#render = null;
	constructor(id, settings) {
		this.#settings = settings.scenes[id];

	}

	draw() {
		this.#decors.forEach(decor => {
			decor.draw(this.#render);
		});

		this.#persons.forEach(person => {
			person.draw(this.#render);
		});
	}
}