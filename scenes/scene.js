export class Scene {
	// #settings = null;
	#displayed = [];
	#controlled = [];
	#sounding = [];
	constructor(id, settings) {
		// this.#settings = settings.scenes[id];
	}
	#objects = [];
	add(gameObject) {
		this.#objects.push(gameObject);
	}

	init(params) {

	}

	close(params) {

	}

	update(params) {
		if (params.render) {
			render.clear();
			this.#objects.forEach(obj => {
				if (obj.draw) obj.draw(render);
			});
		}

	}

	draw(render) {
		render.clear();
		this.#objects.forEach(obj => {
			if (obj.draw) obj.draw(render);
		});
	}

	input(inputDriver) {
		this.#objects.forEach(obj => {
			if (obj.input) obj.input(inputDriver);
		});

	}

	sound(soundDriver) {
		this.#objects.forEach(obj => {
			if (obj.sound) obj.sound(soundDriver);
		});
	}
}