export default function Table({ size, tile }: { size: number, tile: number }) {
  return (
    <div id="table" style={{ width: size, height: size }}>
      <div className="flex flex-col">
        {
          Array.from({ length: size / tile }).map((_, i) => {
            return (
              <div key={i} className="flex flex-row">
                {
                  Array.from({ length: size / tile }).map((_, index) => {
                    return (
                      <div
                        key={index.toString() + i}
                        style={{ width: tile, height: tile }}
                        className="flex bg-indigo-300"
                      >

                      </div>
                    );
                  })
                }
              </div>
            );
          })
        }
      </div>
    </div>
  );
}