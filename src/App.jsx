import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "@/components/Header/Header";
import CharactersPage from "@/pages/CharactersPage/CharactersPage";
import CharacterPage from "@/pages/CharacterPage/CharacterPage";
import ComicsPage from "@/pages/ComicsPage/ComicsPage";
import FavoritesPages from "@/pages/FavoritesPage/FavoritesPage";
import { FavorisProvider } from "./components/FavoritesContext";

function App() {
  return (
    <>
      <Router>
        <Header />
        <main>
          <div className="container">
            <FavorisProvider>
              <Routes>
                <Route path="/" element={<CharactersPage />} />
                <Route path="/character/:id" element={<CharacterPage />} />
                <Route path="/comics" element={<ComicsPage />} />
                <Route path="/favorites" element={<FavoritesPages />} />
              </Routes>
            </FavorisProvider>
          </div>
        </main>
      </Router>
    </>
  );
}

export default App;
