import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import FilterPanel from "./components/FilterPanel";
import ContentGrid from "./components/ContentGrid";

const App = () => (
  <div className="bg-gray-950 min-h-screen text-white">
    <Header />
    <main className="p-6">
      <SearchBar />
      <FilterPanel />
      <ContentGrid />
    </main>
  </div>
);

export default App;
