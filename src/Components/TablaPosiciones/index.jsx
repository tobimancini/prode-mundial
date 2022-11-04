import React, { useContext, useEffect, useState } from 'react'
import './styles.css'
import { Prode } from '../../Context/prodeData'
import getAllPuntajes from '../Utils/getAllPuntajes';
import { FaCrown } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';
import FadeLoader from "react-spinners/FadeLoader";
import equiposPorSexo from '../Utils/equiposPorSexo';
import getTabla from '../Utils/getTabla';



const TablaPosiciones = () => {

    const { allPuntajes, setAllPuntajes, modalPredic, setModalPredic, setUsuarioElegido, setEquipoElegido, equiposFem, equiposMasc, userInfo, tipoIdElegido, setTipoIdElegido,
        equiposUser, setEquiposUser, posicionesInd, posicionesGrup, setPosicionesGrup, setPosicionesInd } = useContext(Prode);

    const [tablaState, setTablaState] = useState("individual");
    const [indiMore, setIndiMore] = useState(11);
    const [teamMore, setTeamMore] = useState(11);

    const getMore = (state) =>{
        if (state === "individual") {
            getTabla(state, indiMore+10, setPosicionesGrup, setPosicionesInd);
            setIndiMore(indiMore+10)
        }else if (state === "equipos") {
            getTabla(state, teamMore+10, setPosicionesGrup, setPosicionesInd);
            setTeamMore(teamMore+10)
        }
    }

    
    


    return (
        <div className='clasificacionCont'>
            {
                !posicionesGrup.length || !posicionesInd.length ?
                    <div className='prediccionCont'>
                        <h3>No se computaron PUNTAJES</h3>
                    </div>
                    :
                    <>
                        <h2>TABLA POSICIONES</h2>
                        {
                            userInfo.jaula === true ?
                                <div className='tablaOpciones'>
                                    <h3 onClick={() => setTablaState("individual")} className={tablaState === "individual" ? "active" : null}>INDIVIDUAL</h3>
                                    <h3 onClick={() => setTablaState("equipos")} className={tablaState === "equipos" ? "active" : null}>EQUIPOS</h3>
                                </div>
                                :
                                null
                        }

                        <div className='tablaCont'>
                            {
                                tablaState === "individual" ?

                                    posicionesInd.map(user => {
                                        return <div key={user.uid} className={`tablaUser ${userInfo.posicion === 1 ? "primero" : "otros"}`}>
                                            <p className='nombre' key={`nombre${user.uid}`}>{user.posicion}. {user.apellido.toUpperCase()} {user.nombre.slice(0, 1).toUpperCase()}.</p>
                                            <div className='puntajeTabla'>
                                                <p key={`puntos${user.uid}`} className='puntosTabla'>{user.puntaje === "" ? 0 : user.puntaje} pts</p>
                                            </div>
                                            {
                                                user.posicion === 1 ?
                                                    <FaCrown className='crown' /> : null
                                            }
                                        </div>
                                    })

                                    :

                                    posicionesGrup.map(equipo => {

                                        return <div key={equipo.equipo} className={`tablaUser ${equipo.posicion === 1 ? "primero" : "otros"}`}>
                                            <p className='nombre' key={`nombre${equipo.equipo}`}>{equipo.posicion}. {equipo.equipo.toUpperCase()}</p>
                                            <div className='puntajeTabla'>
                                                <p key={equipo.puntaje} className='puntosTabla'>{equipo.puntaje !== "" ? equipo.puntaje : 0} pts</p>
                                            </div>
                                            {
                                                equipo.posicion === 1 ?
                                                    <FaCrown className='crown' /> : null
                                            }
                                        </div>
                                    })



                            }
                        </div>
                        <div className='btnFiltro act' onClick={()=>getMore(tablaState)}>ver más</div>


                    </>
            }
        </div>
    )
}

export default TablaPosiciones