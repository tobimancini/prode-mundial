import React, { useContext } from 'react'
import { Prode } from '../../Context/prodeData'

const TablaPosiciones = () => {

    const { allPuntajes } = useContext(Prode);

    return (
        <div className='tablaPosicionesCont'>
            <h2>TABLA DE POSICIONES</h2>
            {
                !allPuntajes.length ?
                    null :
                    allPuntajes.map(user => {
                        return <div key={user.uid}>
                            <p>nombre: {user.nombre} </p>
                            <p>dni: {user.dni} </p>
                            <p>puntos: {!user.puntajeActual ? 0 : user.puntajeActual} </p>
                        </div>
                    })
            }
        </div>
    )
}

export default TablaPosiciones