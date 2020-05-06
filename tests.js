import { CanvasRender } from "./graphics/canvasRender.js";

const render = new CanvasRender(800, 600, '#bbbf');
render.clear();

render.rect({ x: 400, y: 300, width: 100, height: 50, color: 'blue', fill: true });
render.circle({ x: 100, y: 100, radius: 50, color: 'green', fill: false });
render.circle({ x: 300, y: 200, radius: 100, color: 'red', fill: true });
render.rect({ x: 100, y: 300, width: 100, height: 50, color: 'red', fill: false });
render.text({ text: '1234', x: 10, y: 500, font: '50px arial', color: '#909', fill: false });

const image = new Image();
image.addEventListener("load", function () {
	render.tile({
		image: image,
		x: 100,
		y: 200,
		width: image.width / 4,
		height: image.height / 4
	});
}, false);
image.src = 'Koala.jpg';