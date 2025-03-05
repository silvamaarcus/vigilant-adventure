import { Menu, Pencil, Search, Star, Trash, Play, Pause } from "lucide-react";
import { useEffect, useState } from "react";
import Modal from "react-modal";

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

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editingStation, setEditingStation] = useState<Station | null>(null);
  const [editedName, setEditedName] = useState("");
  const [editedCountry, setEditedCountry] = useState("");
  const [editedTags, setEditedTags] = useState("");

  // Função para buscar estações
  useEffect(() => {
    async function fetchStations() {
      try {
        const response = await fetch(
          "https://de1.api.radio-browser.info/json/stations/search?limit=10",
        );
        const data = await response.json();
        setStations(data);
      } catch (error) {
        console.error("Erro ao buscar estações:", error);
      }
    }

    fetchStations();
  }, []);

  // Função para adicionar estações aos favoritos
  const addToFavorites = (station: Station) => {
    // Verificando se a estação já existe nos favoritos
    const stationExists = favoriteStations.some(
      (favStation) => favStation.url_resolved === station.url_resolved,
    );

    // Adicionando a estação se ela não existir nos favoritos
    if (!stationExists) {
      const newStation = {
        ...station,
        id: `${station.id}-${Date.now()}`, // Forçando um ID único
      };
      setFavoriteStations([...favoriteStations, newStation]);
    }
  };

  // Função para remover estações dos favoritos
  const removeFromFavorites = (stationId: string) => {
    setFavoriteStations((prevFavorites) => {
      const updatedFavorites = prevFavorites.filter(
        (station) => station.id !== stationId,
      );
      return updatedFavorites;
    });
  };

  // Função para tocar a radio
  const togglePlay = () => {
    const audio = document.getElementById("radioPlayer") as HTMLAudioElement;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play();
      setPlaying(true);
    }
  };

  // Função para selecionar uma estação
  const handleStationSelection = (stationUrl: string) => {
    const audio = document.getElementById("radioPlayer") as HTMLAudioElement;
    if (audio && selectedStation) {
      audio.pause();
    }

    setSelectedStation(stationUrl);
    setPlaying(true);
  };

  // Função para abrir o modal de edição
  const openEditModal = (station: Station) => {
    setEditingStation(station);
    setEditedName(station.name);
    setEditedCountry(station.country || "");
    setEditedTags(station.tags || "");
    setModalIsOpen(true);
  };

  // Função para salvar as alterações no modal de edição
  const handleEditSave = () => {
    if (!editingStation) return;

    setFavoriteStations((prevFavorites) =>
      prevFavorites.map((station) =>
        station.id === editingStation.id
          ? {
              ...station,
              name: editedName,
              country: editedCountry,
              tags: editedTags,
            }
          : station,
      ),
    );

    setModalIsOpen(false);
  };

  // Função para adicionar estações aos favoritos ao carregar a página
  useEffect(() => {
    const savedStations = localStorage.getItem("favoriteStations");
    if (savedStations) {
      setFavoriteStations(JSON.parse(savedStations));
    }
  }, []);

  // Salvando estações favoritas no localStorage
  useEffect(() => {
    localStorage.setItem("favoriteStations", JSON.stringify(favoriteStations));
  }, [favoriteStations]);

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
        {/* Header */}
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
        {/* Player principal */}
        <div className="bg-gray-default border-gray-dark mt-10 flex items-center gap-4 rounded-t-lg border-b-2 px-11 py-4 text-black">
          {selectedStation ? (
            <>
              <button
                onClick={togglePlay}
                className="cursor-pointer hover:opacity-80"
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
              <audio
                id="radioPlayer"
                src={selectedStation}
                autoPlay={playing}
              ></audio>
            </>
          ) : (
            <p className="text-gray-400">Selecione uma estação para ouvir.</p>
          )}
        </div>

        {/* Lista de estações favoritas */}
        <ul className="bg-gray-default space-y-2 rounded-b-lg px-1 py-4">
          {favoriteStations.map((station) => {
            const isPlaying =
              selectedStation === station.url_resolved && playing;

            return (
              <li
                key={station.id}
                className={`bg-gray-light flex items-center justify-between rounded-lg px-8 py-3 ${isPlaying ? "font-semibold" : ""}`}
              >
                <button
                  onClick={() => handleStationSelection(station.url_resolved)}
                  className="cursor-pointer rounded-full bg-black/50 p-3 hover:opacity-80"
                >
                  {isPlaying ? (
                    <Pause size={24} color="#000" fill="#000" />
                  ) : (
                    <Play size={24} color="#000" fill="#000" />
                  )}
                </button>

                <div className="flex flex-1 flex-col px-4 text-black">
                  <span className="text-lg font-semibold">{station.name}</span>
                  <span>
                    {station.country}
                    {station.tags && ", "}
                    {station.tags}
                  </span>
                </div>

                <div className="flex items-center gap-6">
                  <button
                    onClick={() => openEditModal(station)}
                    className="cursor-pointer hover:opacity-70"
                  >
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
          })}
        </ul>

        {/* Modal de edição */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          className="fixed inset-0 flex items-center justify-center p-4"
          overlayClassName="fixed inset-0 bg-black/80"
        >
          <div className="bg-gray-dark w-full max-w-md rounded-lg p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-semibold">Editar Rádio</h2>

            <div className="space-y-3">
              <input
                className="w-full rounded-md border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                placeholder="Nome"
              />
              <input
                className="w-full rounded-md border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={editedCountry}
                onChange={(e) => setEditedCountry(e.target.value)}
                placeholder="País"
              />
              <input
                className="w-full rounded-md border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={editedTags}
                onChange={(e) => setEditedTags(e.target.value)}
                placeholder="Tags"
              />
            </div>

            <div className="mt-4 flex justify-end space-x-2">
              <button
                className="cursor-pointer rounded-md bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400"
                onClick={() => setModalIsOpen(false)}
              >
                Cancelar
              </button>
              <button
                className="cursor-pointer rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                onClick={handleEditSave}
              >
                Salvar
              </button>
            </div>
          </div>
        </Modal>
      </main>
    </div>
  );
}
