window.onclose = () => {
	console.log('pause', engine);
	engine.pause();

	console.log('save', settings);
	settings.save();
}

export const tiles = new Image();
tiles.addEventListener("load", () => {
	
}, false);
tiles.src = 'tiles.png';