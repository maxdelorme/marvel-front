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
  // récupération du cookie pour savoir si l'utilisateur change ou pas son token
  const [token, setToken] = useState(Cookies.get("token"));

  if (!token) {
    Cookies.remove("token");
  } else {
    Cookies.set("token", token, { expires: 1 });
  }
  // et la modale fermée
  const [modal, setModal] = useState(null);

  return (
    <>
      <Router>
        <Header token={token} setToken={setToken} setModal={setModal} />
        <main>
          <div className="container">
            <FavorisProvider token={token}>
              <Routes>
                <Route
                  path="/"
                  element={<CharactersPage setModal={setModal} token={token} />}
                />
                <Route
                  path="/character/:id"
                  element={<CharacterPage setModal={setModal} token={token} />}
                />
                <Route
                  path="/comics"
                  element={<ComicsPage setModal={setModal} token={token} />}
                />
                <Route
                  path="/favorites"
                  element={
                    <FavoritesPages
                      modal={modal}
                      setModal={setModal}
                      token={token}
                    />
                  }
                />
              </Routes>
            </FavorisProvider>
          </div>
        </main>
        {modal && (
          <Modal
            token={token}
            modal={modal}
            setModal={setModal}
            setToken={setToken}
          ></Modal>
        )}
      </Router>
    </>
  );
}

export default App;
