import { useEffect } from "react";
import { Check, ChevronLeft, ChevronRight, Menu } from "lucide-react";
import { useRadioStore } from "../stores/useRadioStore";

export function Sidebar() {
  const {
    stations,
    setStations,
    addToFavorites,
    setSelectedStation,
    favoriteStations,
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
  } = useRadioStore();

  useEffect(() => {
    async function fetchStations() {
      try {
        const response = await fetch(
          `https://de1.api.radio-browser.info/json/stations/search?` +
            `limit=10&offset=${(currentPage - 1) * 10}&` +
            `name=${searchTerm}&orderby=votes&reverse=true`,
        );
        const data = await response.json();
        setStations(data);
      } catch (error) {
        console.error("Erro ao buscar estações:", error);
      }
    }

    const debounceTimer = setTimeout(() => {
      fetchStations();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, currentPage, setStations]);

  const isStationFavorite = (stationUrl: string) => {
    return favoriteStations.some(
      (favStation) => favStation.url_resolved === stationUrl,
    );
  };

  return (
    <aside className="bg-sidebar w-64 p-4 text-white">
      <div className="flex justify-end">
        <button className="cursor-pointer hover:opacity-80">
          <Menu size={28} color="blue" />
        </button>
      </div>

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
        placeholder="Search here"
        className="bg-gray-light mt-4 mb-6 w-full rounded-lg px-4 py-2 text-base text-white"
      />

      <nav className="mt-4">
        <ul className="space-y-3">
          {stations.length > 0 ? (
            stations.map((station) => (
              <li key={station.id} className="group relative">
                <button
                  onClick={() => setSelectedStation(station.url_resolved)}
                  className="bg-gray-light block w-full rounded-lg p-2 text-left hover:opacity-80"
                >
                  {station.name}
                </button>
                <button
                  onClick={() => addToFavorites(station)}
                  className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer"
                >
                  {isStationFavorite(station.url_resolved) ? (
                    <Check size={28} color="blue" />
                  ) : (
                    <>
                      <Check
                        size={28}
                        color="transparent"
                        className="group-hover:hidden"
                      />
                      <Check
                        size={28}
                        color="blue"
                        className="hidden group-hover:block"
                      />
                    </>
                  )}
                </button>
              </li>
            ))
          ) : (
            <li className="text-gray-400">Carregando estações...</li>
          )}
        </ul>
      </nav>
      {/* Adicionar controles de paginação */}
      <div className="mt-4 flex items-center justify-center gap-4">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex cursor-pointer items-center rounded-full bg-black/70 p-2 hover:opacity-50 disabled:opacity-70"
        >
          <ChevronLeft size={28} color="white" />
        </button>
        {currentPage}
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          className="flex cursor-pointer items-center rounded-full bg-black/70 p-2 hover:opacity-50 disabled:opacity-70"
        >
          <ChevronRight size={28} color="white" />
        </button>
      </div>
    </aside>
  );
}
