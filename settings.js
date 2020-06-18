export class Settings {
	render = {
		width: 800,
		height: 600,
		scale: 1.5,
		backgroundColor: '#004020',
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