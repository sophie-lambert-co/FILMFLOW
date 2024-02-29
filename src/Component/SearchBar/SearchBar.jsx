import { useEffect, useState } from "react"
import style from './SearchBar.module.css'
import { FiSearch } from 'react-icons/all'
import { useNavigate } from "react-router-dom"



// URL pour avoir le resultat de la recherche :
// 'https://api.tvmaze.com/search/shows?q='+query

export const SearchBar = ({openModal, closeModal}) => {
// Le state ( les donnée, un état) 
 

// On utilise le hook useNavigate pour la navigation vers la page de résultats de la recherche
  const navigation = useNavigate();
// On utilise le hook useState pour définir l'état "query" qui contiendra la valeur de la recherche
  const [query, setQuery] = useState("");


// Les comportements
// Cette fonction est appelée à chaque fois que la valeur de l'input change, et met à jour l'état "query" en conséquence
  function handleInputChange(event) {
    setQuery(event.target.value);
  }

// Cette fonction est appelée lorsque le formulaire est soumis, elle effectue la recherche en envoyant la valeur "query" à la page de résultats via useNavigate()
  const handleSubmit = (event) => {
    event.preventDefault();
    navigation('/resultats', { replace: true, state: query });
    closeModal  // on appelle la fonction closeModal qui ferme la modale de recherche
  }



//L'affichage  (render )
// Rendu du composant SearchBar, contenant un formulaire avec un champ texte et un bouton de soumission
  return (
    <div>
    <form className={style.form} onSubmit={handleSubmit}>
      <label className={style.champ} htmlFor="search-input"></label>
      <input
        className={style.input}
        id="search-input"
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder='Search'
      />
      <button className={style.button} type="submit"><FiSearch /></button>
    </form>
    </div>
  );

}




