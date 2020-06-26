import { Engine } from "./engine.js";
import { Settings } from "./settings.js";
import { CanvasRender } from "./graphics/canvasRender.js";
import { WalkMan } from "./gameObjects/walkMan.js";
import { KeyboardInput } from "./inputs/keyboardInput.js";
import { KeyMap } from "./inputs/keyMap.js";
import { GrassScene } from "./scenes/grassScene.js";
import { PositionRender } from "./graphics/positionRender.js";
import { Closer } from "./gameObjects/closer.js";
import { Body, BodyDecorator } from "./gameObjects/bodies.js";
import { ViewPort } from "./gameObjects/viewPort.js";
import { WhiteWolker } from "./gameObjects/whiteWolker.js";
import { RndWolk } from "./inputs/rndWolk.js";
import { Vector2, Vector3 } from "./geometry/vectors.js";
import { IBody } from "./gameObjects/common.js";
import { throwIfNotInstance } from "./tools/utils.js";

const settings = new Settings();

const engine = new Engine(settings);

window.onclose = () => {
	console.log('pause', engine);
	engine.pause();

	console.log('save', settings);
	settings.save();
}

const tiles = new Image();
tiles.addEventListener("load", () => {

	const kbInput = new KeyboardInput(
		new KeyMap([
			{ action: 'moveUp', keys: [KeyMap.KEYS.UP] },
			{ action: 'moveDown', keys: [KeyMap.KEYS.DOWN] },
			{ action: 'moveRight', keys: [KeyMap.KEYS.RIGHT] },
			{ action: 'moveLeft', keys: [KeyMap.KEYS.LEFT] },
		])
	);

	const renderBody = new Body(0, 0, 0, settings.render.width, settings.render.height);
	const render = new PositionRender(renderBody,
		new CanvasRender(settings.render.width, settings.render.height, ''));

	const wm = new WalkMan('WalkMan', 300, 200, kbInput, tiles, render);
	const viewPort = new ViewPort('ViewPort',
		new Closer(wm.body, 0.05, renderBody));

	const scene = new GrassScene(render, tiles);
	scene.addObject(wm);
	scene.addObject(viewPort);

	const wws = new WWSpawner(scene, render, 2000, 10,
		new ScaledBody(new Vector3(5, 5),
			new ShiftedBody(new Vector3(-25, -25), wm.body)));

	engine.start(scene);

}, false);
tiles.src = 'tiles.png';


class WWSpawner {
	constructor(scene, render, interval, startNum, area) {
		let i = startNum;
		if (area instanceof IBody) {
			console.log(area);

			setInterval(() => {
				scene.addObject(
					new WhiteWolker(
						"WhiteWolker" + i,
						Math.random() * area.size.x + area.pos.x,
						Math.random() * area.size.y + area.pos.y,
						new RndWolk(),
						tiles,
						render
					)
				);
				i++;
			}, interval);
		}
		else if (Array.isArray(area))
			setInterval(() => {
				const pos = area[Math.random() * (area.length - 1)];
				scene.addObject(
					new WhiteWolker(
						"WhiteWolker" + i,
						pos.x,
						pos.y,
						new RndWolk(),
						tiles,
						render
					)
				)
			}
			);
	}
}


class ShiftedBody extends BodyDecorator {
	#shift;
	constructor(shift, object) {
		super(object);

		this.#shift = throwIfNotInstance(shift, Vector2);
	}

	get pos() {
		const pos = super.pos;
		return new Vector3(pos.x, pos.y, pos.z).
			add(this.#shift);
	}
}

class ScaledBody extends BodyDecorator {
	#scale;
	constructor(scale, object) {
		super(object);
		this.#scale = throwIfNotInstance(scale, Vector2);
	}

	get size() {
		const size = super.size;
		return new Vector3(super.size.x * this.#scale.x, super.size.y * this.#scale.y, super.size.z);
	}
}
