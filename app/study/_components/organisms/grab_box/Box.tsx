import { useState } from 'react';
import { BoxProps, Position } from './type/type';

const Box: React.FC<BoxProps> = ({
  color,
  position,
  boxSize,
  onMove,
  children,
}) => {
  const [lastCoordinates, setLastCoordinates] = useState<Position | null>(null);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setLastCoordinates({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!lastCoordinates) return;
    setLastCoordinates({
      x: e.clientX,
      y: e.clientY,
    });
    const dx = e.clientX - lastCoordinates.x;
    const dy = e.clientY - lastCoordinates.y;
    onMove(dx, dy);
  };

  const handlePointerUp = () => {
    setLastCoordinates(null);
  };

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{
        backgroundColor: `${color}`,
        cursor: 'grab',
        height: boxSize,
        lineHeight: `${boxSize}px`,
        position: 'absolute',
        textAlign: 'center',
        transform: `translate(${position.x}px, ${position.y}px)`,
        userSelect: 'none',
        width: boxSize,
      }}
      className="rounded-lg shadow-xl"
    >
      {children}
    </div>
  );
};

export default Box;
