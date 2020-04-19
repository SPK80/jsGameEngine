export class Settings {
	render = {
		width: 200,
		height: 200,
		scale: 1,
		backgroundColor: 0,
	}

	#path = 'settings.json';
	constructor(path) {
		if (path != undefined) this.#path = path;
		this.load();
	}

	save() {
		console.log('save this.#path not implemented');
	}

	load() {
		console.log('load this.#path not implemented');
	}
}