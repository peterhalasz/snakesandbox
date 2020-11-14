import * as React from "react";

import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";

interface Props {
  isInfoModalOpen: boolean;
  handleCloseModal: () => void;
}

export default ({ isInfoModalOpen, handleCloseModal }: Props) => (
  <Dialog open={isInfoModalOpen} onClose={handleCloseModal}>
    <DialogTitle>Welcome to Snakesandbox</DialogTitle>
    <>
      <div>
        <p>
          To get started with Smartsneks, click start to see your snake using
          the code on the left side to get some food.
        </p>
        <p>I'm sure you can do better than that though.</p>
        <p>
          To implement your own snake brain in Javascript, simply change the{" "}
          <code>moveSnake(snake, food)</code> function.
        </p>
        <p>
          The function receives two arguments each time the snake faces the
          decision, where to go next.
        </p>
        <p>
          The first argument (snake) is a representation of the snake's state.
          It's a simple array containing the coordinates of the rectangles
          building up the snake. For example, before making the first move the
          function receives this as the first argument:
          <code>
            {
              '[{"x":5,"y":1},{"x":4,"y":1},{"x":3,"y":1},{"x":2,"y":1},{"x":1,"y":1}]'
            }
          </code>
        </p>
        <p>
          The second argument (food) is a representation of the next food our
          snake should eat. It's an object containing the coordinates of the
          food on the map. For example:
          <code>{'{"x":13,"y":15}'}</code>
        </p>
        <p>
          Last but not least, the return value. It's important that the{" "}
          <code>moveSnake</code> funcation returns a valid direction for the
          snake before making a move. Make sure that function returns on of the
          following strings on each invocation:{" "}
          <code>{"left|right|up|down"}</code>
        </p>
        <p>
          In order for the parser to work correctly, please don't change the
          class declaration and the return value at the end of the block.
          <code style={{ display: "block" }}>
            {
              "class SnakeBrain { moveSnake(snake, food) { ... } } return new SnakeBrain();"
            }
          </code>
        </p>
        <p>Have fun!</p>
      </div>
    </>
    <>
      <div>
        Icons made by{" "}
        <a
          href="[https://www.flaticon.com/authors/freepik](https://www.flaticon.com/authors/freepik)"
          title="Freepik"
        >
          Freepik
        </a>{" "}
        from{" "}
        <a
          href="[https://www.flaticon.com/](https://www.flaticon.com/)"
          title="Flaticon"
        >
          [www.flaticon.com](http://www.flaticon.com/)
        </a>
      </div>
    </>
  </Dialog>
);
