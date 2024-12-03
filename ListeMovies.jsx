import { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css'; // Importation de Bootstrap

export default function ListeMovie() {
    const [ListeMovies, setListeMovies] = useState([]);
    const [filmAmodifier, setfilmAmodifier] = useState(null);
    const [nouveaufilm, setnouveaufilm] = useState({ titre: "", categorie: "" });

    useEffect(() => {
        axios.get("http://localhost:3004/ListeMovies").then((response) => {
            setListeMovies(response.data);
        });
    }, []);

    const addToFavorites = (movie) => {
        const dataFromLS = localStorage.getItem("ListeFavs");
        const ListeFavs = dataFromLS ? JSON.parse(dataFromLS) : [];
        if (!ListeFavs.some(fav => fav.id === movie.id)) {
            ListeFavs.push(movie);
            localStorage.setItem("ListeFavs", JSON.stringify(ListeFavs));
            alert("Film ajouté aux favoris !");
        } else {
            alert("Ce film est déjà dans vos favoris !");
        }
    };

    const supprimerMovie = (id) => {
        axios.delete(`http://localhost:3004/ListeMovies/${id}`).then(() => {
            setListeMovies((ancienneListe) =>
                ancienneListe.filter((movie) => movie.id !== id)
            );
        });
    };

    const debutdemodification = (movie) => {
        setfilmAmodifier(movie.id);
        setnouveaufilm({ titre: movie.titre, categorie: movie.categorie });
    };

    const modifierMovie = (id) => {
        axios.put(`http://localhost:3004/ListeMovies/${id}`, nouveaufilm).then(() => {
            setListeMovies((ancienneListe) =>
                ancienneListe.map((movie) =>
                    movie.id === id ? { ...movie, ...nouveaufilm } : movie
                )
            );
            setfilmAmodifier(null);
        });
    };

    return (
        <div className="container mt-4">
            <h2>Liste des Films</h2>
            <table className="table table-bordered table-hover mt-3">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Titre</th>
                        <th scope="col">Catégorie</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {ListeMovies.map((movie) => (
                        <tr key={movie.id}>
                            <td>{movie.id}</td>
                            <td>
                                {filmAmodifier === movie.id ? (
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={nouveaufilm.titre}
                                        onChange={(e) =>
                                            setnouveaufilm({ ...nouveaufilm, titre: e.target.value })
                                        }
                                    />
                                ) : (
                                    movie.titre
                                )}
                            </td>
                            <td>
                                {filmAmodifier === movie.id ? (
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={nouveaufilm.categorie}
                                        onChange={(e) =>
                                            setnouveaufilm({ ...nouveaufilm, categorie: e.target.value })
                                        }
                                    />
                                ) : (
                                    movie.categorie
                                )}
                            </td>
                            <td>
                                {filmAmodifier === movie.id ? (
                                    <button className="btn btn-success me-2" onClick={() => modifierMovie(movie.id)}>
                                        Enregistrer
                                    </button>
                                ) : (
                                    <button className="btn btn-warning me-2" onClick={() => debutdemodification(movie)}>
                                        Modifier
                                    </button>
                                )}
                                <button className="btn btn-danger me-2" onClick={() => supprimerMovie(movie.id)}>
                                    Supprimer
                                </button>
                                <button className="btn btn-primary" onClick={() => addToFavorites(movie)}>
                                    Ajouter aux Favoris
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
