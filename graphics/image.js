export function loadImage(path) {
	return new Promise((resolve, reject) => {
		const image = new Image();
		image.addEventListener('load', () => {
			resolve(image)
		}, false);
		image.addEventListener("error", err => reject(err));
		image.src = path;
	}
	)
}