
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import style from "./Resultats.module.css"
import notfound from '../../assets/image-not-found.jpeg'
import { ListeResult } from "../../Component/ListeResult/ListeResult";



export const Resultats = () => {

// On utilise le hook useLocation pour récupérer les paramètres passés à la route
    const location = useLocation();

// On récupère la valeur passée en paramètre "query" 
    const query = location.state

// On utilise le hook useState pour initialiser le state "shows" à un tableau vide
    const [shows, setShows] = useState([])

// On utilise le hook useEffect pour effectuer une requête API à chaque changement de valeur de "query"
    useEffect(() => {
        fetch('https://api.tvmaze.com/search/shows?q=' + query)
            .then(res => res.json())
            .then(data => setShows(data))
            .catch(err => console.error(err))
    }, [query]);

    console.log(shows)


// On affiche la liste des résultats
    return (

        <div>
            <ul className={style.liste}>
{/* On utilise la méthode "map" pour afficher chaque élément du tableau "shows" */}
                {shows.map((valeur, index) => (
                    <li className={style.divimg}>
{/* On utilise le composant "Link" de react-router-dom pour créer un lien vers le détails de la série */}
                        <Link key={index} to={`/serie/${valeur.show.id}`} >
{/* On utilise le composant "ListeResult" pour afficher les informations de la série */}
                            <ListeResult valeur={valeur} index={index} />
                        </Link>
                    </li>
                ))}
            </ul>
        </div>

    )
}


