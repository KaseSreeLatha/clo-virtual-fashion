import Header from "./components/Header";
import ContentGrid from "./components/ContentGrid";

const App = () => (
  <div className="bg-neutral-900 min-h-screen">
    <Header />
    <main className="p-6">
      <ContentGrid />
    </main>
  </div>
);

export default App;
