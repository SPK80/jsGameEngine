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

	path(params) {
		this.#stile(params);
		this.#context.beginPath();
		params.forEach(element => {
			if (element.type == 'line') {

			}
		});

		this.#context.stroke();

	}

	text(params) {
		this.#stile(params);
		if (params.fill) this.#context.fillText(params.text, params.x, params.y);
		else this.#context.strokeText(params.text, params.x, params.y);
	}

	tiling(params) {
		const tileX = (params.tileX) ? params.tileX : 0;
		const tileY = (params.tileY) ? params.tileY : 0;
		const tileWidth = (params.tileWidth) ? params.tileWidth : params.width;
		const tileHeight = (params.tileHeight) ? params.tileHeight : params.height;

		this.#context.drawImage(params.image, tileWidth * tileX, tileHeight * tileY, params.width, params.height, params.x, params.y, params.width, params.height);
	}

	path(params) {
		const _context = this.#context;

		this.#stile(params);
		this.#context.beginPath();

		params.elements.forEach(el => {

			if (el.type == 'moveTo') {
				this.#context.moveTo(el.x, el.y);
			}
			else if (el.type == 'lineTo') {
				this.#context.lineTo(el.x, el.y);
			}
			else if (el.type == 'arc') {
				this.#context.arc(el.x, el.y, el.radius, el.startAngle, el.endAngle);
			}
			else if (el.type == 'arcTo') {
				this.#context.arcTo(el.x1, el.y1, el.x2, el.y2, el.radius);
			}
		});

		if (params.fill) _context.fill();
		else _context.stroke();
	}

}