import { Renderer } from "../renderer";

export interface Engine {
  start: (code: string) => void;
  stop: () => void;
}

export default class EngineImpl implements Engine {
  private renderer: Renderer;
  private mapSize: number;
  private onGameOver: () => void;
  private onScoreChange: (newScore: number) => void;
  private onError: (message: string) => void;
  private interval: NodeJS.Timeout;

  private food: { x: number; y: number };
  private snake: Array<{ x: number; y: number }>;
  private score: number;

  constructor(
    renderer: Renderer,
    mapSize: number,
    onGameOver: () => void,
    onScoreChange: (newScore: number) => void,
    onError: (message: string) => void
  ) {
    this.renderer = renderer;
    this.mapSize = mapSize;
    this.onGameOver = onGameOver;
    this.onScoreChange = onScoreChange;
    this.onError = onError;

    this.food = { x: 0, y: 0 };
    this.snake = [];

    this.score = 0;

    this.renderer.resetMap();
  }

  createNewFood() {
    this.food.x = Math.floor(Math.random() * Math.floor(this.mapSize));
    this.food.y = Math.floor(Math.random() * Math.floor(this.mapSize));
  }

  checkFoodCollision() {
    const isFoodCollision = this.snake.some(
      (snakeElement) =>
        snakeElement.x === this.food.x && snakeElement.y === this.food.y
    );

    if (isFoodCollision) {
      this.createNewFood();
      this.onScoreChange(++this.score);
    }

    return isFoodCollision;
  }

  initializeSnake() {
    this.snake = [];

    const snakeLength = 5;
    for (let i = snakeLength; i > 0; i -= 1) {
      this.snake.push({ x: i, y: 1 });
    }
  }

  checkSelfCollision() {
    const [snakeHead, ...snakeBody] = this.snake;

    return snakeBody.some(({ x, y }) => snakeHead.x === x && snakeHead.y === y);
  }

  checkWallCollision() {
    const [snakeHead] = this.snake;

    return (
      snakeHead.x === this.mapSize ||
      snakeHead.x === -1 ||
      snakeHead.y === this.mapSize ||
      snakeHead.y === -1
    );
  }

  moveSnake(direction: string) {
    const newSnakeHead = { x: this.snake[0].x, y: this.snake[0].y };

    if (direction === "up") {
      newSnakeHead.y -= 1;
    } else if (direction === "down") {
      newSnakeHead.y += 1;
    } else if (direction === "left") {
      newSnakeHead.x -= 1;
    } else if (direction === "right") {
      newSnakeHead.x += 1;
    } else {
      this.onError(`${direction} is not a valid direction`);
    }

    this.snake.unshift(newSnakeHead);

    const foodCollision = this.checkFoodCollision();
    if (!foodCollision) {
      this.snake.pop();
    }
  }

  start(code: string) {
    this.renderer.resetMap();
    this.score = 0;
    this.onScoreChange(this.score);

    const snakeBrain = Function(code)();

    this.initializeSnake();

    this.food = { x: 15, y: 1 };
    this.interval = setInterval(() => {
      this.renderer.resetMap();
      this.renderer.renderFood(this.food);

      const newDirection = snakeBrain.moveSnake(this.snake, this.food);
      this.moveSnake(newDirection);

      this.renderer.renderSnake(this.snake);

      if (this.checkSelfCollision() || this.checkWallCollision()) {
        clearInterval(this.interval);

        this.onGameOver();
      }
    }, 50);
  }

  stop() {
    this.renderer.resetMap();
    clearInterval(this.interval);
    this.onGameOver();
  }
}
