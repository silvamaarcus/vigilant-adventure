// Components
import { Pause, Pencil, Play, Search, Trash } from "lucide-react";
import Modal from "react-modal";

import { useRadioStore } from "../stores/useRadioStore";

export const MainContent = () => {
  const {
    selectedStation,
    playing,
    stations,
    favoriteStations,
    modalIsOpen,
    editedName,
    editedCountry,
    editedTags,
    togglePlay,
    handleStationSelection,
    openEditModal,
    removeFromFavorites,
    handleEditSave,
    setModalIsOpen,
    setEditedName,
    setEditedCountry,
    setEditedTags,
  } = useRadioStore();

  return (
    <>
      <main className="flex-1 bg-transparent px-2 py-4 sm:px-11 sm:py-8">
        {/* Header */}
        <h2 className="text-center text-3xl font-semibold">Radio Browser</h2>
        <div className="mt-4 flex items-center justify-between">
          <p className="uppercase">Favorite Radios</p>
          <div className="hidden md:block">
            <button className="flex cursor-pointer items-center gap-1 hover:opacity-80">
              <Search size={28} color="blue" />
              Search stations
            </button>
          </div>
        </div>
        {/* Player principal */}
        <div className="bg-gray-default border-gray-dark mt-4 flex items-center gap-4 rounded-t-lg border-b-2 px-11 py-4 text-black">
          {selectedStation ? (
            <>
              <button
                onClick={togglePlay}
                className="cursor-pointer hover:opacity-80"
              >
                {playing ? (
                  <Pause size={28} color="black" fill="black" />
                ) : (
                  <Play size={28} color="black" fill="black" />
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
            <p className="text-gray-400">
              Select the station to listen to now.
            </p>
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
                    <Pause size={24} color="black" fill="black" />
                  ) : (
                    <Play size={24} color="black" fill="black" />
                  )}
                </button>

                <div className="flex flex-1 flex-col px-4 text-black">
                  <span className="text-lg font-semibold">{station.name}</span>
                  <span>
                    {station.country}
                    {station.tags &&
                      station.tags.split(",").slice(0, 2).length > 0 &&
                      ", "}
                    {station.tags &&
                      station.tags.split(",").slice(0, 2).join(", ")}
                  </span>
                </div>

                <div className="flex items-center gap-6">
                  <button
                    onClick={() => openEditModal(station)}
                    className="cursor-pointer hover:opacity-70"
                  >
                    <Pencil size={24} color="black" fill="black" />
                  </button>
                  <button
                    onClick={() => removeFromFavorites(station.id)}
                    className="cursor-pointer hover:opacity-70"
                  >
                    <Trash size={24} color="black" fill="black" />
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
            <h2 className="mb-4 text-xl font-semibold">Edit Radio</h2>

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
    </>
  );
};
