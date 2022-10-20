import React, { useContext, useEffect, useState } from 'react'
import { Prode } from '../../Context/prodeData'
import './styles.css';

const Prediccion = () => {

    const { prediccionActual, database } = useContext(Prode);
    const [sortedPredic, setSortedPredic] = useState([]);

    let prediccionArray = [];
    const sortPrediccion = () => {
        if (prediccionActual !== {}) {
            let prediccion = Object.entries(prediccionActual);
            for (let i = 0; i < prediccion.length; i++) {
                const el = prediccion[i];
                if (el[1].ganador !== "") {
                    prediccionArray.push(el);
                }
            }
        }
        prediccionArray.sort((a,b) => (parseInt(a[1].partido) > parseInt(b[1].partido)) ? 1 : ((parseInt(b[1].partido) > parseInt(a[1].partido)) ? -1 : 0));
        setSortedPredic(prediccionArray);
    }

    useEffect(() => {
        sortPrediccion()
    }, [prediccionActual])



    return (
        <div className='prediccionCont'>
            <h2>MI PREDICCIÓN</h2>
            <div className='prediccionTitulos'>
                <div>PARTIDO</div>
                <div className='prediccionLine'>PREDICCIÓN</div>
                <div>PUNTOS</div>
            </div>
            {
                sortedPredic.length !== 0?
                    
                    sortedPredic.map(partido => {

                        return <div className='predPartido' key={partido[1].partido}>
                            <p>{partido[1].partido}</p>
                            <p className='predicData'>{database[partido[0]].loc} {partido[1].local} vs {partido[1].visitante} {database[partido[0]].vis}</p>
                            <p>-</p>
                        </div>
                    })

                    :

                    null
            }
        </div>
    )
}

export default Prediccion