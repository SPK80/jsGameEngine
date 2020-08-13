import { Scene } from "./scene.js";
import { Vector3 } from "../geometry/vectors.js";
import { SortingComposite, ResistantComposite } from "../gameObjects/composite.js";
import { Body } from "../gameObjects/bodies/bodies.js";
import { IntersectComposite } from "../gameObjects/phisics/intersect.js";
import { WalkMan } from "../gameObjects/walkMan.js";
import { ViewPort } from "../gameObjects/viewPort.js";
import { BodyCloser } from "../gameObjects/bodies/bodyCloser.js";
import { WhiteWolker as WhiteWalker } from "../gameObjects/whiteWolker.js";
import { RndWalk } from "../inputs/rndWolk.js";
import { Spawner } from "../gameObjects/spawner.js";
import { IBody } from "../gameObjects/bodies/interfaces.js";
import { UiText } from "../gameObjects/ui.js";
import { GameEvent } from "../gameObjects/events/gameEvent.js";
import { InfinitLandscape } from "../gameObjects/landscape.js";

export class GrassScene extends Scene {

	#onIntersect = new GameEvent('intersect');
	#uiText;

	#controlledPersonage;
	get controlledPersonage() { return this.#controlledPersonage }

	#controlledPersonageBody = new BodyProxy();
	selectPersonage(name) {
		if (this.#controlledPersonage)
			this.#controlledPersonage.setInput(new RndWalk());
		this.#controlledPersonage = this.objects.get(name);
		this.#controlledPersonage.setInput(this.input);
		this.#controlledPersonageBody.setBody(this.#controlledPersonage.body);
	}

	#landscape;
	constructor(render, input, tiles) {
		super(input);
		const grass = new Image();
		grass.addEventListener("load", () => {
			this.objects.add(this.#landscape = new InfinitLandscape('grass', grass, render));
		});
		grass.src = "grass.jpg";

		this.decorateObjects(SortingComposite);
		this.decorateObjects(ResistantComposite, 0.1);
		this.decorateObjects(IntersectComposite, this.#onIntersect,
			(p1, p2) => {
				if (p1.name == 'ViewPort' || p2.name == 'ViewPort') return false;
				if (p1.name == 'UserInterface' || p2.name == 'UserInterface') return false;
				const body1 = p1.body;
				const body2 = p2.body;
				const dist = new Vector3().add(body1.pos).sub(body2.pos).length;
				return dist < 0.5 * (body1.size.length + body2.size.length);
			});

		const viewPort = new ViewPort('ViewPort',
			new BodyCloser(this.#controlledPersonageBody, 0.05, render.body));
		this.objects.add(viewPort);

		this.#uiText = new UiText(viewPort.body, render);
		this.objects.add(this.#uiText);

		const wm = new WalkMan('WalkMan', 400, 300, tiles, render);		
		wm.setInput(new RndWalk());
		this.objects.add(wm);
		this.selectPersonage('WalkMan');

		// new WwSpawner(2000, this, this.#controlledPersonageBody, tiles, render);
		const spot = this.#controlledPersonageBody;

		const ww = new WhiteWalker(
			'WhiteWolker',
			Math.random() * spot.size.x * 2 + spot.pos.x - spot.size.x,
			Math.random() * spot.size.y * 2 + spot.pos.y - spot.size.y,
			tiles,
			render
		);
		ww.setInput(new RndWalk());
		this.objects.add(ww);

		this.#onIntersect.subscribe((obj1, obj2) => {
			this.#uiText.text = 'intersect';
			// setTimeout(() => this.#uiText.text = '~~~~~~~~~~~~~', 1000);

		});

		let count = 5;
		const timer = setInterval(() => {
			count--;
			if (count < 0) {
				clearInterval(timer);
				if (this.#controlledPersonage.name == 'WalkMan')
					this.selectPersonage('WhiteWolker');
				else
					if (this.#controlledPersonage.name == 'WhiteWolker')
						this.selectPersonage('WalkMan');
				count = 5;
			}
			else
				this.#uiText.text = `${count}`;

		}, 1000);

	}

	update() {
		super.update();
	}
}

class WwSpawner extends Spawner {
	constructor(interval, scene, spot, tiles, render) {
		super(10, () => interval, (i) => {
			scene.addObject(
				new WhiteWalker(
					"WhiteWolker" + i,
					Math.random() * spot.size.x * 2 + spot.pos.x - spot.size.x,
					Math.random() * spot.size.y * 2 + spot.pos.y - spot.size.y,
					new RndWalk(),
					tiles,
					render
				)
			);
		}).start();
	}
}

class BodyProxy extends IBody {
	#body = new Body();

	constructor(body) {
		super();
		this.setBody(body);
	}

	get pos() { return this.#body.pos }
	get size() { return this.#body.size }

	setBody(body) {
		if (body)
			this.#body = body;
	}
}