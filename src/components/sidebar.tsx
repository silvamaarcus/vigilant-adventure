import { Menu, Pencil, Search, Star, Trash } from "lucide-react";
import { useEffect, useState } from "react";

import { Play, Pause } from "lucide-react";

interface Station {
  id: string;
  name: string;
  url_resolved: string;
  country?: string;
  tags?: string;
}

export default function Sidebar() {
  const [stations, setStations] = useState<Station[]>([]);
  const [selectedStation, setSelectedStation] = useState<string | null>(null);
  const [favoriteStations, setFavoriteStations] = useState<Station[]>([]);

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

  // Carregar rádios salvas ao iniciar a aplicação
  useEffect(() => {
    const savedStations = localStorage.getItem("favoriteStations");
    if (savedStations) {
      setFavoriteStations(JSON.parse(savedStations));
    }
  }, []);

  // Salvar rádios favoritas no localStorage
  useEffect(() => {
    localStorage.setItem("favoriteStations", JSON.stringify(favoriteStations));
  }, [favoriteStations]);

  const addToFavorites = (station: Station) => {
    setFavoriteStations([...favoriteStations, station]);
  };

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

  const removeFromFavorites = (stationId: string) => {
    setFavoriteStations((prevFavorites) =>
      prevFavorites.filter((station) => station.id !== stationId),
    );
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
                <li key={station.id} className="relative">
                  <button
                    onClick={() => setSelectedStation(station.url_resolved)}
                    className="bg-gray-light block w-full rounded-lg p-2 text-left hover:opacity-80"
                  >
                    {station.name}
                  </button>
                  <button
                    onClick={() => addToFavorites(station)}
                    className="absolute top-1/2 right-2 -translate-y-1/2"
                  >
                    <Star size={20} color="yellow" />
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
        <div className="bg-gray-default border-gray-dark mt-10 flex items-center gap-4 rounded-t-lg border-b-2 px-11 py-4 text-black">
          {selectedStation ? (
            <>
              <button
                onClick={togglePlay}
                className="cursor-pointer text-white hover:opacity-80"
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

        {/* Lista de rádios favoritas */}
        <div>
          <ul className="bg-gray-default space-y-2 rounded-b-lg px-1 py-4">
            {favoriteStations.length > 0 ? (
              favoriteStations.map((station) => {
                const isPlaying =
                  selectedStation === station.url_resolved && playing;

                return (
                  <li
                    key={station.id}
                    className={`bg-gray-light flex items-center justify-between rounded-lg px-8 py-3 text-black ${
                      isPlaying ? "font-semibold" : ""
                    }`}
                  >
                    <button
                      onClick={() => {
                        if (selectedStation === station.url_resolved) {
                          togglePlay();
                        } else {
                          setSelectedStation(station.url_resolved);
                          setPlaying(true);
                        }
                      }}
                      className="cursor-pointer rounded-full bg-black/50 p-3 hover:opacity-80"
                    >
                      {isPlaying ? (
                        <Pause size={24} color="#000" fill="#000" />
                      ) : (
                        <Play size={24} color="#000" fill="#000" />
                      )}
                    </button>

                    {/* Rádio */}
                    <div className="flex flex-1 flex-col px-4">
                      <span className="text-lg font-semibold">
                        {station.name}
                      </span>
                      <span>
                        {station.country}
                        {station.tags &&
                          station.tags.split(",").slice(0, 3).length > 0 &&
                          ", "}
                        {station.tags &&
                          station.tags.split(",").slice(0, 3).join(", ")}
                      </span>
                    </div>

                    {/* Botoes de ação */}
                    <div className="flex items-center gap-6">
                      <button className="cursor-pointer hover:opacity-70">
                        <Pencil size={24} color="#000" fill="#000" />
                      </button>

                      <button
                        onClick={() => removeFromFavorites(station.id)}
                        className="cursor-pointer hover:opacity-70"
                      >
                        <Trash size={24} color="#000" fill="#000" />
                      </button>
                    </div>
                  </li>
                );
              })
            ) : (
              <p className="text-gray-400">
                Nenhuma rádio favorita adicionada.
              </p>
            )}
          </ul>
        </div>
      </main>
    </div>
  );
}
