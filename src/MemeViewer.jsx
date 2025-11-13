import React, { useEffect, useState } from "react";

export default function MemeViewer() {
  const [memes, setMemes] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadMemes() {
      const res = await fetch("https://api.imgflip.com/get_memes");
      const data = await res.json();
      setMemes(data.data.memes);
    }
    loadMemes();
  }, []);

  const filteredMemes = memes.filter((meme) =>
    meme.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">

      {/* Page Title */}
      <h1 className="text-4xl font-bold mb-8">Meme Template Viewer</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search memes..."
        className="w-full max-w-[900px] border border-gray-300 p-4 rounded-full shadow-sm text-gray-700 focus:ring focus:ring-blue-200 mb-12"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Meme Grid */}
      <div className="w-full max-w-[1300px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-6 justify-items-center">

        {filteredMemes.map((meme) => (
          <div
            key={meme.id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-4 w-[260px]"
          >
            <img
              src={meme.url}
              alt={meme.name}
              className="rounded-lg w-full h-auto object-contain"
            />
            <p className="mt-3 font-medium text-gray-800 text-sm">
              {meme.name}
            </p>
          </div>
        ))}

      </div>
    </div>
  );
}
