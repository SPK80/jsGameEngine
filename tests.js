import { CanvasRender } from "./graphics/canvasRender.js";

const render = new CanvasRender(800, 600, '#aaaaaa');
render.clear();
render.circle({ x: 300, y: 200, radius: 100, color: 'red', fill: true });
// render.rect({ x: 300, y: 200, width: 100, height: 50, color: 'blue', fill: false });