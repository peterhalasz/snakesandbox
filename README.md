# snakesandbox

Write your own snake brain.

## Installation

```
yarn install
```

## Running the app

```
yarn dev
```

# How to

To implement your own snake brain in Javascript, simply change the `moveSnake(snake, food)` function.

The function receives two arguments each time the snake faces the
decision, where to go next.

The first argument `snake` is a representation of the snake's state. It's a simple array containing the coordinates of the rectangles
building up the snake. For example, before making the first move the function receives this as the first argument:

```
[{"x":5,"y":1},{"x":4,"y":1},{"x":3,"y":1},{"x":2 "y":1},{"x":1,"y":1}]
```

The second argument (food) is a representation of the next food our
snake should eat. It's an object containing the coordinates of the
food on the map. For example: `{'{"x":13,"y":15}'}`.

Last but not least, the return value. It's important that the `moveSnake` funcation returns a valid direction for the snake before making a move. Make sure that function returns on of the following strings on each invocation: `"left"|"right"|"up"|"down"`.

In order for the parser to work correctly, please don't change the class declaration and the return value at the end of the block.

```
class SnakeBrain {
    moveSnake(snake, food) {
        ...
    }
}

return new SnakeBrain();
```

# Deployment

The application is currently deployed on [vercel](https://vercel.com/).

https://snakesandbox.vercel.app/

# Contribution

Yes
