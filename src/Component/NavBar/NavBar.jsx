import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

//import assets et styles
import style from './NavBar.module.css'
import { BiBookmarkHeart, HiMagnifyingGlass, AiOutlineCloseCircle } from 'react-icons/all'
import logo1 from '../../assets/logoTypoVerticale.png'

//import components
import { SearchBar } from '../SearchBar/SearchBar'





export const NavBar = ({ openModal, closeModal }) => {

    // Récupération de l'emplacement actuel
    const location = useLocation();
    // check si la page visité est la Home 
    const homePage = location.pathname === '/';
    // Déclaration des états searchBarOpen et blurBackground 
    const [searchBarOpen, setSearchBarOpen] = useState(false);
    const [blurBackground, setBlurBackground] = useState(false);

    // useLocation pour déterminer si l'utilisateur se trouve sur la page d'accueil ou non.
    // useState pour gérer l'état du champ de recherche et de l'arrière-plan flou.


    /*     const handleSearchClick = () => {
           setIsOpen(true);   
        };
   
        const handleSearchClose = () => {
            setIsOpen(false);   
       }; */

    // Fonction de soumission de la recherche
    const handleSearchSubmit = (query) => {
        console.log('Query:', query);
    };

    return (
        // Div conteneur de la NavBar et de la SearchBar
        <div className={`navBarContainer ${searchBarOpen ? 'blur-background' : ''}`}

            style={{ pointerEvents: blurBackground ? 'none' : 'auto' }}>

            {/*  Barre de navigation */}
            <nav className='navBar'>
                <Link to='/'>
                    <img className={style.logo1} src={logo1} alt="Logo FilmFlow" />
                </Link>


                <div className='acces'>
                    <Link to='/favoris'>
                        < BiBookmarkHeart className='icons' size={32} />
                    </Link>
                    {/*  Affichage de la loupe pour la recherche sur toutes les pages sauf la page d'accueil */}
                    {!homePage && (
                        < HiMagnifyingGlass
                            className={style.loupe}
                            color='#8754db'
                            size={30}
                            onClick={openModal} />)}
                </div>

            </nav>
            {/*  Affichage de la SearchBar si searchBarOpen est vrai */}
            {searchBarOpen && (
                <div className='searchBarContainer' onClick={openModal} >
                    <SearchBar openModal={openModal} closeModal={closeModal} />
                    <AiOutlineCloseCircle
                        style={{ position: "absolute" }}
                        onClick={closeModal} />
                </div>)}

        </div>

    )

}