// src/reactMain.js (nombre cualquiera)
import React from 'react';
import ReactDOM from 'react-dom/client';
import Galeria from './componentes/Galeria';
import './style.css'; // si quieres usar estilos globales

ReactDOM.createRoot(document.getElementById('react-root')).render(
  <React.StrictMode>
    <Galeria />
  </React.StrictMode>
);
