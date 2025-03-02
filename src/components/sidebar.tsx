import { Menu, Search } from "lucide-react";
import { useEffect, useState } from "react";

import { Play, Pause } from "lucide-react";

interface Station {
  id: string;
  name: string;
  url_resolved: string;
}

export default function Sidebar() {
  const [stations, setStations] = useState<Station[]>([]);
  const [selectedStation, setSelectedStation] = useState<string | null>(null);

  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    async function fetchStations() {
      try {
        const response = await fetch(
          "https://de1.api.radio-browser.info/json/stations/search?limit=10",
        );
        const data = await response.json();
        console.log(data);
        setStations(data);
      } catch (error) {
        console.error("Erro ao buscar estações:", error);
      }
    }

    fetchStations();
  }, []);

  const togglePlay = () => {
    const audio = document.getElementById("radioPlayer") as HTMLAudioElement;
    if (!audio) return;

    if (playing) {
      audio.pause();
    } else {
      audio.play();
    }
    setPlaying(!playing);
  };

  return (
    <div className="flex h-screen w-full">
      {/* Sidebar */}
      <aside className="bg-sidebar w-64 p-4 text-white">
        <div className="flex justify-end">
          <button className="cursor-pointer hover:opacity-80">
            <Menu size={28} color="#1267FC" />
          </button>
        </div>
        <input
          type="text"
          placeholder="Search here"
          className="bg-gray-light mt-4 mb-6 w-full rounded-lg px-4 py-2 text-base text-white"
        />
        <nav className="mt-4">
          <ul className="space-y-3">
            {stations.length > 0 ? (
              stations.map((station) => (
                <li key={station.id}>
                  <button
                    onClick={() => setSelectedStation(station.url_resolved)}
                    className="bg-gray-light block w-full rounded-lg p-2 text-left hover:opacity-80"
                  >
                    {station.name}
                  </button>
                </li>
              ))
            ) : (
              <li className="text-gray-400">Carregando estações...</li>
            )}
          </ul>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 bg-transparent px-11 py-8">
        <h2 className="text-center text-3xl font-semibold">Radio Browser</h2>
        <div className="mt-1 flex items-center justify-between">
          <p className="uppercase">Favorite Radios</p>
          <div>
            <button className="flex cursor-pointer items-center gap-1 hover:opacity-80">
              <Search size={28} color="#1267FC" />
              Search stations
            </button>
          </div>
        </div>

        {/* Player de rádio */}
        <div className="bg-gray-light border-gray-dark mt-10 flex items-center justify-center gap-4 rounded-lg border-b p-4 text-black">
          {selectedStation ? (
            <>
              <button
                onClick={togglePlay}
                className="text-white hover:opacity-80 cursor-pointer"
              >
                {playing ? (
                  <Pause size={28} color="#000" fill="#000" />
                ) : (
                  <Play size={28} color="#000" fill="#000" />
                )}
              </button>
              <p className="mr-4 text-lg font-semibold uppercase">
                {stations.find((s) => s.url_resolved === selectedStation)?.name}
              </p>
              <audio id="radioPlayer" src={selectedStation}></audio>
            </>
          ) : (
            <p className="text-gray-400">Selecione uma estação para ouvir.</p>
          )}
        </div>
      </main>
    </div>
  );
}
