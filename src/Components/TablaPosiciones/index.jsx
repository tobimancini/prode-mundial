import React, { useContext, useEffect, useState } from 'react'
import './styles.css'
import { Prode } from '../../Context/prodeData'

const TablaPosiciones = () => {

    const { allPuntajes } = useContext(Prode);

    return (
        <div className='clasificacionCont'>
            <h2>CLASIFICACIÓN</h2>
            <div className='tablaPosicionesCont'>
                {
                    !allPuntajes.length ?
                        null :
                        <>
                            <div className='tablaTitulos'>
                                <div>Nombre</div>
                                <div>DNI</div>
                                <div className='tablaPuntos'>Puntos</div>
                            </div>
                            {
                                allPuntajes.map(user => {
                                    return <div key={user.uid} className={`tablaUser ${allPuntajes[0].uid === user.uid ? "primero" : "otros"}`}>
                                        <p >{user.nombre.toUpperCase()} </p>
                                        <p>{user.dni} </p>
                                        <p className='puntosTabla'>{!user.puntajeActual ? 0 : user.puntajeActual} </p>
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