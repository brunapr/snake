import type { SnakePos } from "../App";

export default function Snake({ snake, tile }: { snake: SnakePos[], tile: number }) {
  const START_COLOR = 180;
  const END_COLOR = 250;

  return (
    <div id="snake">
      {
        snake.map(({ x, y }, index) => {
          const hue = START_COLOR + (index * (END_COLOR - START_COLOR) / snake.length);
          return (
            <div
              key={x + "_" + y + "_" + index}
              style={{
                width: tile,
                height: tile,
                top: y,
                left: x,
                backgroundColor: `hsl(${hue}, 80%, 60%)`,
              }}
              className={`
              ${index === snake.length - 1 ? "border-none!" : ""} 
              absolute flex justify-center items-center rounded-full`}
            >
              {
                index === 0 &&
                <div className="w-3 h-3 bg-indigo-300 rounded-full" />
              }
            </div>
          );
        })
      }
    </div>
  );
}