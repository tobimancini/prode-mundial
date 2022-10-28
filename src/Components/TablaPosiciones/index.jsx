import React, { useContext, useEffect, useState } from 'react'
import './styles.css'
import { Prode } from '../../Context/prodeData'
import getAllPuntajes from '../Utils/getAllPuntajes';
import { FaCrown } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';
import FadeLoader from "react-spinners/FadeLoader";
import equiposPorSexo from '../Utils/equiposPorSexo';



const TablaPosiciones = () => {

    const { allPuntajes, setAllPuntajes, modalPredic, setModalPredic, setUsuarioElegido, setEquipoElegido, equiposFem, equiposMasc, userInfo, tipoIdElegido, setTipoIdElegido,
        equiposUser, setEquiposUser } = useContext(Prode);

    const [tablaState, setTablaState] = useState("individual");

    const seleccionarUsuario = (id, tipo) => {
        if (tipo === "usuario") {
            setEquipoElegido("")
            setUsuarioElegido(id);
            setTipoIdElegido("usuario");
            setModalPredic(modalPredic + 1);
        }
        if (tipo === "equipo") {
            setUsuarioElegido("");
            setTipoIdElegido("equipo")
            setEquipoElegido(id);
            setModalPredic(modalPredic + 1);
        }
    }


    useEffect(() => {
        if (userInfo.sexo !== undefined) {
            equiposPorSexo(userInfo.sexo, allPuntajes, setEquiposUser)
        }
    }, [allPuntajes, userInfo])

    const [usuarioBuscado, setUsuarioBuscado] = useState("");

    const buscadorJugador = () => {
        let local = document.getElementById('buscadorUsuario').value;
        setUsuarioBuscado(local.toUpperCase());
    }


    return (
        <div className='clasificacionCont'>
            {
                !allPuntajes.length ?
                    <div className='loaderContain'>
                        <FadeLoader className='loader' color={'#edebeb'} loading={true} size={10} aria-label="Loading Spinner" data-testid="loader" />
                    </div>
                    :
                    <>
                        <h2>TABLA POSICIONES</h2>
                        <div className='tablaOpciones'>
                            <h3 onClick={() => setTablaState("individual")} className={tablaState === "individual" ? "active" : null}>INDIVIDUAL</h3>
                            <h3 onClick={() => setTablaState("equipos")} className={tablaState === "equipos" ? "active" : null}>EQUIPOS</h3>
                        </div>
                        <div className='tablaOpciones buscador'>
                            <input id='buscadorUsuario' type="text" className='inputProde' placeholder='Buscá a tus amigos o enemigos' onChange={()=>buscadorJugador()} />
                            <FaSearch className='lupita' />
                        </div>
                        <div className='tablaPosicionesCont'>
                            {
                                tablaState === "individual" ?

                                    allPuntajes.map(user => {
                                        if (user.puntajeActual === 0) {
                                            return null
                                        } else if(user.nombre.toUpperCase().includes(usuarioBuscado, 0) || user.apellido.toUpperCase().includes(usuarioBuscado, 0) ){
                                            return <div key={user.uid} className={`tablaUser ${allPuntajes[0].uid === user.uid ? "primero" : "otros"}`}>
                                                <p className='nombre' key={`nombre${user.uid}`}>{allPuntajes.indexOf(user) + 1}. {user.nombre.toUpperCase()} {user.apellido.toUpperCase()}</p>
                                                <div className='puntajeTabla'>
                                                    <p key={`puntos${user.uid}`} className='puntosTabla'>{!user.puntajeActual ? 0 : user.puntajeActual} pts</p>
                                                    <p className='plus' onClick={() => seleccionarUsuario(user.uid, "usuario")}>+</p>
                                                </div>
                                                {
                                                    allPuntajes[0].uid === user.uid ?
                                                        <FaCrown className='crown' /> : null
                                                }
                                            </div>
                                        }

                                    })

                                    :

                                    equiposUser.length > 0 ?

                                        equiposUser.map(equipo => {
                                            if (equipo[0] === 0) {
                                                return null
                                            } else if(equipo[1].toUpperCase().includes(usuarioBuscado, 0)){
                                                return <div key={equipo[1]} className={`tablaUser ${equiposUser[0][1] === equipo[1] ? "primero" : "otros"}`}>
                                                    <p className='nombre' key={`nombre${equipo[1]}`}>{equiposUser.indexOf(equipo) + 1}. {equipo[1].toUpperCase()} </p>
                                                    <div className='puntajeTabla'>
                                                        <p key={`puntos${equipo[1]}`} className='puntosTabla'>{equipo[0]} pts</p>
                                                        <p className='plus' onClick={() => seleccionarUsuario(equipo[1], "equipo")}>+</p>
                                                    </div>
                                                    {
                                                        equipo[1] === equiposUser[0][1] ?
                                                            <FaCrown className='crown' /> : null
                                                    }
                                                </div>
                                            }

                                        })
                                        :
                                        null

                            }
                        </div>

                        {/* <h2>TABLA EQUIPOS</h2>
                        <div className='tablaPosicionesCont'>
                            {
                                equiposUser.length > 0 ?

                                    equiposUser.map(equipo => {
                                        if (equipo[0] === 0) {
                                            return null
                                        } else if (equiposUser.indexOf(equipo) + 1 < 6) {
                                            return <div key={equipo[1]} className={`tablaUser ${equiposUser[0][1] === equipo[1] ? "primero" : "otros"}`}>
                                                <p className='nombre' key={`nombre${equipo[1]}`}>{equiposUser.indexOf(equipo) + 1}. {equipo[1].toUpperCase()} </p>
                                                <div className='puntajeTabla'>
                                                    <p key={`puntos${equipo[1]}`} className='puntosTabla'>{equipo[0]} pts</p>
                                                    <p className='plus' onClick={() => seleccionarUsuario(equipo[1], "equipo")}>+</p>
                                                    {/* <div className='tresPuntos' onClick={()=>seleccionarUsuario(equipo[1], "equipo")}>
                                                    <span></span>
                                                    <span></span>
                                                    <span></span>
                                                </div> */}
                        {/* </div> */}
                        {
                            //     equipo[1] === equiposUser[0][1] ?
                            //         <FaCrown className='crown' /> : null
                            // }
                            // </div>
                            // }

                            // })
                            // :
                            // null
                        }
                        {/* </div> */}
                    </>
            }
        </div>
    )
}

export default TablaPosiciones