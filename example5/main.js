import {
	configuration as renderConfiguration,
	createFragmentAtSize,
	getContextFromFragment,
	createRenderAtSize
} from './render.js';

const configuration = Object.freeze({
	rootSelector: '.js-game-root',
	size: Object.freeze({ width: 1920, height: 1080 }),
});

const main = () => {
	// Setup
	const fragment = createFragmentAtSize(configuration.size);
	const context = getContextFromFragment(fragment);
	const render = createRenderAtSize(configuration.size);

	// "State" is data that is expected to change
	const state = {
		player1: { score: 3, paddle: { y: (configuration.size.height / 2) - (renderConfiguration.paddles.height / 2) } },
		player2: { score: 0, paddle: { y: (configuration.size.height / 2) - (renderConfiguration.paddles.height / 2) } },
		ball: { x: (configuration.size.width / 2) - 240, y: (configuration.size.height / 2) - (renderConfiguration.ball.height / 2) },
	};

	// Draw the frame
	const renderedCanvas = render(state);

	// Perform side-effects (separated from the other code)
	context.drawImage(renderedCanvas, 0, 0);
	document.querySelector(configuration.rootSelector).appendChild(fragment);
};

main();