import React, { useContext } from 'react'
import './styles.css'
import { Prode } from '../../Context/prodeData'

const TablaPosiciones = () => {

    const { allPuntajes } = useContext(Prode);

    return (
        <div className='tablaPosicionesCont'>
            {
                !allPuntajes.length ?
                    null :
                    allPuntajes.map(user => {
                        return <div key={user.uid} className="userItemTabla">
                            <p>{user.nombre.toUpperCase()} </p>
                            <p>{user.dni} </p>
                            <p>{!user.puntajeActual ? 0 : user.puntajeActual} </p>
                        </div>
                    })
            }
        </div>
    )
}

export default TablaPosiciones