const rootElement = document.querySelector('.js-game-root');

// Add canvas and canvas-wrapper to DOM, under .js-game-root
const fragment = Object.assign(document.createElement('template'), {
	innerHTML: `
		<div class="canvas-wrapper">
			<canvas width="1920" height="1080" />
		</div>
	`,
}).content;
rootElement.appendChild(fragment);

// Draw an image to the canvas
const canvasElement = rootElement.querySelector('canvas');
const context = canvasElement.getContext('2d');
const image = Object.assign(new Image(), { src: 'hello-world.png' });
image.addEventListener('load', () => {
	context.drawImage(image, 0, 0);
});