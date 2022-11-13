import React from 'react';
import { FiDownload } from 'react-icons/fi';
import './styles.css';

const Reglas = () => {
  return (
    <>
    <h2 className='reglasTit'>Reglas del prode</h2>
    <a href="/Reglas.pdf" download="Reglas Prode Qatar - La Jaula">
    <div className='btnFiltro reglas' >
        <p className='reglasP'>Descargá el reglamento</p>
        <FiDownload className='reglasDesc'/>
    </div>
    </a>
    </>
  )
}

export default Reglas