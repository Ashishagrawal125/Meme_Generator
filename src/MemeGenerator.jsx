import React, { useEffect, useState } from "react";

export default function MemeGenerator() {
  const [memes, setMemes] = useState([]);
  const [selectedMeme, setSelectedMeme] = useState(null);
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");

  useEffect(() => {
    async function loadMemes() {
      const res = await fetch("https://api.imgflip.com/get_memes");
      const data = await res.json();
      setMemes(data.data.memes);
      setSelectedMeme(data.data.memes[0]);
    }
    loadMemes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center pt-12 px-4">
      <div className="w-full max-w-4xl flex flex-col md:flex-row gap-10">
        
        {/* LEFT CARD */}
        <div className="bg-white p-6 rounded-2xl shadow w-full md:w-1/3">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">
            Meme Generator
          </h1>

          <label className="block font-medium text-gray-700 mb-1">Select Template</label>
          <select
            className="w-full border p-2 rounded mb-4"
            onChange={(e) =>
              setSelectedMeme(memes.find((m) => m.id === e.target.value))
            }
          >
            {memes.map((meme) => (
              <option key={meme.id} value={meme.id}>
                {meme.name}
              </option>
            ))}
          </select>

          <label className="block font-medium text-gray-700 mb-1">Top Text</label>
          <input
            className="w-full border p-2 rounded mb-4"
            value={topText}
            onChange={(e) => setTopText(e.target.value)}
            placeholder="Enter top text"
          />

          <label className="block font-medium text-gray-700 mb-1">Bottom Text</label>
          <input
            className="w-full border p-2 rounded mb-4"
            value={bottomText}
            onChange={(e) => setBottomText(e.target.value)}
            placeholder="Enter bottom text"
          />
        </div>

        {/* RIGHT PREVIEW */}
        <div className="bg-white p-6 rounded-2xl shadow w-full md:w-2/3 flex justify-center items-center">
          {selectedMeme ? (
            <div className="relative w-full flex justify-center">
              <img
                src={selectedMeme.url}
                alt="meme"
                className="max-h-[550px] rounded"
              />

              <p className="absolute top-4 text-white text-3xl font-extrabold text-center drop-shadow-lg w-full px-2">
                {topText}
              </p>

              <p className="absolute bottom-4 text-white text-3xl font-extrabold text-center drop-shadow-lg w-full px-2">
                {bottomText}
              </p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>

      </div>
    </div>
  );
}
