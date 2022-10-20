import React, { useContext, useEffect } from 'react';
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

    if (pageState === "perfil") {
      perfil.classList.add('active');
      partidos.classList.remove('active');
      clasificacion.classList.remove('active');
      prediccion.classList.remove('active');
    }else if (pageState === "partidos") {
      perfil.classList.remove('active');
      partidos.classList.add('active');
      clasificacion.classList.remove('active');
      prediccion.classList.remove('active');
    }else if (pageState === "clasificacion") {
      perfil.classList.remove('active');
      partidos.classList.remove('active');
      clasificacion.classList.add('active');
      prediccion.classList.remove('active');
    }else{
      perfil.classList.remove('active');
      partidos.classList.remove('active');
      clasificacion.classList.remove('active');
      prediccion.classList.add('active');
    }
  }, [pageState])
  

  return (
    <header className='navbarContainer'>
      <ul className='navbarList'>
        <li id='partidos' className='navItem' onClick={()=>setPageState("partidos")}>
          {/* <p>Partidos</p> */}
          <MdOutlineSportsSoccer />
        </li>
        <li id='prediccion' className='navItem' onClick={()=>setPageState("prediccion")}>
          {/* <p>Predicción</p> */}
          <GrTask />
        </li>
        <li id='clasificacion' className='navItem' onClick={()=>setPageState("clasificacion")}>
          {/* <p>Clasificación</p> */}
          <BiTrophy/>
        </li>
        <li id='perfil' className='navItem' onClick={()=>setPageState("perfil")}>
          {/* <p>Perfil</p> */}
          <HiOutlineUser/>
        </li>
      </ul>
    </header>
  )
}

export default Navbar