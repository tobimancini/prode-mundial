import React, { useContext, useEffect, useState } from 'react'
import './styles.css'
import { Prode } from '../../Context/prodeData'
import getAllPuntajes from '../Utils/getAllPuntajes';
import { FaCrown } from 'react-icons/fa';


const TablaPosiciones = () => {

    const { allPuntajes, setAllPuntajes, modalPredic, setModalPredic, setUsuarioElegido } = useContext(Prode);

    const seleccionarUsuario = (userId) => {
        setModalPredic(modalPredic === true ? false : true);
        setUsuarioElegido(userId);
    }

    useEffect(() => {
        getAllPuntajes(setAllPuntajes);
        console.log(allPuntajes);
    }, [modalPredic])


    return (
        <div className='clasificacionCont'>
            <h2 onClick={()=>console.log(allPuntajes)}>CLASIFICACIÓN</h2>
            <div className='tablaPosicionesCont'>
                {
                    !allPuntajes.length ?
                        null :
                        <>
                            {
                                allPuntajes.map(user => {
                                    return <div key={user.uid} className={`tablaUser ${allPuntajes[0].uid === user.uid ? "primero" : "otros"}`}>
                                        <p className='nombre' key={`nombre${user.uid}`}>{allPuntajes.indexOf(user) + 1}. {user.nombre.toUpperCase()} </p>
                                        <div className='puntajeTabla'>
                                            <p key={`puntos${user.uid}`} className='puntosTabla'>{!user.puntajeActual ? 0 : user.puntajeActual} pts</p>
                                            <div className='tresPuntos' onClick={() => seleccionarUsuario(user.uid)}>
                                                <span></span>
                                                <span></span>
                                                <span></span>
                                            </div>
                                        </div>
                                        {
                                            allPuntajes[0].uid === user.uid ? 
                                            <FaCrown className='crown'/>: null
                                        }
                                    </div>
                                })
                            }
                        </>
                }
            </div>
        </div>
    )
}

export default TablaPosiciones