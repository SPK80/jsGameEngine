// import { UpdateDecorator } from "../gameObjects/persDecomp/interface.js";
// import { Body } from "../gameObjects/persDecomp/body.js";
// import { Moving } from "../gameObjects/persDecomp/moving.js";
// import { Animating } from "../gameObjects/persDecomp/animating.js";
// import { Input } from "../inputs/input.js";
// import { Frame } from "../animations/frame.js";
// import { Animation } from "../animations/animation.js";
// import { AnimDrawing, Drawing } from "../gameObjects/persDecomp/drawing.js";

// import { throwIfNotInstance } from "../tools/utils.js";
// import { Vector3, Vector2 } from "../geometry/vectors.js";
// import { AbstractRender } from "../graphics/renders.js";
// import { Animator } from "../animations/animator.js";


// class State extends Input {
// 	#counter = 0;

// 	get() {
// 		const states = ['moveRight', 'moveLeft'];
// 		return states[this.#counter++];
// 	}
// }
// const moveDelay = 100;
// const order = [0, 1, 2];
// const a = {

// 	moveRight: new Animation([
// 		new Frame(0 * 32, 10 * 32, 32, 32, moveDelay),
// 		new Frame(1 * 32, 10 * 32, 32, 32, moveDelay),
// 		new Frame(2 * 32, 10 * 32, 32, 32, moveDelay)
// 	], order, true),

// 	moveLeft: new Animation([
// 		new Frame(0 * 32, 9 * 32, 32, 32, moveDelay),
// 		new Frame(1 * 32, 9 * 32, 32, 32, moveDelay),
// 		new Frame(2 * 32, 9 * 32, 32, 32, moveDelay)
// 	], order, true),
// }
// const s = new State();
// const b = new Body(0, 1, 2, 3);
// const dec = new UpdateDecorator(
// 	new Animating(s, a, b)
// );

// const p = dec.property('getFrame');
// console.log(p);
// console.log(p.add({ x: 1, y: 0, z: 1 }));

// console.log(dec);



// class Pers {
// 	// #pos;
// 	// #size;
// 	#name;
// 	get name() { return this.#name };

// 	#body;
// 	#drawing;

// 	constructor(name, body, drawing) {
// 		this.#name = name;
// 		// this.#pos = new Vector3(pos.x, pos.y);
// 		// this.#size = new Vector3(size.x, size.y);
// 		this.#body = body;//new Moving(input, this.#pos);
// 		this.#drawing = drawing;//new AnimDrawing(render, image, this.#size, animations, input);

// 	}

// 	update() {
// 		this.#body.update();
// 		this.#drawing.update();
// 	}
// }


class Input {
	get() {
		return ['1', '2'];
	}
}


const movingObj = new Drawing('render', new Image(32, 32),
	new Moving(new Body(0, 1, 32, 32), new Input()));

movingObj.update();

// const pers = new Pers('pers1',
// 	new Moving(body, input),
// 	new AnimDrawing(render, image, body, input));
// Drawing(render, image, body);
// Animation(input, animations)



// const body = new Body(p, size);
// const p = new AnimDrawing(render, image, body, Animation(input, animations))
// new Moving(input, body));