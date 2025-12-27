export function getNextPos(direction: string | null, tile: number) {
  switch (direction) {
    case "ArrowUp":
      return { x: 0, y: -tile }
    case "ArrowDown":
      return { x: 0, y: tile }
    case "ArrowLeft":
      return { x: -tile, y: 0 }
    case "ArrowRight":
      return { x: tile, y: 0 }
    default:
      return { x: 0, y: 0 }
  }
}