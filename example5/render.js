export const configuration = Object.freeze({
    net: Object.freeze({ dashCount: 20, gap: 16, width: 8 }),
    scores: Object.freeze({ fromCenterX: 100, fromTop: 50 }),
    paddles: Object.freeze({ width: 30, height: 100, margin: 50 }),
    ball: Object.freeze({ width: 30, height: 30 }),
});

// NOTE: This function doesn't modify anything from outside of itself - "referentially transparent" / aka a "pure function".
export const createFragmentAtSize = ({ width, height }) => Object.assign(document.createElement('template'), {
    innerHTML: `
        <div class="canvas-wrapper">
            <canvas width="${width}" height="${height}" />
        </div>
    `,
}).content;

export const getContextFromFragment = (fragment) => fragment.querySelector('canvas')?.getContext('2d');

// NOTE: This function creates and returns another function.
// The returned function is called a "closure" because it holds references to data outside of its definition. (Ex. netDashes)
export const createRenderAtSize = ({ width, height }) => {
    const centerX = width / 2;
    
    // Pre-calculate where the dashes will be drawn
    const netHeight = (height - ((configuration.net.dashCount - 1) * configuration.net.gap)) / configuration.net.dashCount;
    const netX = centerX - (configuration.net.width / 2); // calculate once, reuse value for each loop
    const netDashes = Array.from({ length: configuration.net.dashCount }, (_, i) => ({
        x: netX,
        y: (netHeight + configuration.net.gap) * i,
        width: configuration.net.width,
        height: netHeight,
    }));

    // render function (closure)
    return (state) => {
        const canvasElement = Object.assign(document.createElement('canvas'), { width, height });
    	const context = Object.assign(canvasElement.getContext('2d'), {
            fillStyle: '#ddddff',
            shadowBlur: 25,
            shadowColor: '#0000ff',
            font: '48px sans-serif',
            textAlign: 'center',
        });

        // Draw the dashed line down the center (the "net")
        for (const netDash of netDashes) {
            context.fillRect(netDash.x, netDash.y, netDash.width, netDash.height);
        }

        // Draw the scores
        context.fillText(state.player1.score.toString(), centerX - configuration.scores.fromCenterX, configuration.scores.fromTop);
        context.fillText(state.player2.score.toString(), centerX + configuration.scores.fromCenterX, configuration.scores.fromTop);

        // Draw the "ball"
        context.fillRect(state.ball.x, state.ball.y, configuration.ball.width, configuration.ball.height);

        // Draw paddle #1
        context.fillRect(configuration.paddles.margin, state.player1.paddle.y, configuration.paddles.width, configuration.paddles.height);

        // Draw paddle #2
        context.fillRect(width - configuration.paddles.margin, state.player2.paddle.y, configuration.paddles.width, configuration.paddles.height);

        return canvasElement;
    };
};