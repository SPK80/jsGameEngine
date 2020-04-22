export class Settings {
	render = {
		width: 600,
		height: 400,
		scale: 1,
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