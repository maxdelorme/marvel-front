import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "@/components/Header/Header";
import CharactersPage from "@/pages/CharactersPage/CharactersPage";
import CharacterPage from "@/pages/CharacterPage/CharacterPage";
import ComicsPage from "@/pages/ComicsPage/ComicsPage";
import FavoritesPages from "@/pages/FavoritesPage/FavoritesPage";
import { FavorisProvider } from "./components/FavoritesContext";
import Modal from "./components/Modal/Modal";
import { useState } from "react";
import Cookies from "js-cookie";

function App() {
  // récupération du cookie pour savoir si l'utilisateur est authentifé
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(Cookies.get("token")) || false
  );

  // et la modale fermée
  const [modal, setModal] = useState({
    isVisible: false,
    children: null,
  });

  return (
    <>
      <Router>
        <Header />
        <main>
          <div className="container">
            <FavorisProvider>
              <Routes>
                <Route path="/" element={<CharactersPage />} />
                <Route
                  path="/character/:id"
                  element={<CharacterPage modal={modal} setModal={setModal} />}
                />
                <Route
                  path="/comics"
                  element={<ComicsPage modal={modal} setModal={setModal} />}
                />
                <Route
                  path="/favorites"
                  element={
                    <FavoritesPages
                      modal={modal}
                      setModal={setModal}
                      isAuthenticated={isAuthenticated}
                      setIsAuthenticated={setIsAuthenticated}
                    />
                  }
                />
              </Routes>
            </FavorisProvider>
          </div>
        </main>
        {modal.isVisible && <Modal modal={modal} setModal={setModal}></Modal>}
      </Router>
    </>
  );
}

export default App;
