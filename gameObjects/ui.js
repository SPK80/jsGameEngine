import { IGameObject } from "./common.js";
import { EmptyDrawing } from "./drawings/drawings.js";

export class UiText extends IGameObject {
	get name() { return 'UserInterface' };

	#assembly;
	#body;
	get body() { return this.#body };

	constructor(renderBody, render) {
		super();
		this.#body = renderBody;
		this.#assembly = new EmptyDrawing(render, this.body);
	}

	#text = this.name;
	set text(value) { this.#text = value }
	get text() { return this.#text }

	#drawText = function () {
		this.#assembly.render.text(
			this.#body.pos.x,
			this.#body.pos.y + 12,
			this.#text,
			'red',
			'12px arial',
			true);
	}

	update() {
		this.#assembly.update();
		this.#drawText();
	}
}