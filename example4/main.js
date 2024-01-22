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

// Set up the canvas context for drawing
const canvasElement = rootElement.querySelector('canvas');
const context = Object.assign(canvasElement.getContext('2d'), {
	fillStyle: '#ddddff',
	shadowBlur: 25,
	shadowColor: '#0000ff',
	font: '48px sans-serif',
	textAlign: 'center',
});

// Loop 20 times, with i=0, i=1, ..., i=19
for (let i = 0; i < 20; i++) {
	context.fillRect(956, 54.8 * i, 8, 38.8); // Draw one rectangle in the dashed line down the center
}

context.fillText('3', 845, 50); // Draw player 1's score
context.fillText('0', 1045, 50); // Draw player 2's score
context.fillRect(705, 525, 30, 30); // Draw the "ball"
context.fillRect(35, 490, 30, 100); // Draw paddle #1
context.fillRect(1855, 490, 30, 100); // Draw paddle #2