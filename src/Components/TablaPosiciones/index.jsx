import React, { useContext, useEffect, useState } from 'react'
import './styles.css'
import { Prode } from '../../Context/prodeData'
import getAllPuntajes from '../Utils/getAllPuntajes';
import { FaCrown } from 'react-icons/fa';
import FadeLoader from "react-spinners/FadeLoader";
import equiposPorSexo from '../Utils/equiposPorSexo';



const TablaPosiciones = () => {

    const { allPuntajes, setAllPuntajes, modalPredic, setModalPredic, setUsuarioElegido,setEquipoElegido,  equiposFem, equiposMasc, userInfo , tipoIdElegido, setTipoIdElegido,
            equiposUser, setEquiposUser} = useContext(Prode);

    const seleccionarUsuario = (id, tipo) => {
        if (tipo === "usuario") {
            setEquipoElegido("")
            setUsuarioElegido(id);
            setTipoIdElegido("usuario")
            setModalPredic(modalPredic + 1);
        }
        if (tipo === "equipo") {
            setUsuarioElegido("");
            setEquipoElegido(id);
            setModalPredic(modalPredic + 1);
            setTipoIdElegido("equipo")
        }
    }


    useEffect(() => {
        if (userInfo.sexo !== undefined) {
            equiposPorSexo(userInfo.sexo, allPuntajes, setEquiposUser)
        }
    }, [allPuntajes, userInfo])
    


    return (
        <div className='clasificacionCont'>
            {
                !allPuntajes.length ?
                    <div className='loaderContain'>
                        <FadeLoader className='loader' color={'#edebeb'} loading={true} size={10} aria-label="Loading Spinner" data-testid="loader" />
                    </div>
                    :
                    <>
                        <h2 onClick={() => console.log(allPuntajes)}>TABLA INDIVIDUAL (TOP 5)</h2>
                        <div className='tablaPosicionesCont'>
                            {
                                
                                allPuntajes.map(user => {
                                    if (allPuntajes.indexOf(user) + 1 < 6) {
                                        return <div key={user.uid} className={`tablaUser ${allPuntajes[0].uid === user.uid ? "primero" : "otros"}`}>
                                            <p className='nombre' key={`nombre${user.uid}`}>{allPuntajes.indexOf(user) + 1}. {user.nombre.toUpperCase()} </p>
                                            <div className='puntajeTabla'>
                                                <p key={`puntos${user.uid}`} className='puntosTabla'>{!user.puntajeActual ? 0 : user.puntajeActual} pts</p>
                                                <div className='tresPuntos' onClick={() => seleccionarUsuario(user.uid, "usuario")}>
                                                    <span></span>
                                                    <span></span>
                                                    <span></span>
                                                </div>
                                            </div>
                                            {
                                                allPuntajes[0].uid === user.uid ?
                                                    <FaCrown className='crown' /> : null
                                            }
                                        </div>
                                    }

                                })
                            }
                        </div>

                        <h2>TABLA EQUIPOS (TOP 5)</h2>
                        <div className='tablaPosicionesCont'>
                            {
                                equiposUser.length>0?
                                
                                equiposUser.map(equipo => {
                                    if (equiposUser.indexOf(equipo) + 1 < 6) {
                                        return <div key={equipo[1]} className={`tablaUser ${equiposUser[0][1] === equipo[1] ? "primero" : "otros"}`}>
                                            <p className='nombre' key={`nombre${equipo[1]}`}>{equiposUser.indexOf(equipo) + 1}. {equipo[1].toUpperCase()} </p>
                                            <div className='puntajeTabla'>
                                                <p key={`puntos${equipo[1]}`} className='puntosTabla'>{equipo[0]} pts</p>
                                                <div className='tresPuntos' onClick={()=>seleccionarUsuario(equipo[1], "equipo")}>
                                                    <span></span>
                                                    <span></span>
                                                    <span></span>
                                                </div>
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
                    </>
            }
        </div>
    )
}

export default TablaPosiciones