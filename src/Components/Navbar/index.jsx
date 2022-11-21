import React, { useContext, useEffect } from 'react';
import './styles.css';
import { MdOutlineSportsSoccer, MdAdminPanelSettings } from 'react-icons/md';
import { GrTask } from 'react-icons/gr';
import { BiTrophy } from 'react-icons/bi';
import { HiOutlineDocumentText, HiOutlineUser } from 'react-icons/hi';
import { AiFillHome } from 'react-icons/ai';
import { Prode } from '../../Context/prodeData';


const Navbar = () => {

  const { pageState, setPageState, setFaseElegida, userInfo } = useContext(Prode);

  const changeState = (section) => {
    setPageState(section);
    setFaseElegida("Fase 1");
    window.scroll(0, 0);
  }

  useEffect(() => {
    const inicio = document.getElementById('inicio');
    const perfil = document.getElementById('perfil');
    const partidos = document.getElementById('partidos');
    const clasificacion = document.getElementById('clasificacion');
    const prediccion = document.getElementById('prediccion');
    const reglas = document.getElementById('reglas');

    const titInicio = document.querySelector('.tituloIni');
    const titPerfil = document.querySelector('.tituloPer');
    const titPrediccion = document.querySelector('.tituloPred');
    const titClasificacion = document.querySelector('.tituloClas');
    const titPartidos = document.querySelector('.tituloPar');
    const titReglas = document.querySelector('.tituloReg');


    if (pageState == "inicio") {
      inicio.classList.add('active');
      perfil.classList.remove('active');
      partidos.classList.remove('active');
      clasificacion.classList.remove('active');
      prediccion.classList.remove('active');
      reglas.classList.remove('active');


      titInicio.classList.add('active');
      titPerfil.classList.remove('active');
      titPartidos.classList.remove('active');
      titClasificacion.classList.remove('active');
      titPrediccion.classList.remove('active');
      titReglas.classList.remove('active');


      titInicio.classList.remove('inactive');
      titPerfil.classList.add('inactive');
      titPartidos.classList.add('inactive');
      titClasificacion.classList.add('inactive');
      titPrediccion.classList.add('inactive');
      titReglas.classList.add('inactive');

    } else if (pageState === "perfil") {
      perfil.classList.add('active');
      partidos.classList.remove('active');
      clasificacion.classList.remove('active');
      prediccion.classList.remove('active');
      inicio.classList.remove('active');
      reglas.classList.remove('active');


      titPerfil.classList.add('active');
      titPartidos.classList.remove('active');
      titClasificacion.classList.remove('active');
      titPrediccion.classList.remove('active');
      titInicio.classList.remove('active');
      titReglas.classList.remove('active');


      titPerfil.classList.remove('inactive');
      titPartidos.classList.add('inactive');
      titClasificacion.classList.add('inactive');
      titPrediccion.classList.add('inactive');
      titInicio.classList.add('inactive');
      titReglas.classList.add('inactive');

    } else if (pageState === "partidos") {
      titPerfil.classList.remove('active');
      titPartidos.classList.add('active');
      titClasificacion.classList.remove('active');
      titPrediccion.classList.remove('active');
      titInicio.classList.remove('active');
      titReglas.classList.remove('active');

      titPerfil.classList.add('inactive');
      titPartidos.classList.remove('inactive');
      titClasificacion.classList.add('inactive');
      titPrediccion.classList.add('inactive');
      titInicio.classList.add('inactive');
      titReglas.classList.add('inactive');


      perfil.classList.remove('active');
      partidos.classList.add('active');
      clasificacion.classList.remove('active');
      prediccion.classList.remove('active');
      inicio.classList.remove('active');
      reglas.classList.remove('active');

    } else if (pageState === "clasificacion") {
      perfil.classList.remove('active');
      partidos.classList.remove('active');
      clasificacion.classList.add('active');
      prediccion.classList.remove('active');
      inicio.classList.remove('active');
      reglas.classList.remove('active');

      titPerfil.classList.remove('active');
      titPartidos.classList.remove('active');
      titClasificacion.classList.add('active');
      titPrediccion.classList.remove('active');
      titInicio.classList.remove('active');
      titReglas.classList.remove('active');

      titPerfil.classList.add('inactive');
      titPartidos.classList.add('inactive');
      titClasificacion.classList.remove('inactive');
      titPrediccion.classList.add('inactive');
      titInicio.classList.add('inactive');
      titReglas.classList.add('inactive');
    } else if (pageState === "prediccion") {
      perfil.classList.remove('active');
      partidos.classList.remove('active');
      clasificacion.classList.remove('active');
      prediccion.classList.add('active');
      inicio.classList.remove('active');
      reglas.classList.remove('active');

      titPerfil.classList.remove('active');
      titPartidos.classList.remove('active');
      titClasificacion.classList.remove('active');
      titPrediccion.classList.add('active');
      titInicio.classList.remove('active');
      titReglas.classList.remove('active');

      titPerfil.classList.add('inactive');
      titPartidos.classList.add('inactive');
      titClasificacion.classList.add('inactive');
      titPrediccion.classList.remove('inactive');
      titInicio.classList.add('inactive');
      titReglas.classList.add('inactive');
    } else if (pageState === 'reglas') {
      perfil.classList.remove('active');
      partidos.classList.remove('active');
      clasificacion.classList.remove('active');
      prediccion.classList.remove('active');
      inicio.classList.remove('active');
      reglas.classList.add('active');

      titPerfil.classList.remove('active');
      titPartidos.classList.remove('active');
      titClasificacion.classList.remove('active');
      titPrediccion.classList.remove('active');
      titInicio.classList.remove('active');
      titReglas.classList.add('active');

      titPerfil.classList.add('inactive');
      titPartidos.classList.add('inactive');
      titClasificacion.classList.add('inactive');
      titPrediccion.classList.add('inactive');
      titInicio.classList.add('inactive');
      titReglas.classList.remove('inactive');
    } else {
      perfil.classList.remove('active');
      partidos.classList.remove('active');
      clasificacion.classList.remove('active');
      prediccion.classList.remove('active');
      inicio.classList.remove('active');
      reglas.classList.remove('active');

      titPerfil.classList.remove('active');
      titPartidos.classList.remove('active');
      titClasificacion.classList.remove('active');
      titPrediccion.classList.remove('active');
      titInicio.classList.remove('active');
      titReglas.classList.remove('active');

      titPerfil.classList.add('inactive');
      titPartidos.classList.add('inactive');
      titClasificacion.classList.add('inactive');
      titPrediccion.classList.add('inactive');
      titInicio.classList.add('inactive');
      titReglas.classList.add('inactive');
    }


    if (userInfo.administrador === true) {

      const admin = document.getElementById('admin');
      const titAdmin = document.querySelector('.tituloAdmin');

      if (pageState === "inicio") {
        admin.classList.remove('active');

        titAdmin.classList.remove('active');
        titAdmin.classList.add('inactive');

      } else if (pageState === "perfil") {
        admin.classList.remove('active');

        titAdmin.classList.remove('active');
        titAdmin.classList.add('inactive');

      } else if (pageState === "partidos") {
        admin.classList.remove('active');

        titAdmin.classList.remove('active');
        titAdmin.classList.add('inactive');
      } else if (pageState === "clasificacion") {
        admin.classList.remove('active');

        titAdmin.classList.remove('active');
        titAdmin.classList.add('inactive');
      } else if (pageState === "prediccion") {
        admin.classList.remove('active');

        titAdmin.classList.remove('active');
        titAdmin.classList.add('inactive');
      } else if (pageState === "reglas") {
        admin.classList.remove('active');

        titAdmin.classList.remove('active');
        titAdmin.classList.add('inactive');
      } else {
        admin.classList.add('active');

        titAdmin.classList.add('active');
        titAdmin.classList.remove('inactive');
      }
    }
  }, [pageState]);

  return (
    <header className='navbarContainer'>
      <div className='topNav'>
        <p className='design'>Diseñado por Tobías Mancini</p>
        <p>&</p>
        <img src={process.env.PUBLIC_URL + "images/lajaulaW.png"} alt="logoBlanco" />
      </div>
      <ul className='navbarList'>
        <li id='inicio' className='navItem' onClick={() => changeState("inicio")}>
          <AiFillHome />
          <p className='tituloIni'>Home</p>
        </li>
        <li id='partidos' className='navItem' onClick={() => changeState("partidos")}>
          <MdOutlineSportsSoccer />
          <p className='tituloPar'>Partidos</p>
        </li>
        <li id='prediccion' className='navItem' onClick={() => changeState("prediccion")}>
          <GrTask />
          <p className='tituloPred'>Predicción</p>
        </li>
        <li id='clasificacion' className='navItem' onClick={() => changeState("clasificacion")}>
          <BiTrophy />
          <p className='tituloClas'>Posiciones</p>
        </li>
        <li id='reglas' className='navItem' onClick={() => changeState("reglas")}>
          <HiOutlineDocumentText />
          <p className='tituloReg'>Reglas</p>
        </li>
        <li id='perfil' className='navItem' onClick={() => changeState("perfil")}>
          <HiOutlineUser />
          <p className='tituloPer'>Perfil</p>
        </li>
        {
          userInfo === {} ?
            null
            :
            userInfo.administrador === true ?
              <li id='admin' className='navItem' onClick={() => changeState("admin")}>
                <MdAdminPanelSettings />
                <p className='tituloAdmin'>Admin</p>
              </li>
              :
              null
        }
      </ul>

    </header>
  )
}

export default Navbar