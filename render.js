class Render {

}

export class CanvasRender extends Render {

	// #gameContext = null;
	#width = 200;
	#height = 200;
	#scale = 1;
	#backgroundColor = 0;
	#context = null;


	updateContext(params) {
		function isValidNumber(value) {
			return (Number(value) != NaN);
		}
		function isValidHex(value) {
			if (value[0] != '#') return false;
			return (parseInt(value.replace('#', ''), 16) != NaN)
		}

		var haveParam = false;

		if (isValidNumber(params.width)) { this.#width = params.width; haveParam = true; }
		if (isValidNumber(params.height)) { this.#height = params.height; haveParam = true; }
		if (isValidNumber(params.scale)) { this.#scale = params.scale; haveParam = true; }
		if (isValidHex(params.backgroundColor)) { this.#backgroundColor = params.backgroundColor; haveParam = true; }
		if (!haveParam) return; //no one param!

		var cnv = null;
		var cnvs = document.getElementsByTagName('canvas');
		if (cnvs == undefined || cnvs.length < 1) cnv = document.createElement('canvas');
		else cnv = cnvs[0];


		cnv.width = this.#width;
		cnv.height = this.#height;
		cnv.style.position = 'fixed';
		cnv.style.left = 0;
		cnv.style.top = 0;
		cnv.style.width = this.#width * this.#scale + 'px';
		cnv.style.height = this.#height * this.#scale + 'px';
		cnv.style.backgroundColor = this.#backgroundColor;
		document.body.appendChild(cnv);

		this.#context = cnv.getContext('2d');

		// this.#gameContext = new GameContext(_width, _height, _backgroundColor, _scale);
	}

	constructor(_width, _height, _backgroundColor, _scale = 1.0) {
		super();
		this.updateContext({
			width: _width,
			height: _height,
			backgroundColor: _backgroundColor,
			scale: _scale
		});
		// this.#log = new gameLog(this.#gameContext.context, 0, 0, 4);
		// this.clearLog();

		this.update = (context) => console.log('update not implemented');
	}

	#pause = false;

	// #gameObjects = new GameObjects();

	// getGameObject(key){
	//     return this.#gameObjects.get(key);
	// }

	start() {
		const _engine = this;
		this.#pause = false;
		// console.log('start');

		requestAnimationFrame(function engine() {
			if (!_engine.#pause) {
				_engine.update(_engine.#context); //implemented outside
			}
			requestAnimationFrame(engine);
		});
	}

	clearContext() {
		this.#context.clearRect(0, 0, this.#width, this.#height);
	}

	pause() {
		if (this.#pause) return;
		// this.#log.add('Engine.pause');
		this.#pause = true;
	}
}