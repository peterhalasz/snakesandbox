import React from "react";

interface Props {
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

const Output = ({ canvasRef }: Props) => (
  <canvas ref={canvasRef} width={600} height={600} />
);

export default Output;
