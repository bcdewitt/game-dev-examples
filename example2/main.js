const rootElement = document.querySelector('.js-game-root');

// Draw an image to the canvas
const canvasElement = rootElement.querySelector('canvas');
const context = canvasElement.getContext('2d');
const image = Object.assign(new Image(), { src: 'hello-world.png' });

image.addEventListener('load', () => {
	context.drawImage(image, 0, 0);
});
