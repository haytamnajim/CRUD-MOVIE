import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; // Assurez-vous d'importer Bootstrap

export default function DeleteFavorite() {
    const [ListeFavs, setListeFavs] = useState([]);

    useEffect(() => {
        const dataFromLS = localStorage.getItem("ListeFavs");
        setListeFavs(dataFromLS ? JSON.parse(dataFromLS) : []);
    }, []);

    const removeFav = (id) => {
        const updatedList = ListeFavs.filter(fav => fav.id !== id);
        setListeFavs(updatedList);
        localStorage.setItem("ListeFavs", JSON.stringify(updatedList));
    };

    return (
        <div className="container mt-4">
            <h2>Liste des Favoris</h2>
            <table className="table table-bordered table-hover mt-3">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Titre</th>
                        <th scope="col">Catégorie</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        ListeFavs.length > 0 ? (
                            ListeFavs.map((fav) => (
                                <tr key={fav.id}>
                                    <td>{fav.id}</td>
                                    <td>{fav.titre}</td>
                                    <td>{fav.categorie}</td>
                                    <td>
                                        <button 
                                            className="btn btn-danger"
                                            onClick={() => removeFav(fav.id)}
                                        >
                                            Supprimer
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center">Aucun favori trouvé</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}
