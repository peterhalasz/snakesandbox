import React from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

interface Props {
  isInfoModalOpen: boolean;
  handleCloseModal: () => void;
}

export default function InfoDialog({
  isInfoModalOpen,
  handleCloseModal,
}: Props) {
  return (
    <Dialog open={isInfoModalOpen} onClose={handleCloseModal}>
      <DialogTitle>Hey there!</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To get started, click start to see your snake using the code in the
          editor to move around and grab some food.
        </DialogContentText>
        <DialogContentText>
          I'm sure you can do better than that though.
        </DialogContentText>
        <DialogContentText>
          To implement your own snake brain in Javascript, simply change the{" "}
          <code>moveSnake(snake, food)</code> function.
        </DialogContentText>
        <DialogContentText>
          The function receives two arguments each time the snake faces the
          decision, where to go next.
        </DialogContentText>
        <DialogContentText>
          The first argument (snake) is a representation of the snake's state.
          It's a simple array containing the coordinates of the rectangles
          building up the snake. For example, before making the first move the
          function receives this as the first argument:
          <code>
            {
              '[{"x":5,"y":1},{"x":4,"y":1},{"x":3,"y":1},{"x":2,"y":1},{"x":1,"y":1}]'
            }
          </code>
        </DialogContentText>
        <DialogContentText>
          The second argument (food) is a representation of the next food our
          snake should eat. It's an object containing the coordinates of the
          food on the map. For example:
          <code>{'{"x":13,"y":15}'}</code>
        </DialogContentText>
        <DialogContentText>
          Last but not least, the return value. It's important that the{" "}
          <code>moveSnake</code> funcation returns a valid direction for the
          snake before making a move. Make sure that function returns on of the
          following strings on each invocation:{" "}
          <code>{"left|right|up|down"}</code>
        </DialogContentText>
        <DialogContentText>
          In order for the parser to work correctly, please don't change the
          class declaration and the return value at the end of the block.
          <code style={{ display: "block" }}>
            {
              "class SnakeBrain { moveSnake(snake, food) { ... } } return new SnakeBrain();"
            }
          </code>
        </DialogContentText>
        <DialogContentText>Have fun!</DialogContentText>
      </DialogContent>
    </Dialog>
  );
}
