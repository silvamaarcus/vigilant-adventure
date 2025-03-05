import { useEffect } from "react";
import { MainContent } from "./components/MainContent";
import { Sidebar } from "./components/Sidebar";
import { useRadioStore } from "./stores/useRadioStore";

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
      <Sidebar />
      <MainContent />
    </div>
  );
}

export default App;
