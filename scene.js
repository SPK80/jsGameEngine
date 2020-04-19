export class Scene {
	#decors = [];
	#persons = [];
	#render = null;
	constructor(render) {
		this.#render = render;
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