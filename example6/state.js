export const createInitialState = (configuration, renderConfiguration) => ({
	player1: { score: 3, paddle: { y: (configuration.size.height / 2) - (renderConfiguration.paddles.height / 2) } },
	player2: { score: 0, paddle: { y: (configuration.size.height / 2) - (renderConfiguration.paddles.height / 2) } },
	ball: { velocity: { x: 8, y: 7.2 }, x: (configuration.size.width / 2) - 240, y: (configuration.size.height / 2) - (renderConfiguration.ball.height / 2) },
});

export const createGetNextState = (configuration, renderConfiguration) => (previousState) => {
	const state = structuredClone(previousState);

	// Move the ball
	state.ball.x += state.ball.velocity.x;
	state.ball.y += state.ball.velocity.y;

	if (
		(
			// AABB collision detection with first paddle (see https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection#axis-aligned_bounding_box)
			state.ball.x < renderConfiguration.paddles.margin + renderConfiguration.paddles.width &&
			state.ball.x + renderConfiguration.ball.width > renderConfiguration.paddles.margin &&
			state.ball.y < state.player1.paddle.y + renderConfiguration.paddles.height &&
			state.ball.y + renderConfiguration.ball.height > state.player1.paddle.y
		) || (
			// AABB collision detection with second paddle
			state.ball.x < (configuration.size.width - renderConfiguration.paddles.margin) + renderConfiguration.paddles.width &&
			state.ball.x + renderConfiguration.ball.width > (configuration.size.width - renderConfiguration.paddles.margin) &&
			state.ball.y < state.player2.paddle.y + renderConfiguration.paddles.height &&
			state.ball.y + renderConfiguration.ball.height > state.player2.paddle.y
		)
	) {
		state.ball.velocity.x = state.ball.velocity.x * -1; // Reverse direction
	}

	// Collision detection with top or bottom of the screen
	if (state.ball.y <= 0 || (state.ball.y + renderConfiguration.ball.height) > configuration.size.height) {
		state.ball.velocity.y = state.ball.velocity.y * -1; // Reverse direction
	}

	return state;
};