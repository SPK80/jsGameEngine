import { Render } from "./render.js";

export class CanvasRender extends Render {

	#width = 200;
	#height = 200;
	#scale = 1;
	#backgroundColor = 0;
	#context = null;
	get context() { return this.#context }

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
	}

	constructor(_width, _height, _backgroundColor, _scale = 1.0) {
		super();
		this.updateContext({
			width: _width,
			height: _height,
			backgroundColor: _backgroundColor,
			scale: _scale
		});
	}

	clear() {
		this.#context.clearRect(0, 0, this.#width, this.#height);
	}

	#stile = function name(params) {
		if (params.fill) {
			this.#context.fillStyle = params.color;
		}
		else {
			this.#context.strokeStyle = params.color;
			this.#context.lineWidth = params.lineWidth;
		}
	}

	circle(params) {
		this.#stile(params);
		this.#context.beginPath();
		this.#context.arc(params.x, params.y, params.radius, 0, Math.PI * 2);
		if (params.fill) this.#context.fill();
		else this.#context.stroke();
	}

	text(params) {
		this.#stile(params);
		if (params.fill) this.#context.fillText(params.text, params.x, params.y);
		else this.#context.strokeText(params.text, params.x, params.y);
	}

	sprite(params) {
		// var image = new Image();		
		// image.src = params.path;
		ctx.drawImage(params.image, 0, params.height * params.currentFrame, params.width, params.height, 0, 0, params.width, params.height);
	}


}