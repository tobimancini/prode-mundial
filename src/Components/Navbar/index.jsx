import React, { useContext, useEffect, useState } from 'react';
import './styles.css';
import { MdOutlineSportsSoccer } from 'react-icons/md';
import { GrTask } from 'react-icons/gr';
import { BiTrophy } from 'react-icons/bi';
import { HiOutlineUser } from 'react-icons/hi';
import { Prode } from '../../Context/prodeData';


const Navbar = () => {

  const {pageState, setPageState} = useContext(Prode);  

  useEffect(() => {
    const perfil = document.getElementById('perfil');
    const partidos = document.getElementById('partidos');
    const clasificacion = document.getElementById('clasificacion');
    const prediccion = document.getElementById('prediccion');
    const titPerfil = document.querySelector('.tituloPer');
    const titPrediccion = document.querySelector('.tituloPred');
    const titClasificacion = document.querySelector('.tituloClas');
    const titPartidos = document.querySelector('.tituloPar');

    if (pageState === "perfil") {
      perfil.classList.add('active');
      partidos.classList.remove('active');
      clasificacion.classList.remove('active');
      prediccion.classList.remove('active');

      titPerfil.classList.add('active');
      titPartidos.classList.remove('active');
      titClasificacion.classList.remove('active');
      titPrediccion.classList.remove('active');

      titPerfil.classList.remove('inactive');
      titPartidos.classList.add('inactive');
      titClasificacion.classList.add('inactive');
      titPrediccion.classList.add('inactive');
    }else if (pageState === "partidos") {
      titPerfil.classList.remove('active');
      titPartidos.classList.add('active');
      titClasificacion.classList.remove('active');
      titPrediccion.classList.remove('active');

      titPerfil.classList.add('inactive');
      titPartidos.classList.remove('inactive');
      titClasificacion.classList.add('inactive');
      titPrediccion.classList.add('inactive');
      
      perfil.classList.remove('active');
      partidos.classList.add('active');
      clasificacion.classList.remove('active');
      prediccion.classList.remove('active');
    }else if (pageState === "clasificacion") {
      perfil.classList.remove('active');
      partidos.classList.remove('active');
      clasificacion.classList.add('active');
      prediccion.classList.remove('active');

      titPerfil.classList.remove('active');
      titPartidos.classList.remove('active');
      titClasificacion.classList.add('active');
      titPrediccion.classList.remove('active');

      titPerfil.classList.add('inactive');
      titPartidos.classList.add('inactive');
      titClasificacion.classList.remove('inactive');
      titPrediccion.classList.add('inactive');
    }else{
      perfil.classList.remove('active');
      partidos.classList.remove('active');
      clasificacion.classList.remove('active');
      prediccion.classList.add('active');

      titPerfil.classList.remove('active');
      titPartidos.classList.remove('active');
      titClasificacion.classList.remove('active');
      titPrediccion.classList.add('active');

      titPerfil.classList.add('inactive');
      titPartidos.classList.add('inactive');
      titClasificacion.classList.add('inactive');
      titPrediccion.classList.remove('inactive');
    }
  }, [pageState]);

  return (
    <header className='navbarContainer'>
      <ul className='navbarList'>
        <li id='partidos' className='navItem' onClick={()=>setPageState("partidos")}>
          <MdOutlineSportsSoccer />
          <p className='tituloPar'>Partidos</p>
        </li>
        <li id='prediccion' className='navItem' onClick={()=>setPageState("prediccion")}>        
          <GrTask />
          <p className='tituloPred'>Predicción</p>
        </li>
        <li id='clasificacion' className='navItem' onClick={()=>setPageState("clasificacion")}>         
          <BiTrophy/>
          <p className='tituloClas'>Clasificación</p>
        </li>
        <li id='perfil' className='navItem' onClick={()=>setPageState("perfil")}>        
          <HiOutlineUser/>
          <p className='tituloPer'>Perfil</p>
        </li>
      </ul>
      
    </header>
  )
}

export default Navbar