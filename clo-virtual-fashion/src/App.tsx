import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import ContentGrid from "./components/ContentGrid";

const App = () => (
  <div className="bg-gray-950 min-h-screen text-white">
    <Header />
    <main className="p-6">
      <SearchBar />
      <ContentGrid />
    </main>
  </div>
);

export default App;
