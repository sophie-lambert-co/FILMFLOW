// https://www.youtube.com/watch?v=gGAizklH-BQ
// Caroussel réalisé par ce tuto de light code 

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import notfound from '../../assets/image-not-found.jpeg'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectCoverflow, Autoplay} from 'swiper';


// Import des styles pour le carrousel
import'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import './carroussel.css';

// Déclaration du composant Caroussel
export const Caroussel = () =>{

// Déclaration d'un state pour stocker les nouveaux programmes TV   
const [newShow, setNewShow] = useState ([])
 // Initialisation du state 'newShow' à un tableau vide à l'aide du hook useState

 // Création d'une date formatée pour l'utilisation dans l'URL de l'API
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = ("0" + (currentDate.getMonth() + 1)).slice(-2); 
    const day = ("0" + currentDate.getDate()).slice(-2); 
    const formattedDate = `${year.toString().substring(-2)}-${month}-${day}`; 

 // Appel à l'API TVMaze pour récupérer les 10 premières émissions du jour aux États-Unis (requète)
 // Effectue la requête API une seule fois, lors du chargement du composant
    useEffect(() => {

    fetch('https://api.tvmaze.com/schedule/web?date=' + formattedDate + '&country=US')
        .then(res => res.json())
        .then(data => setNewShow(data.slice(0, 10)))
        .catch(err=> console.log(err))
}, []);


// Affichage du composant
return (

    <div className='caroussel'>

<div>
            <div className='carousel-content'>
                <span>discover</span>
                <h1>NEW SHOWS</h1>
                <hr />
                <p> “ dive into the endless world of entertainement : find your next favorite series with FilmFlow. ” </p>
            </div>
        </div>
        
        <Swiper className='mySwiper'
        modules={[Pagination, EffectCoverflow, Autoplay]}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 3,
            slideShadows: true
        }}
            loop={true}
            pagination={{clickable: true}}
            // slidesPerView={3}
            autoplay={{
                delay: 2000,
                disableOnInteraction: false
            }}
            
       breakpoints={{
                640 :{
                    slidesPerView: 1,
                    autoplay :false
                },
                768:{
                    slidesPerView: 1
                },
                1024:{
                    slidesPerView: 2
                },
                1560:{
                    slidesPerView: 4
                }
            }}
            
        >
 {/* Parcours du tableau 'newShow' pour créer une diapositive pour chaque émission */}
  {/* Utilisation du module SwiperSlide pour afficher chaque programme TV */}
        {newShow.map((shows, index) => (
            <SwiperSlide key={index} style={{ backgroundImage: `url(${shows?._embedded.show.image?.original
                ?? 
                shows?._embedded.show.image?.medium 
                ??
                notfound})` ,
                backgroundSize: 'cover',
                backgroundPosition: 'center',}} className='mySwiperSlider'>
                    <div>
                        < Link to={ `/serie/${shows?._embedded.show.id}`} className='mySwiperSliderLink'>
                            <h2>{shows?._embedded.show.name} </h2> 
                            <p className='resume' dangerouslySetInnerHTML={{__html: shows?._embedded?.show?.summary}}/>
                        </Link>
                    </div>
                </SwiperSlide>
            ))}

        </Swiper>

        
             
    </div>
        
           
        
);
}


