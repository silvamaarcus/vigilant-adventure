import { useEffect } from "react";

import { useRadioStore } from "./stores/useRadioStore";

import { MainContent } from "./components/MainContent";
import { SidebarComponent} from "./components/SidebarComponent";

function App() {
  const { favoriteStations, setStations } = useRadioStore();

  useEffect(() => {
    const savedStations = localStorage.getItem("favoriteStations");
    if (savedStations) {
      setStations(JSON.parse(savedStations));
    }
  }, [setStations]);

  useEffect(() => {
    localStorage.setItem("favoriteStations", JSON.stringify(favoriteStations));
  }, [favoriteStations]);

  return (
    <div className="flex min-h-screen">
      <SidebarComponent />
      <MainContent />
    </div>
  );
}

export default App;
