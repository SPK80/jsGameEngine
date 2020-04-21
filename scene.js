export class Scene {
	#settings = null;

	#decors = [];
	#persons = [];
	#render = null;
	constructor(render) {
		this.#settings = settings.engine;
	}

	draw() {
		this.#decors.forEach(decor => {
			decor.draw(render);
		});

		this.#persons.forEach(person => {
			person.draw(render);
		});
	}
}