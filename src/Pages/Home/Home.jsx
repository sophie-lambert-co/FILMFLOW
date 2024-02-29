import { useEffect } from "react"
import { BiFontSize } from "react-icons/bi"
import { Caroussel } from "../../Component/Carrousel/Caroussel"
import { NavBar } from "../../Component/NavBar/NavBar"
import { SearchBar } from "../../Component/SearchBar/SearchBar"
import style from "./Home.module.css"



export const Home = () => {

//La fonction useEffect est utilisée pour initialiser le stockage local de la liste des favoris.
// Si la liste n'existe pas déjà dans le stockage local, elle est initialisée avec un tableau vide.
  useEffect (() => {
    if (!localStorage.getItem('listeFavoris')){
        localStorage.setItem('listeFavoris', '[]')
    }
})



return(
 
<div>
    <SearchBar/>
    <Caroussel/>
  </div>
 
)

  }