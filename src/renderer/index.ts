export interface Renderer {
  renderSnake: (snake: Array<{ x: number; y: number }>) => void;
  renderFood: (food: { x: number; y: number }) => void;
  resetMap: () => void;
}

export default class RendererImpl {
  private canvasContext: CanvasRenderingContext2D;
  private tileSize: number;
  private mapSize: number;

  constructor(
    canvasContext: CanvasRenderingContext2D,
    tileSize: number,
    mapSize: number
  ) {
    this.canvasContext = canvasContext;
    this.tileSize = tileSize * 10;
    this.mapSize = mapSize * 10;
  }

  renderSnake(snake: Array<{ x: number; y: number }>) {
    const reverseSnake = [...snake];

    reverseSnake.reverse();

    reverseSnake.map(({ x, y }, idx) => {
      this.canvasContext.fillStyle =
        idx === reverseSnake.length - 1 ? "green" : "#272822";

      this.canvasContext.fillRect(
        x * this.tileSize,
        y * this.tileSize,
        this.tileSize,
        this.tileSize
      );
    });
  }

  renderFood(food: { x: number; y: number }) {
    this.canvasContext.fillStyle = "red";
    this.canvasContext.fillRect(
      food.x * this.tileSize,
      food.y * this.tileSize,
      this.tileSize,
      this.tileSize
    );
  }

  resetMap() {
    this.canvasContext.clearRect(0, 0, this.mapSize * 10, this.mapSize * 10);

    this.canvasContext.globalAlpha = 0.1;
    this.canvasContext.fillStyle = "white";
    this.canvasContext.fillRect(
      0,
      0,
      (this.mapSize * this.tileSize) / 10,
      (this.mapSize * this.tileSize) / 10
    );

    this.canvasContext.globalAlpha = 0.3;
    this.canvasContext.strokeStyle = "black";
    this.canvasContext.strokeRect(
      0,
      0,
      (this.mapSize * this.tileSize) / 10,
      (this.mapSize * this.tileSize) / 10
    );

    this.canvasContext.globalAlpha = 1;
  }
}
