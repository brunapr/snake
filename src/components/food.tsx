import type { SnakePos } from "../App";

export default function Food({ tile, pos }: { tile: number, pos: SnakePos }) {
  return (
    <div
      style={{ width: tile, height: tile, top: pos.y, left: pos.x }}
      className="bg-white rounded-full absolute flex justify-center items-center"
    >
      <div className="w-3 h-3 bg-indigo-300 rounded-full" />
    </div>
  );
}