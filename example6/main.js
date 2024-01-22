import { createInitialState, createGetNextState } from './state.js';
import { configuration as renderConfiguration, createFragmentAtSize, getContextFromFragment, createRenderAtSize } from './render.js';

const configuration = Object.freeze({
	rootSelector: '.js-game-root',
	size: Object.freeze({ width: 1920, height: 1080 }),
	maxFramesPerSecond: 1000 / 60,
});

const createMain = () => {
	const fragment = createFragmentAtSize(configuration.size);
	const context = getContextFromFragment(fragment);
	const getNextState = createGetNextState(configuration, renderConfiguration);
	const render = createRenderAtSize(configuration.size);
	const state = createInitialState(configuration, renderConfiguration);

	let lastTimestamp = window.performance.now();
	const gameLoop = (timestamp) => {
		window.requestAnimationFrame(gameLoop);
		const sinceLastTimestamp = timestamp - lastTimestamp;
		if (sinceLastTimestamp >= configuration.maxFramesPerSecond) {
			const nextState = getNextState(state);
			const renderedCanvas = render(nextState);
			context.clearRect(0, 0, configuration.size.width, configuration.size.height); // side-effect (NEW: must clear the previous frame)
			context.drawImage(renderedCanvas, 0, 0); // side-effect
			lastTimestamp = timestamp; // side-effect
			Object.assign(state, nextState); // side-effect
		}
	};

	document.querySelector(configuration.rootSelector).appendChild(fragment); // side-effect

	return gameLoop;
};

const main = createMain();

main();