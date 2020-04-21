export class Render {
	// start(gameLoop) {
	// 	const _this = this;
	// 	this.#pause = false;
	// 	requestAnimationFrame(function render() {
	// 		if (!_this.#pause) {
	// 			gameLoop(_this);
	// 		}
	// 		requestAnimationFrame(render);
	// 	});
	// }

	// #pause = false;
	// pause() {
	// 	this.#pause = true;
	// }
	// resume() {
	// 	this.#pause = false;
	// }

	clear(params) { throw ('clear not implemented') }
	text(params) { throw ('text not implemented') }
	rect(params) { throw ('rect not implemented') }
	circle(params) { throw ('circle not implemented') }
	point(params) { throw ('point not implemented') }
	line(params) { throw ('line not implemented') }
	path(params) { throw ('path not implemented') }
	sprite(params) { throw ('sprite not implemented') }

}
