import { useEffect, useState } from "react";
import Table from "./components/table";
import Snake from "./components/snake";
import KeyListener from "./hooks/key-listener";
import StartScreen from "./components/start-screen";
import Food from "./components/food";
import { getFoodPos } from "./utils/get-food-pos";
import { getNextPos } from "./utils/get-next-pos";

export interface SnakePos {
  x: number
  y: number
}

function App() {
  const [size, setSize] = useState(400)
  const [tile, setTile] = useState(40)
  const [direction, setDirection] = useState<string | null>("ArrowLeft");
  const [points, setPoints] = useState(0)
  const [game, setGame] = useState(false)

  const gridSize = size / tile;

  const gridStart = Math.floor(gridSize / 2);
  const startPos = gridStart * tile;

  // Starter snake with one head and two segments (3 length)
  const defaultSnake: SnakePos[] = [
    { x: startPos, y: startPos },
    { x: startPos + tile, y: startPos },
    { x: startPos + 2 * tile, y: startPos },
  ]

  const [snakePos, setSnakePos] = useState<SnakePos[]>(defaultSnake)
  const [foodPos, setFoodPos] = useState<SnakePos>(getFoodPos(snakePos, size, tile))

  // Cancels key press if it's backwards and sets new direction
  const handleKeyPress = (pressedDirection: string) => {
    if (
      (pressedDirection === "ArrowUp" && direction === "ArrowDown") ||
      (pressedDirection === "ArrowDown" && direction === "ArrowUp") ||
      (pressedDirection === "ArrowLeft" && direction === "ArrowRight") ||
      (pressedDirection === "ArrowRight" && direction === "ArrowLeft")
    ) {
      return;
    }

    setDirection(pressedDirection);
  };

  // Takes care of all the action between time frames
  const intervalAction = () => {
    if (!direction || !game) return;

    // Checks direction pressed and calculates new position
    const nextPos = getNextPos(direction, tile)
    const head = snakePos[0]

    const newHead = {
      x: head.x + nextPos.x,
      y: head.y + nextPos.y
    }

    const hitWall =
      newHead.x < 0 ||
      newHead.x >= size ||
      newHead.y < 0 ||
      newHead.y >= size

    const hitSelf = snakePos.slice(1).some(tail =>
      tail.x === newHead.x && tail.y === newHead.y
    )

    // Game is over, resets
    if (hitWall || hitSelf) {
      setGame(false)
      setPoints(snakePos.length - 3)

      setTimeout(() => {
        setSnakePos(defaultSnake)
        setDirection("ArrowLeft")
      }, 1000)
      return
    }

    // New snake is new head + rest of the old snake - last item
    const newSnake = [newHead, ...snakePos.slice(0, -1)]

    // Food calcs. If snake catches food, creates new food
    if (newHead.x === foodPos.x && newHead.y === foodPos.y) {
      const newFood = getFoodPos(newSnake, size, tile)
      setFoodPos(newFood)
      newSnake.push(newSnake[newSnake.length - 1])
    }

    setSnakePos(newSnake)
  };

  useEffect(() => {
    if (!game) return;

    const intervalId = setInterval(() => {
      intervalAction();
    }, 200);

    return () => clearInterval(intervalId);
  }, [game, direction, snakePos]);

  return (
    <div className="w-screen h-screen bg-indigo-200 flex items-center justify-center">
      <div className="relative">
        <Table size={size} tile={tile} />
        <Snake snake={snakePos} tile={tile} />
        <Food tile={tile} pos={foodPos} />
        <StartScreen points={points} game={game} setGame={setGame} />
      </div>
      <KeyListener onKeyPress={handleKeyPress} />
    </div>
  );
}

export default App
