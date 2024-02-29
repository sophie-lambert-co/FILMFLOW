// Importation des hooks et des composants nécessaires
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Acteurs } from "../../Pages/Acteurs/Acteurs";
import style from "./Casting.module.css"


// Définition du composant Casting
export const Casting = ({ idSerie }) => {

// Utilisation du hook d'état pour stocker les informations de casting
    const [showCast, setShowCasting] = useState([])
    
// Utilisation du hook useEffect pour effectuer une requête API lorsque l'identifiant de série change
    useEffect(() => {
        fetch(`https://api.tvmaze.com/shows/${idSerie}/cast`)
            .then(res => res.json())
            .then(data => setShowCasting(data))
            .catch(err => console.error(err))


    }, [idSerie]);

    console.log(showCast)
    console.log('hello')
    console.log(idSerie)


// Rendu du composant
    return (
        <>

            <div>
{/* Ligne horizontale */}
                <hr/>
                <h1> Casting </h1>
                <ul className={style.castingCard}>

                    {showCast.map((person, index) => (
                        <Link key={index} to={`/acteurs/${person.person.id}`}>
                            <div className={style.acteurCard}>
                              
                                <img
                                    className={style.photoActeur}
                                    src={person.person.image?.original ?? person.person.image?.medium ?? notfound}
                                    alt={person.person.name}
                                />

                                <p className={style.name}>{person.person.name}</p>

                                <p className={style.perso}>{person.character.name}</p>
                            </div>
                        </Link>
                    ))}
                </ul>

            </div>


        </>
    )
}