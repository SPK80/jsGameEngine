export class InputDevice {
	constructor() {
		if (this.inited) {
			console.log('InputDevice inited!');
			return
		}
		this.inited = true;
	}
}