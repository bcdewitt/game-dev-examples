# README

This example better organizes our code into different files with exported functions. This also focuses on separating side-effects from the larger portions of code with the goal of making functions easier to understand and easier to test. Because we can name functions and variables in plain English, you'll also notice our code becomes self-documenting this way (no need for comments).

`createRenderAtSize` may be slightly confusing at first, since it is a function that creates and returns another function. There are alternative ways of writing this, but this approach allows you to stick to a simpler syntax (among a few other benefits). If you're familiar with classes, you can think of these two as being pretty much equivalent, functionality-wise...
```js
class Renderer {
    #netDashes = [{ x: 955, y: 0, width: 10, height: 30 }, { x: 955, y: 45, width: 10, height: 30 }, ...];

    render(state) {
        for (const netDash of this.#netDashes) {
            context.fillRect(netDash.x, netDash.y, netDash.width, netDash.height);
        }
    }
}

const renderer = new Renderer();
renderer.render(state);
```

...and the closure version...

```js
const createRender = () => {
    const netDashes = [{ x: 955, y: 0, width: 10, height: 30 }, { x: 955, y: 45, width: 10, height: 30 }, ...];

    return (state) => {
        for (const netDash of netDashes) {
            context.fillRect(netDash.x, netDash.y, netDash.width, netDash.height);
        }
    };
};

const render = createRender();
render(state);
```