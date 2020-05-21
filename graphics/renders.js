import { isValidNumber, isValidHex } from "../tools/utils"

class RenderInterface {
	#children=[];
	newChild(x,y,wi,he){
		this.#children.push(new LocalRender(x,y,wi,he, this));
	}

	clear() { throw ('not implemented') }
	clear(x, y, wi, he) { throw ('not implemented') }
	rect(x, y, wi, he, color) { throw ('not implemented') }
	fillRect(x, y, wi, he, color) { throw ('not implemented') }
	circle(x, y, radius, color) { throw ('not implemented') }
	text(x, y, text, color, font) { throw ('not implemented') }
	sprite(x, y, wi, he, image) { throw ('not implemented') }
	tile(x, y, wi, he, tiX, tiY, tiWi, tiHe, image) { throw ('not implemented') }
}

class LocalRender extends RenderInterface {
	#x = 0;
	#y = 0;
	#width = 200;
	#height = 200;
	#parent;

	constructor(x, y, wi, he, parent) {
		super();
		this.#x = x;
		this.#y = y;
		this.#width = wi;
		this.#width = he;
		this.#parent = parent;
	}

	clear(x, y, wi, he) {
		this.#parent.clear(x + this.#x, y + this.#y, wi, he);
	}

	clear() {
		this.#parent.clear(this.#x, this.#y, this.#width, this.#height);
	}

	rect(x, y, wi, he, color) {
		this.#parent.rect(x + this.#x, y + this.#y, wi, he, color);
	}

	fillRect(x, y, wi, he, color) {
		this.#parent.fillRect(x + this.#x, y + this.#y, wi, he, color);
	}

	circle(x, y, radius, color) {
		this.#parent.circle(x + this.#x, y + this.#y, radius, color);
	}

	text(x, y, text, color, font) {
		this.#parent.text(x + this.#x, y + this.#y, text, color, font);
	}

	sprite(x, y, wi, he, image) {
		this.#parent.sprite(x + this.#x, y + this.#y, wi, he, image);
	}

	tile(x, y, wi, he, tiX, tiY, tiWi, tiHe, image) {
		this.#parent.tile(x + this.#x, y + this.#y, wi, he, tiX, tiY, tiWi, tiHe, image)
	}
}

class Render extends RenderInterface {
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

		let haveParam = false;
		if (isValidNumber(wi)) { this.#width = wi; haveParam = true; }
		if (isValidNumber(he)) { this.#height = he; haveParam = true; }
		if (isValidNumber(scale)) { this.#scale = scale; haveParam = true; }
		if (isValidHex(bkColor)) { this.#bkColor = bkColor; haveParam = true; }
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
		cnv.style.backgroundColor = this.#bkColor;
		document.body.appendChild(cnv);

		this.#ctx = cnv.getContext('2d');
	}


	clear(x, y, wi, he) {
		this.#ctx.clear(x, y, wi, he);
	}

	clear() {
		this.#ctx.clear(this.#x, this.#y, this.#width, this.#height);
	}

	rect(x, y, wi, he, color) {
		this.#ctx.strokeStyle = color;
		this.#ctx.rect(x + this.#x, y + this.#y, wi, he, color);
	}

	fillRect(x, y, wi, he, color) {
		this.#ctx.fillStyle = color;
		this.#ctx.fillRect(x + this.#x, y + this.#y, wi, he, color);
	}

	circle(x, y, radius, color) {
		this.#ctx.circle(x + this.#x, y + this.#y, radius, color);
	}

	text(x, y, text, color, font) {
		this.#ctx.text(x + this.#x, y + this.#y, text, color, font);
	}

	sprite(x, y, wi, he, image) {
		this.#ctx.sprite(x + this.#x, y + this.#y, wi, he, image);
	}

	tile(x, y, wi, he, tiX, tiY, tiWi, tiHe, image) {
		this.#ctx.tile(x + this.#x, y + this.#y, wi, he, tiX, tiY, tiWi, tiHe, image)
	}
}