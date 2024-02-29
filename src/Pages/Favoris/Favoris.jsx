
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Serie } from "../Serie/Serie"
import style from "./Favoris.module.css"
import {MdDeleteOutline  } from 'react-icons/all'



// On définit le composant Favoris qui affichera la liste des séries favorites
export const Favoris = () => {


// On crée un state pour stocker la liste des séries favorites
    const [displayFavoris, setDisplayFavoris] = useState([])


// On utilise le hook useEffect pour effectuer une action au chargement du composant
    useEffect(() => {
        const listefavoris = localStorage.getItem('listeFavoris')
// On récupère la liste des favoris stockée dans le localStorage
        const json = JSON.parse(listefavoris)
// On convertit la chaîne JSON en tableau JavaScript
// On crée un tableau de promesses pour récupérer les données de chaque série favorite

        const promises = json.map((id) =>
            fetch(`https://api.tvmaze.com/shows/${id}`)
                .then(res => res.json()))
        Promise.all(promises)
// On utilise Promise.all pour attendre que toutes les promesses soient résolues
            .then((data) => {

                setDisplayFavoris(data)
            })
            .catch(err => console.log(err))
    }, [])

    console.log(displayFavoris)

    const handleRemoveFromFavoris = (index) => {
        const updatedFavoris = [...displayFavoris];
        updatedFavoris.splice(index, 1);
        setDisplayFavoris(updatedFavoris);
        localStorage.setItem('listeFavoris', JSON.stringify(updatedFavoris.map(serie => serie.id)));
      };



    return (

        <>
            <ul className={style.fav}>
                {
                    displayFavoris.map((serie, index) => (
                        <div key={index} className={style.serie}> 
                     
                            <p className={style.nom}>{serie.name}</p>
                            <img className={style.image} src={serie.image?.original ?? serie.image?.medium ?? notfound} />

                            <div className={style.but}>
                                <button onClick={() => handleRemoveFromFavoris(index)} className={style.removeButton}>
                                    <MdDeleteOutline />
                                </button>
                                <Link  to={`/serie/${serie.id}`} ><button className={style.detailsButton}>
                                    Details
                                    </button>
                                </Link>
                            </div>
                          
                        </div>
                    ))
                }
            </ul>

        </>


    )
}


/* Ce fichier contient donc le composant Favoris, qui affiche la liste des séries favorites stockées dans le localStorage. Au chargement du composant, on récupère la liste des favoris stockée dans le localStorage, puis on crée un tableau de promesses pour récupérer les données de chaque série favorite en appelant l'API TVMaze. Une fois que toutes les promesses sont résolues, on met à jour le state avec les données récupérées, ce qui déclenche un rendu de la liste des favoris. Pour chaque série, on crée un lien vers la page de détails de la série, et on affiche le nom et l'image de la série si elle existe. */