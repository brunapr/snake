import { SnakePos } from "../App";

export function getFoodPos(snakePos: SnakePos[], size: number, tile: number): SnakePos {
  const gridSize = size / tile;
  const totalCells = gridSize * gridSize;

  // Creating a set will help prevent food being created in a tile over the snake
  const snakeSet = new Set<string>();

  snakePos.forEach(pos => {
    snakeSet.add(`${pos.x},${pos.y}`);
  });

  // Check if the game is over
  if (snakePos.length >= totalCells) {
    return { x: -1, y: -1 };
  }

  const allPositions: SnakePos[] = [];

  // This while manages to push all existing cells into an array so we can 
  // check later if they're available to spawn food or not
  for (let x = 0; x < size; x += tile) {
    for (let y = 0; y < size; y += tile) {
      allPositions.push({ x, y });
    }
  }

  const availablePositions = allPositions.filter(pos => {
    return !snakeSet.has(`${pos.x},${pos.y}`);
  });

  const randomIndex = Math.floor(Math.random() * availablePositions.length);
  return availablePositions[randomIndex];
}