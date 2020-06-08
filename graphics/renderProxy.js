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

	push(func, x,y)  {
		if (this.#sortByY) {
			const index = bublleFindIndex(y, this.#items.length,
				(i) => this.#items[i].pos.z);
			this.#items.splice(index, 0, item);
		} else this.#items.push(func);

	}

	clear(x, y, wi, he) {
		this.push(this.#render.clear(x, y, wi, he));

	}

	update(sortBy) {

	}
}