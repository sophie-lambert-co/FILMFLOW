import style from "./DetailsSerie.module.css"
import notfound from '../../assets/image-not-found.jpeg'
import { AiOutlineStar,FaHashtag } from 'react-icons/all'


// Composant DetailsSerie qui prend comme propriété "serie"
export const DetailsSerie = ({serie}) => {
  

// Retourne l'affichage du composant
return (
<>
  
    <div className={style.cardSerie}> {/*  Crée une div avec la classe "cardSerie" pour afficher les détails de l a série*/}
              
        <img className={style.photoSerie} src={serie?.image?.original ?? serie?.image?.medium ?? notfound} />    
{/* Affiche l'image de la série, si elle existe. Si l'image "original" n'existe pas, affiche "medium". 
Si aucune image n'existe, affiche l'image de remplacement "notfound"  */} 
      
<div  className={style.info}>
        <div className={style.titreGenre}>
            <div className={style.titreSerie}>{serie?.name} </div>
            <div className={style.hasthaggenre}>
               
                {serie?.genres.map((genre, index )=>(
                    <div div key={index} className={style.genre}>
                    < FaHashtag className={style.iconsHastag} /> 
                        {genre}                       
                    </div> 
                    ))}
            </div>
           
        </div>

{/* Affiche le résumé de la série, en utilisant "dangerouslySetInnerHTML" pour interpréter les balises HTML.  */}
        <p dangerouslySetInnerHTML={{ __html: serie?.summary }} className={style.resumeSerie}></p>   
         
        <p className={style.note}>
                    < AiOutlineStar className={style.iconsStar} />
                    {serie?.rating.average}
        </p>
        </div>
       
    </div>
    </>
    )
}