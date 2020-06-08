import { AbstractRender } from "./AbstractRender";
import { bublleFindIndex } from "../tools/bublleFind";

export class SortRenderProxy extends AbstractRender {
	#render;
	#order = [];
	#sortByY = true;

	constructor(render, sortByY) {
		this.#render = render;
		this.#sortByY = sortByY ? true : false;

	}

	push(func, x, y) {
		if (this.#sortByY) {
			const index = bublleFindIndex(y, this.#order.length,
				(i) => this.#order[i].y);
			this.#order.splice(index, 0, func);
		} else this.#order.push(func);

	}

	clear(x, y, wi, he) {
		this.push(this.#render.clear(x, y, wi, he));

	}

	update(sortBy) {
		this.#order.forEach(it => {
			it.func();
		});
	}
}