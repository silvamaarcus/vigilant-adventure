import { MainContent } from "./components/MainContent";
import { Sidebar } from "./components/Sidebar";

function App() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <MainContent />
    </div>
  );
}

export default App;
