export class Engine {
	#settings = null;
	// #render = null;
	// #scene = null;
	// #keyBoard = null;
	// #mouse = null;

	constructor(settings) {
		this.#settings = settings.engine;
		// this.#keyBoard = new KeyBoard();
		// this.#mouse = new Mouse(this.settings.render.scale);

		// this.#render = new Render(
		// 	this.#settings.render.width,
		// 	this.#settings.render.height,
		// 	this.#settings.render.scale,
		// 	this.#settings.render.backgroundColor
		// );

		// this.#scene = new Scene(this.#render);

	}

	start(scene) {
		const _this = this;
		this.#pause = false;
		requestAnimationFrame(function render() {
			if (!_this.#pause) {
				scene.input(inputDriver);
				scene.draw(render);
				scene.sound(soundDriver);
			}
			requestAnimationFrame(render);
		});
	}
	#pause = false;
	pause() {
		this.#pause = true;
	}
	resume() {
		this.#pause = false;
	}
}