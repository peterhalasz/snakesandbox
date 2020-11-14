export default `class SnakeBrain {
    moveSnake(snake, food) {
      let nextDirection = this.getNextDirection(snake, food);
      nextDirection = this.evadeSelf(snake, nextDirection);
      return nextDirection;
    }
  
    getNextDirection(snake, food) {
      const [snakeHead] = snake;
  
      if (snakeHead.x > food.x) {
        return 'left';
      } else if (snakeHead.x < food.x) {
        return 'right';
      } else if (snakeHead.y > food.y) { 
        return 'up';
      } else if (snakeHead.y < food.y) {
        return 'down';
      }
    }
  
    evadeSelf(snake, nextDirection) {
      const [snakeHead, ...snakeBody] = snake;
  
      if (
        nextDirection === 'left' &&
        snakeBody.some(
          part => part.x === snakeHead.x - 1 && part.y === snakeHead.y
        )
      ) {
        return 'up';
      } else if (
        nextDirection === 'right' &&
        snakeBody.some(
          part => part.x === snakeHead.x + 1 && part.y === snakeHead.y
        )
      ) {
        return 'down';
      } else if (
        nextDirection === 'up' &&
        snakeBody.some(
          part => part.x === snakeHead.x && part.y === snakeHead.y - 1
        )
      ) {
        return 'left';
      } else if (
        nextDirection === 'down' &&
        snakeBody.some(
          part => part.x === snakeHead.x && part.y === snakeHead.y + 1
        )
      ) {
        return 'right';
      } else {
        return nextDirection;
      }
    }
  }
  
  return new SnakeBrain();
`;
