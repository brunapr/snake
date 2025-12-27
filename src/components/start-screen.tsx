export default function StartScreen({
  game,
  setGame,
  points
}: {
  points: number,
  game: boolean,
  setGame: (game: boolean) => void
}) {
  if (game) return null

  return (
    <div className="w-full h-full bg-white flex flex-col justify-center items-center absolute top-0">
      {
        points > 0 &&
        <div className="flex flex-col justify-center items-center">
          <h2 className="font-bold text-3xl">LAST</h2>
          <span className="italic text-5xl text-indigo-400">{points}</span>
        </div>
      }
      <button onClick={() => setGame(true)} className="mt-10 cursor-pointer rounded-full bg-black hover:bg-white/80 hover:text-black py-4 px-8 font-bold text-white">
        start
      </button>
    </div>
  );
}