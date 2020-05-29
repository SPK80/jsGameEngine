import { throwIfNotInstance } from "../tools/utils.js";
import { ObjectDecorator } from "./objectDecorator.js";

export class AnimatedObject extends ObjectDecorator {
	#image;
	#animator;
	constructor(image, animations, object) {
		super(throwIfNotInstance(object, PositionObject));
		this.#animator = new Animator(animations);
		this.#image = throwIfNotInstance(image, Image);
	}

	_startAnimation() {
		const lastAction = this.#acceptedActions[this.#acceptedActions.length - 1]
		if (lastAction == undefined) return;
		if (lastAction == 'idle')
			this.#animator.start('idle');
		else
			this.#animator.start(lastAction, this.#moveSpeed);
	}

	_draw(render) {
		const frame = this.#animator.curFrame;
		if (frame) {
			render.tile({
				image: this.#image,
				absoluteTilePos: true,
				x: this.x,
				y: this.y,
				width: this.#width,
				height: this.#height,
				tileX: frame.x,
				tileY: frame.y,
				tileWidth: frame.wi,
				tileHeight: frame.he
			});
		}
	}

	update(drivers) {
		// if (this.object.input) {
		// 	const commands = drivers.input.get();
		// 	if (commands && commands.length > 0)
		// 		commands.forEach(com => {
		// 			this._input(com);
		// 		});
		// 	else this._input('idle');
		// }

		this._startAnimation(drivers.input);

		this._draw(drivers.render);
		// this._move();

		// this.#acceptedActions = [];
	}
}

// const obj = new ControlledObject(new EmptyObject({
// 	name: 'obj',
// 	pos: new Vector3(),
// 	size: new Vector3(),
// 	render: ...
// }), input);