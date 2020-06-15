import { throwIfNotNumber, throwIfNotHex } from "../tools/utils.js"
import { AbstractRender } from "./abstractRender.js";

export class CanvasRender extends AbstractRender {
	#width = 200;
	#height = 200;
	#scale = 1;
	#bkColor = 0;
	#ctx = null;

	constructor(wi, he, bkColor, scale = 1) {
		super();
		this.updateContext(wi, he, bkColor, scale);
	}

	updateContext(wi, he, bkColor, scale) {
		// let haveParam = false;
		// if (isValidNumber(wi)) { this.#width = wi; haveParam = true; }
		// if (isValidNumber(he)) { this.#height = he; haveParam = true; }
		// if (isValidNumber(scale)) { this.#scale = scale; haveParam = true; }
		// if (isValidHex(bkColor)) { this.#bkColor = bkColor; haveParam = true; }
		// if (!haveParam) return; //no one param!
		this.#width = throwIfNotNumber(wi);
		this.#height = throwIfNotNumber(he);
		this.#scale = throwIfNotNumber(scale);
		this.#bkColor = bkColor;

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
		cnv.style.backgroundColor = this.#bkColor;
		document.body.appendChild(cnv);

		this.#ctx = cnv.getContext('2d');
	}

	///Implement AbstractRender
	clear(x, y, wi, he) {
		this.#ctx.clearRect(x, y, wi, he);
	}

	clear() {
		this.#ctx.clearRect(0, 0, this.#width, this.#height);
	}

	rect(x, y, wi, he, color, fill) {
		if (fill) {
			this.#ctx.fillStyle = color;
			this.#ctx.fillRect(x, y, wi, he, color);
		} else {
			this.#ctx.strokeStyle = color;
			this.#ctx.rect(x, y, wi, he, color);
		}
	}

	circle(x, y, radius, color, fill) {
		this.#ctx.beginPath();
		if (fill) {
			this.#ctx.fillStyle = color;
		} else {
			this.#ctx.strokeStyle = color;
		}
		this.#ctx.arc(x, y, radius, color, 0, Math.PI * 2);
		if (params.fill) this.#ctx.fill();
		else this.#ctx.stroke();
	}

	text(x, y, text, color, font, fill) {
		if (font) this.#ctx.font = font; //'50px serif';
		this.#ctx.beginPath();
		if (fill) {
			this.#ctx.fillStyle = color;
			this.#ctx.fillText(text, x, y);
		}
		else {
			this.#ctx.strokeStyle = color;
			this.#ctx.strokeText(text, x, y);
		}
	}

	sprite(x, y, wi, he, image) {
		this.#ctx.drawImage(image, x, y, wi, he);
	}

	tile(x, y, wi, he, tiX, tiY, tiWi, tiHe, image) {
		this.#ctx.drawImage(
			image,
			tiX, tiY, tiWi, tiHe,
			x, y, wi, he
		);
	}
}