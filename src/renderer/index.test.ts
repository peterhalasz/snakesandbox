import RendererImpl, { Renderer } from ".";

describe("renderer", () => {
  const TILE_SIZE = 5;
  const MAP_SIZE = 10;

  let renderer: Renderer;
  let canvasContextMock: any;

  beforeEach(() => {
    canvasContextMock = {
      fillRect: jest.fn(),
    };

    renderer = new RendererImpl(canvasContextMock, TILE_SIZE, MAP_SIZE);
  });

  describe("renderSnake", () => {
    it("should render the snake", () => {
      const testSnake = [
        { x: 1, y: 3 },
        { x: 2, y: 3 },
        { x: 3, y: 3 },
      ];

      renderer.renderSnake(testSnake);

      expect(canvasContextMock.fillStyle).toEqual("black");
      expect(canvasContextMock.fillRect.mock.calls).toEqual([
        [
          testSnake[0].x * TILE_SIZE * 10,
          testSnake[0].y * TILE_SIZE * 10,
          TILE_SIZE * 10,
          TILE_SIZE * 10,
        ],
        [
          testSnake[1].x * TILE_SIZE * 10,
          testSnake[1].y * TILE_SIZE * 10,
          TILE_SIZE * 10,
          TILE_SIZE * 10,
        ],
        [
          testSnake[2].x * TILE_SIZE * 10,
          testSnake[2].y * TILE_SIZE * 10,
          TILE_SIZE * 10,
          TILE_SIZE * 10,
        ],
      ]);
    });
  });

  describe("renderFood", () => {
    it("should render food", () => {
      const testFood = { x: 5, y: 7 };

      renderer.renderFood(testFood);

      expect(canvasContextMock.fillStyle).toEqual("red");
      expect(canvasContextMock.fillRect.mock.calls).toEqual([
        [
          testFood.x * TILE_SIZE * 10,
          testFood.y * TILE_SIZE * 10,
          TILE_SIZE * 10,
          TILE_SIZE * 10,
        ],
      ]);
    });
  });

  describe("resetMap", () => {
    it("should clear the canvas", () => {
      renderer.resetMap();

      expect(canvasContextMock.fillStyle).toEqual("grey");
      expect(canvasContextMock.fillRect.mock.calls).toEqual([
        [0, 0, MAP_SIZE * TILE_SIZE * 100, MAP_SIZE * TILE_SIZE * 100],
      ]);
    });
  });
});
