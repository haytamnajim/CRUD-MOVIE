import { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css'; // Importation de la feuille de styles de Bootstrap

export default function ListeMovies() {
    const [ListeMovie, setListeMovie] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3004/ListeMovies").then((response) => {
            console.log("Liste des films chargée :", response.data);
            setListeMovie(response.data);
        });
    }, []);

    const addToFavorites = (movie) => {
        const dataFromLS = localStorage.getItem("ListeFavs");
        const ListeFavs = dataFromLS ? JSON.parse(dataFromLS) : [];
        console.log("Liste des favoris avant ajout :", ListeFavs);

        if (!ListeFavs.some(fav => fav.id === movie.id)) {
            ListeFavs.push(movie);
            console.log("Ajout du film aux favoris :", movie);
            localStorage.setItem("ListeFavs", JSON.stringify(ListeFavs));
            alert("Film ajouté aux favoris !");
        } else {
            alert("Ce film est déjà dans vos favoris !");
        }

        console.log("Liste des favoris après ajout :", ListeFavs);
    };

    return (
        <div className="container mt-4">
            <h1>Liste des Films</h1>
            <table className="table table-bordered table-hover mt-3">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Titre</th>
                        <th scope="col">Categorie</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        ListeMovie.map((movie, index) => (
                            <tr key={index}>
                                <td>{movie.id}</td>
                                <td>{movie.titre}</td>
                                <td>{movie.categorie}</td>
                                <td>
                                    <button 
                                        className="btn btn-primary" 
                                        onClick={() => addToFavorites(movie)}
                                    >
                                        Ajouter au favoris
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}
