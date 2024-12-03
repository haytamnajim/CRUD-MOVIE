import { Routes, Route } from "react-router-dom";
import ListeMovies from "./ListeMovies";
import AddMovie from "./AddMovie";
import AddFavorite from "./AddFavorite";
import DeleteFavourite from "./Deletefavourite"; // Correction du nom de l'import
import Listefavourite from "./Listefavourite"; // Correction du nom de l'import
import 'bootstrap/dist/css/bootstrap.min.css'; // Importation de la feuille de styles Bootstrap

const App = () => {
  return (
    <div className="container mt-4">
      {/* Barre de navigation */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <a className="navbar-brand" href="/">Movie App</a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/ListeMovie">Liste Movie</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/AddMovie">Ajouter Movie</a>
            </li>
            {/* <li className="nav-item">
              <a className="nav-link" href="/deleteMovie">Supprimer Movie</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/ModifierMovie">Modifier Film</a>
            </li> */}
            <li className="nav-item">
              <a className="nav-link" href="/AddFavorite">Ajouter aux favourites</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/ListeFav">Liste Favorite</a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/ListeMovie" element={<ListeMovies />} />
        <Route path="/AddMovie" element={<AddMovie />} />
        {/* <Route path="/deleteMovie" element={<DeleteMovie />} />
        <Route path="/ModifierMovie" element={<ModifierMovie />} /> */}
        <Route path="/AddFavorite" element={<AddFavorite />} />
        <Route path="/ListeFav" element={<Listefavourite />} />
      </Routes>
    </div>
  );
};

export default App;
