import { useEffect } from "react";
import { Menu, Star } from "lucide-react";
import { useRadioStore } from "../stores/useRadioStore";

export default function Sidebar() {
  const {
    stations,
    setStations,
    // selectedStation,
    addToFavorites,
    setSelectedStation,
  } = useRadioStore();

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
  }, [setStations]);

  return (
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
  );
}
