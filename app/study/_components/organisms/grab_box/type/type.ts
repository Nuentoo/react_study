import React from 'react';

export type Position = {
  x: number;
  y: number;
};

export type BackgroundProps = {
  boxSize: number;
  children: React.ReactNode;
};

export type BoxProps = {
  color: string;
  position: Position;
  boxSize: number;
  onMove: (dx: Position['x'], dy: Position['y']) => void;
  children: string;
};
