import { Render } from "./render.js";

export class CanvasRender extends Render {

	#width = 200;
	#height = 200;
	#scale = 1;
	#backgroundColor = 0;
	#ctx = null;
	get context() { return this.#ctx }

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

		this.#ctx = cnv.getContext('2d');
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
		this.#ctx.clearRect(0, 0, this.#width, this.#height);
	}

	#stile = function (params) {

		if (params.fill) {
			this.#ctx.fillStyle = params.color;
		}
		else {
			this.#ctx.strokeStyle = params.color;
			this.#ctx.lineWidth = params.lineWidth;
		}
		this.#ctx.beginPath();
	}

	#endDraw = function (params) {
		if (params.fill) this.#ctx.fill();
		else this.#ctx.stroke();
	}

	rect(params) {
		this.#stile(params);
		this.#ctx.rect(params.x, params.y, params.width, params.height);
		this.#endDraw(params);
	}

	fillRect(params) {
		this.#ctx.fillStyle = params.color;
		this.#ctx.fillRect(params.x, params.y, params.width, params.height);
	}

	circle(params) {
		const startAngle = 0;
		if (params.startAngle != undefined) startAngle = params.startAngle;
		const endAngle = Math.PI * 2;
		if (params.endAngle != undefined) endAngle = params.endAngle;

		this.#stile(params);
		this.#ctx.arc(params.x, params.y, params.radius, startAngle, endAngle);
		this.#endDraw(params);
	}

	text(params) {
		this.#stile(params);
		if (params.font != undefined)
			this.#ctx.font = params.font; //'50px serif';
		if (params.fill) this.#ctx.fillText(params.text, params.x, params.y);
		else this.#ctx.strokeText(params.text, params.x, params.y);
	}

	// tile(params){
	// 	this.#ctx.drawImage(
	// 		params.image,
	// 		params.tileX,
	// 		params.tileY,
	// 		params.tileWidth,
	// 		params.tileHeight,
	// 		params.x,
	// 		params.y,
	// 		params.width,
	// 		params.height
	// 	);
	// }

	tile(params) {
		let tileX = (params.tileX) ? params.tileX : 0;
		let tileY = (params.tileY) ? params.tileY : 0;

		const tileWidth = (params.tileWidth) ? params.tileWidth : params.width;
		const tileHeight = (params.tileHeight) ? params.tileHeight : params.height;

		if (!params.absoluteTilePos) {
			tileX = tileX * tileWidth
			tileY = tileY * tileHeight
		}

		console.log(params);

		this.#ctx.drawImage(
			params.image,
			tileX,
			tileY,
			tileWidth,
			tileHeight,
			params.x,
			params.y,
			params.width,
			params.height
		);
	}

	sprite(params) {
		this.#ctx.drawImage(
			params.image,
			params.x,
			params.y,
			params.width,
			params.height
		);
	}

	path(params) {
		const _context = this.#ctx;

		this.#stile(params);

		params.elements.forEach(el => {

			if (el.type == 'moveTo') {
				this.#ctx.moveTo(el.x, el.y);
			}
			else if (el.type == 'lineTo') {
				this.#ctx.lineTo(el.x, el.y);
			}
			else if (el.type == 'arc') {
				this.#ctx.arc(el.x, el.y, el.radius, el.startAngle, el.endAngle);
			}
			else if (el.type == 'arcTo') {
				this.#ctx.arcTo(el.x1, el.y1, el.x2, el.y2, el.radius);
			}
		});

		this.#endDraw(params);
	}

}