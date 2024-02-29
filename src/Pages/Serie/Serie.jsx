import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import style from"./Serie.module.css";
import { Casting } from "../../Component/Casting/Casting";
import { Seasons } from "../../Component/Saisons/Saisons";
import { DetailsSerie } from "../../Component/DetailsSerie/DetailsSerie";
import { AiOutlineStar, FaHeart, FaRegHeart } from 'react-icons/all'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




// Définition du composant "Serie"
export const Serie = () => {

// Récupération de l'ID de la série à afficher à partir des paramètres de l'URL 
  const param = useParams();
  const id = param.id;

// Définition des états locaux
  const [serie, setSerie] = useState();// État pour stocker les informations sur la série
  const [ showSeason,setShowSeason]=useState(false); // État pour afficher le composant Saisons
  const [ showCasting,setShowCasting]=useState(false);// state pour afficher le composant Casting
  const [ favoris, setFavoris] = useState(JSON.parse(localStorage.getItem('listeFavoris')))// État pour stocker la liste des favoris
  

// Utilisation de useEffect pour sauvegarder la liste des favoris dans le local storage à chaque modification
  useEffect (() => {
  localStorage.setItem('listeFavoris', JSON.stringify(favoris))
  }, [favoris])

 //console.log(id)


// Récupération des informations sur la série à partir de l'API de TVMaze
  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${id}`)
      .then((res) => res.json())
      .then((data) => setSerie(data))
      .catch((err) => console.error(err));
  }, [id]);


// Fonction pour ajouter une série aux favoris
const grab = () => {
  toast('I LOVE IT !')
  setFavoris(current => [...current, serie.id])
}

// Fonction pour retirer une série des favoris
const release=()=>{
  toast('BYE BYE !')
  setFavoris(current => current.filter(id => id!== serie.id))
}

// Fonction pour afficher le composant Casting
const handleClickCasting=()=>{
         setShowCasting(true);// boléen pour afficher le composant Casting   
         setShowSeason(false) ;    
}

// Fonction pour afficher le composant Saisons
const handleClickSeason=()=>{
  setShowCasting(false);// boléen pour afficher le composant Casting   
  setShowSeason(true) ;    
}


// Rendu du composant
  return (
<>
<div className={style.Serie}>
{/* Afficher les détails de la série avec le composant DetailsSerie */}
                <DetailsSerie serie={serie}/>


                 {/* { id && favoris.includes(Number(id)) ? */}
{/* Afficher l'icône "Ajouter aux favoris" ou "Retirer des favoris" en fonction de l'état favoris */}
                <div className={style.favoris}>                
                      {favoris.includes(Number(id)) ?
                      <div className={style.ajoutFav}>
                      <p className={style.af}> Retirer des favoris  </p>
                    < FaHeart className={style.iconsSerie} onClick={()=>release()}/>
                    </div>
                      :
                      <div className={style.suppFav}>
                       <p className={style.ar}>  Ajouter aux favoris </p>
                    < FaRegHeart className={style.iconsSerie} onClick={grab}/>       
                    </div>           
                }
              </div>


                <div className={style.navSerie}>
{/* Lorsquele bouton "Casting" est cliqué, la fonction handleClick est appelée et modifie la valeur de l'état showCasting à true. */}
                   <button onClick={handleClickCasting} className={style.buton}> Casting </button> 
                   <button onClick={handleClickSeason} className={style.buton}> Seasons </button>
                </div>


{/* expression ternaire affiche le composant Casting seulement si l'état showCasting est vrai. Nous passons également l'ID de la série à afficher dans le composant Casting en tant que prop serieId. */}
                { showCasting && < Casting idSerie={id}/>}
                { showSeason && < Seasons idSerie={id}/>}
      
           
                <ToastContainer 
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                />
                
 </div>
</>
  );
};




