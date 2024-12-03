import axios from "axios";
import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; // Assurez-vous que Bootstrap est importé

function AddMovie() {
  const [Movie, setMovie] = useState({ "id": 0, "titre": '', "categorie": '' });

  const getValue = (e) => {
    const { name, value } = e.target;
    setMovie({ ...Movie, [name]: value });
  };

  const add_movies = () => {
    axios.post("http://localhost:3004/ListeMovies", Movie)
      .then(() => {
        alert("Film ajouté à la liste des films !");
        setMovie({ "id": 0, "titre": '', "categorie": '' }); // Réinitialiser le formulaire après l'ajout
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout du film :", error);
        alert("Erreur lors de l'ajout du film !");
      });
  };

  return (
    <div className="container mt-4">
      <fieldset className="border p-4">
        <legend className="w-auto">Ajouter un nouveau Film</legend>
        <form>
          <div className="mb-3">
            <label htmlFor="id" className="form-label">Id</label>
            <input
              type="number"
              className="form-control"
              id="id"
              name="id"
              value={Movie.id}
              onChange={getValue}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="titre" className="form-label">Titre</label>
            <input
              type="text"
              className="form-control"
              id="titre"
              name="titre"
              value={Movie.titre}
              onChange={getValue}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="categorie" className="form-label">Catégorie</label>
            <input
              type="text"
              className="form-control"
              id="categorie"
              name="categorie"
              value={Movie.categorie}
              onChange={getValue}
            />
          </div>
          <button type="button" className="btn btn-primary" onClick={add_movies}>
            Enregistrer
          </button>
        </form>
      </fieldset>
    </div>
  );
}

export default AddMovie;
