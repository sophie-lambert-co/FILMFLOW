import style from "./Acteurs.module.css"
import notfound from '../../assets/image-not-found.jpeg'
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ListeFilmographie } from "../../Component/ListeFilmographie/ListeFilmographie";


//https://api.tvmaze.com/people/1


// définition du composant "Acteurs"
export const Acteurs = () => {

    const param = useParams();// récupération des paramètres d'URL grâce au hook "useParams"
    const id = param.id; // extraction de l'ID de l'acteur à partir des paramètres d'URL


    const [infoActeur, setinfoActeur] = useState([]) // définition d'un état pour stocker les informations de l'acteur
    const [filmo, setFilmo] = useState(false) // définition d'un état pour indiquer si la filmographie doit être affichée ou non


    useEffect(() => {
        fetch(`https://api.tvmaze.com/people/${id}`) // appel de l'API TVMaze pour récupérer les informations de l'acteur correspondant à l'ID
            .then(res => res.json())
            .then(data => setinfoActeur(data))  // stockage des informations de l'acteur dans l'état correspondant

            .catch(err => console.error(err))

    }, []);// utilisation du hook "useEffect" pour effectuer la requête API une fois, au chargement du composant

    console.log(infoActeur)

    const handleClickFilmo = () => {
        setFilmo(true);// boléen pour afficher le composant Filmo     
    }
    // mise à jour de l'état pour afficher le composant "ListeFilmographie" correspondant


    return (
        <>
        <div className={style.acteur}>


            <div className={style.infoActeur}>
                <p className={style.name}>{infoActeur.name}</p>
                <p className={style.birthday}>{infoActeur.birthday}</p>
                <p className={style.death}>{infoActeur.deathday}</p>
                <button className={style.bouton} onClick={handleClickFilmo}> <h4>Filmographie</h4> </button>
               
            </div>

            <div className={style.acteurCard}>
                <img
                    className={style.photoActeur}
                    src={infoActeur.image?.original ?? infoActeur.image?.medium ?? notfound}
                    alt={infoActeur.name}
                />
            </div>

        </div>

            <div className={style.filmogra}>
            {filmo && < ListeFilmographie idSerie={id} />}
            </div>


       
        </>
    )
}