import Engine from ".";

describe("engine", () => {
  const MAP_SIZE = 15;

  let engine;
  let rendererMock;
  let onGameOverMock;

  beforeEach(() => {
    rendererMock = {};
    onGameOverMock = jest.fn();

    engine = new Engine(rendererMock, MAP_SIZE, onGameOverMock);
  });

  describe("createNewFood", () => {
    it("should create new food", () => {
      engine.createNewFood();

      expect(engine.food.x).toBeGreaterThan(-1);
      expect(engine.food.x).toBeLessThan(MAP_SIZE);
      expect(engine.food.y).toBeGreaterThan(-1);
      expect(engine.food.y).toBeLessThan(MAP_SIZE);
    });
  });

  describe("checkFoodCollision", () => {
    it("should return false if no food collision", () => {
      engine.initializeSnake();

      engine.food.x = 10;
      engine.food.y = 10;

      expect(engine.checkFoodCollision()).toBe(false);
    });

    it("should return true if food collides with snake head", () => {
      engine.initializeSnake();

      engine.food.x = engine.snake[0].x;
      engine.food.y = engine.snake[0].y;

      expect(engine.checkFoodCollision()).toBe(true);
    });

    it("should return true if food collides with snake body", () => {
      engine.initializeSnake();

      engine.food.x = engine.snake[3].x;
      engine.food.y = engine.snake[3].y;

      expect(engine.checkFoodCollision()).toBe(true);
    });
  });

  describe("checkSelfCollision", () => {
    it("should return false if the snake does not collide with itself", () => {
      engine.initializeSnake();

      expect(engine.checkSelfCollision()).toBe(false);
    });

    it("should return true if the snake head equals to a part of the body", () => {
      engine.initializeSnake();

      engine.snake[0].x = 1;
      engine.snake[0].y = 1;

      expect(engine.checkSelfCollision()).toBe(true);
    });
  });

  describe("checkWallCollision", () => {
    it("should return false if the snake does not collide with the wall", () => {
      engine.initializeSnake();

      expect(engine.checkWallCollision()).toBe(false);
    });

    it("should return true if the snake head equals to a part of the wall", () => {
      engine.initializeSnake();

      engine.snake[0].x = -1;
      engine.snake[0].y = -1;
      expect(engine.checkWallCollision()).toBe(true);

      engine.snake[0].x = -1;
      engine.snake[0].y = 10;
      expect(engine.checkWallCollision()).toBe(true);

      engine.snake[0].x = 10;
      engine.snake[0].y = -1;
      expect(engine.checkWallCollision()).toBe(true);

      engine.snake[0].x = MAP_SIZE;
      engine.snake[0].y = MAP_SIZE;
      expect(engine.checkWallCollision()).toBe(true);

      engine.snake[0].x = 10;
      engine.snake[0].y = MAP_SIZE;
      expect(engine.checkWallCollision()).toBe(true);

      engine.snake[0].x = MAP_SIZE;
      engine.snake[0].y = 10;
      expect(engine.checkWallCollision()).toBe(true);
    });
  });

  describe("moveSnake", () => {
    it("moves the snake up for up", () => {
      engine.initializeSnake();
      engine.snake[0].x = 5;
      engine.snake[0].y = 5;

      engine.moveSnake("up");

      expect(engine.snake[0].x).toBe(5);
      expect(engine.snake[0].y).toBe(4);
    });

    it("moves the snake down for down", () => {
      engine.initializeSnake();
      engine.snake[0].x = 5;
      engine.snake[0].y = 5;

      engine.moveSnake("down");

      expect(engine.snake[0].x).toBe(5);
      expect(engine.snake[0].y).toBe(6);
    });

    it("moves the snake left for left", () => {
      engine.initializeSnake();
      engine.snake[0].x = 5;
      engine.snake[0].y = 5;

      engine.moveSnake("left");

      expect(engine.snake[0].x).toBe(4);
      expect(engine.snake[0].y).toBe(5);
    });

    it("moves the snake right for right", () => {
      engine.initializeSnake();
      engine.snake[0].x = 5;
      engine.snake[0].y = 5;

      engine.moveSnake("right");

      expect(engine.snake[0].x).toBe(6);
      expect(engine.snake[0].y).toBe(5);
    });

    it("adds a new element to the snake on food collision", () => {
      engine.initializeSnake();

      engine.food.x = 6;
      engine.food.y = 1;

      engine.moveSnake("right");

      expect(engine.snake.length).toBe(6);
      expect(engine.snake[0].x).toBe(6);
      expect(engine.snake[0].y).toBe(1);
    });

    it("does not add a new element to the snake if no food collision", () => {
      engine.initializeSnake();

      engine.food.x = 10;
      engine.food.y = 10;

      engine.moveSnake("right");

      expect(engine.snake.length).toBe(5);
      expect(engine.snake[0].x).toBe(6);
      expect(engine.snake[0].y).toBe(1);
    });
  });
});
