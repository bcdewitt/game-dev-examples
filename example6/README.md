# README

Here, we introduce the game loop and some animation/updates. The `render.js` file is the same, but we've updated `main.js` and added the `state.js` file. "State" is data that is expected to change and represents a snapshot of your application. You can theoretically save this data and restore it to pick right back up where you left off. (If you've ever played with emulators and roms, the word "save state" will sound familiar)

Part of the updates includes collision detection for bouncing the ball. It checks for collision between the ball and the paddles, and between the ball and the top/bottom edges. In the next example, we'll work on moving the paddles and scoring.
