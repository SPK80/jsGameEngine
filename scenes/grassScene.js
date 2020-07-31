import { EmptyDrawing, ImageDrawing } from "../gameObjects/drawings/drawings.js";
import { Scene } from "./scene.js";
import { Vector3 } from "../geometry/vectors.js";
import { SortingComposite, ResistantComposite } from "../gameObjects/composite.js";
import { Body } from "../gameObjects/bodies/bodies.js";
import { IntersectComposite } from "../gameObjects/phisics/intersect.js";
import { Ui as UiText } from "../gameObjects/ui.js";
import { WalkMan } from "../gameObjects/walkMan.js";
import { ViewPort } from "../gameObjects/viewPort.js";
import { BodyCloser } from "../gameObjects/bodies/bodyCloser.js";
import { WhiteWolker } from "../gameObjects/whiteWolker.js";
import { RndWolk } from "../inputs/rndWolk.js";
import { Spawner } from "../gameObjects/spawner.js";
import { IBody } from "../gameObjects/bodies/interfaces.js";

export class GrassScene extends Scene {
	#landscape = { update() { } };
	#controlledPersonage;
	get controlledPersonage() { return this.#controlledPersonage }

	selectPersonage(name) {
		this.#controlledPersonage = this.getObject(name);
		this.#controlledPersonageBody.setBody(this.#controlledPersonage.body);
	}

	#uiText;

	#controlledPersonageBody = new BodyProxy();

	constructor(render, input, tiles) {
		const grass = new Image();
		grass.addEventListener("load", () => {
			this.#landscape = new ImageDrawing(
				grass,
				new EmptyDrawing(render, new Body(0, 0, 0, grass.width, grass.height))
			);
		});
		grass.src = "grass.jpg";

		super([]);

		const viewPort = new ViewPort('ViewPort',
			new BodyCloser(this.#controlledPersonageBody), 0.05, render.body);
		this.addObject(viewPort);

		this.#uiText = new UiText(viewPort.body, render);
		this.addObject(this.#uiText);
		this.subscribeEvent('intersect', (obj1, obj2) => { this.#uiText.text = 'intersect' });

		this.addObject(new WalkMan('WalkMan', 400, 300, input, tiles, render));
		this.selectPersonage('WalkMan');
		console.log(this.#controlledPersonageBody);


		new WwSpawner(2000, this, this.#controlledPersonageBody, tiles, render);

		this.decorateAssembly(SortingComposite);
		this.decorateAssembly(ResistantComposite, 0.1);
		this.decorateAssembly(IntersectComposite, this.events,
			(p1, p2) => {
				if (p1.name == 'ViewPort' || p2.name == 'ViewPort') return false;
				if (p1.name == 'UserInterface' || p2.name == 'UserInterface') return false;
				const body1 = p1.body;
				const body2 = p2.body;
				const dist = new Vector3().add(body1.pos).sub(body2.pos).length;
				return dist < 0.5 * (body1.size.length + body2.size.length);
			});


	}

	update() {
		this.#landscape.update();
		super.update();
		this.#uiText.text = '~~~~~~~~~~~~~';
	}
}

class WwSpawner extends Spawner {
	constructor(interval, scene, spot, tiles, render) {
		super(10, () => interval, (i) => {
			scene.addObject(
				new WhiteWolker(
					"WhiteWolker" + i,
					Math.random() * spot.size.x * 2 + spot.pos.x - spot.size.x,
					Math.random() * spot.size.y * 2 + spot.pos.y - spot.size.y,
					new RndWolk(),
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
	get size() {return this.#body.size }

	setBody(body) {
		if (body)
			this.#body = body;
	}
}