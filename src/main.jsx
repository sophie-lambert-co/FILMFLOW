import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './Pages/Home/Home'
import { Resultats } from './Pages/Resultats/Resultats'



import './index.css'
import { NavBar } from './Component/NavBar/NavBar'
import { Serie } from './Pages/Serie/Serie'
import { Acteurs } from './Pages/Acteurs/Acteurs'
import { Favoris } from './Pages/Favoris/Favoris'
import { SearchBar } from './Component/SearchBar/SearchBar'
import { App } from './App'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)


