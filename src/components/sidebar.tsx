import { Menu, Search } from "lucide-react";
import { useEffect, useState } from "react";

interface Station {
  id: string;
  name: string;
  url: string;
}

export default function Sidebar() {
  const [stations, setStations] = useState<Station[]>([]);

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
                  <a
                    href={station.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-light block rounded-lg p-2 hover:opacity-80"
                  >
                    {station.name}
                  </a>
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
      </main>
    </div>
  );
}
