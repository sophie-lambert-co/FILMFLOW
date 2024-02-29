
import { useState } from 'react';
import Modal from 'react-modal';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Acteurs } from './Pages/Acteurs/Acteurs';
import { Favoris } from './Pages/Favoris/Favoris';
import { Home } from './Pages/Home/Home';
import { Resultats } from './Pages/Resultats/Resultats';
import { Serie } from './Pages/Serie/Serie';

//import components
import {NavBar}  from './Component/NavBar/NavBar';
import  {SearchBar}  from './Component/SearchBar/SearchBar';


//style personnalisé pour la boîte de dialogue modale
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius:'15px',
    backgroundColor: 'rgb(78, 73, 73)',
  },

  input: {
    backgroundColor: 'rgb(100, 92, 92)',
  },



 ReactModal__Overlay: {

backGroundColor: 'rgb(71, 92, 92, O.83)',
 }



}





// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
// fonction Modal.setAppElement pour lier la boîte de dialogue modale à l'élément racine de l'application.
Modal.setAppElement('#root');

//composant App qui contient la barre de navigation et la boîte de dialogue modale.
export const App = () => {


//utilise useState pour stocker l'état de la boîte de dialogue modale et les fonctions openModal
// et closeModal pour ouvrir et fermer la boîte de dialogue modale. 
  const [isOpen, setIsOpen] = useState(false);


  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <BrowserRouter>
      <NavBar openModal={openModal} closeModal={closeModal}/>
      
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
          <SearchBar openModal={openModal} closeModal={closeModal}/>
      </Modal>
    
      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/resultats/' element={<Resultats />} />
        <Route path='/serie/:id' element={<Serie />} />
        <Route path='/acteurs/:id' element={<Acteurs />} />
        <Route path='/favoris' element={<Favoris />} />

      </Routes>
    </BrowserRouter>
   // React Router pour définir les différentes routes de l'application et pour afficher les différentes pages en
   // fonction de l'URL actuelle.
  )
}