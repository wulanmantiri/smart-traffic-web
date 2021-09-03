import { RefObject, useRef } from 'react';

const useCanvas = (): {
  canvasNode: RefObject<HTMLCanvasElement>;
  drawOnCanvas: (imageBase64: string) => void;
} => {
  const canvasNode = useRef<HTMLCanvasElement>(null);

  const drawOnCanvas = (imageBase64: string): void => {
    const canvas = canvasNode.current as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    const image = new Image();
    image.onload = function () {
      ctx?.drawImage(image, 0, 0);
    };
    image.src = `data:image/png;base64,${imageBase64}`;
  };

  return {
    canvasNode,
    drawOnCanvas,
  };
};

export default useCanvas;
