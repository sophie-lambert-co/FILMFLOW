import style from "./ListeResult.module.css"
import notfound from '../../assets/image-not-found.jpeg'



export const ListeResult = ({valeur }) => {
   return (
       <>
                     <div>
                        <p className={style.title} >{valeur.show.name}</p>
                        <div className={style.imgResum}>
                        <img src={valeur.show.image?.original ?? valeur.show.image?.medium ?? notfound } className={style.affiche}/>
                        <p dangerouslySetInnerHTML={{__html: valeur.show.summary }} className={style.resume}></p>   
                        </div>
                     </div>
     
       </>
   )
}

  