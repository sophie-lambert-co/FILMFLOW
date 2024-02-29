import style from "./ListeFilmographie.module.css"
import notfound from '../../assets/image-not-found.jpeg'
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";



//https://api.tvmaze.com/people/1/castcredits?embed=show


export const ListeFilmographie = ({ idSerie }) => {




   const [filmographie, setFilmographie] = useState([]) // Initialisation d'un état filmographie vide


   useEffect(() => {  // Utilisation du hook useEffect pour effectuer une action après le rendu de la page
      fetch(` https://api.tvmaze.com/people/${idSerie}/castcredits?embed=show`)// Appel à l'API TVMaze pour obtenir la liste des films/séries
         .then(res => res.json()) // Conversion de la réponse en JSON
         .then(data => setFilmographie(data))  // Stockage de la liste des films/séries dans l'état filmographie
         .catch(err => console.error(err))

   }, []); // Utilisation d'un tableau vide en seconde argument pour n'exécuter le code qu'une seule fois

   console.log(filmographie)  // Affichage de la liste des films/séries dans la console


   return (
      <>
         <hr />
         <h1> Shows list </h1>

         <ul className={style.detailFilmo} >
            {filmographie.map((valeur, index) => (
               <Link to={`/serie/${valeur._embedded.show.id}`} key={index}>  {/*  Utilisation de la méthode map pour afficher la liste des films/séries */}

                  <li>
                     <img className={style.image} src={valeur._embedded.show.image?.original ?? valeur._embedded.show.image?.medium ?? notfound} alt={valeur._embedded.show.name} />
                     <div>
                        <p className={style.nom}>{valeur._embedded.show.name}</p>
                        <p dangerouslySetInnerHTML={{ __html: valeur._embedded.show.summary }} className={style.resum}></p>
                     </div>

                  </li>
               </Link>
            ))}
         </ul>




      </>
   )
}