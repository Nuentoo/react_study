'use client';

import { useState } from 'react';
import Box from './Box';
import Background from './Background';
import { Position } from './type/type';

const initialPosition = { x: 0, y: 0 };

const BK_SQUARE_SIZE = 600;
const BOX_SQUARE_SIZE = 100;

export default function GrabBox() {
  const [shape, setShape] = useState({
    color: 'orange',
    position: initialPosition,
  });

  const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setShape({
      ...shape,
      color: e.target.value,
    });
  };

  const handleMove = (dx: Position['x'], dy: Position['y']) => {
    const newX = shape.position.x + dx;
    const newY = shape.position.y + dy;
    // Boxの移動範囲を制限
    const limitedX = Math.max(
      initialPosition.x,
      Math.min(newX, BK_SQUARE_SIZE - BOX_SQUARE_SIZE + initialPosition.x),
    );
    const limitedY = Math.max(
      initialPosition.y,
      Math.min(newY, BK_SQUARE_SIZE - BOX_SQUARE_SIZE + initialPosition.y),
    );
    setShape({
      ...shape,
      position: {
        x: limitedX,
        y: limitedY,
      },
    });
  };

  return (
    <>
      <select
        className="h-9 w-40 rounded-md border-emerald-500 indent-4 shadow-lg focus:outline-none focus:ring focus:ring-emerald-600"
        onChange={handleColorChange}
        value={shape.color}
      >
        <optgroup label="color">
          <option value="orange">orange</option>
          <option value="lightpink">lightpink</option>
          <option value="aliceblue">aliceblue</option>
        </optgroup>
      </select>
      <Background boxSize={BK_SQUARE_SIZE}>
        <Box
          color={shape.color}
          position={shape.position}
          boxSize={BOX_SQUARE_SIZE}
          onMove={handleMove}
        >
          Grab Me!
        </Box>
      </Background>
    </>
  );
}
