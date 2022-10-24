import React, { useContext, useEffect, useState } from 'react'
import { Prode } from '../../Context/prodeData'
import getMatchScore from '../Utils/getMatchScore';
import sortPrediccion from '../Utils/sortPrediccion';
import './styles.css';
import FadeLoader from "react-spinners/FadeLoader";

const Prediccion = () => {

    const { prediccionActual, database, banderas, allPuntajes, userLogged, userInfo, sortedPredic, setSortedPredic } = useContext(Prode);

    const [prediccionUsuario, setPrediccionUsuario] = useState([]);

    useEffect(() => {
        sortPrediccion(prediccionActual, setSortedPredic, false)
        getMatchScore(allPuntajes, userLogged, setPrediccionUsuario);
    }, [prediccionActual, allPuntajes])


    return (
        <>

            {
                sortedPredic.length !== 0 && allPuntajes.length > 0 && prediccionUsuario ?

                    <div className='prediccionCont'>
                        <h2 className='prediccionTitulo'>MI PREDICCIÓN</h2>

                        {sortedPredic.map(partido => {

                            return <div className='predPartido' key={partido[1].partido}>

                                <div className='prediccionMiddle'>
                                    <img src={process.env.PUBLIC_URL + banderas[database[partido[0]].local]} alt={database[partido[0]].local} />
                                    <p className='predicData'> {database[partido[0]].loc} {partido[1].local} vs {partido[1].visitante} {database[partido[0]].vis}</p>
                                    <img src={process.env.PUBLIC_URL + banderas[database[partido[0]].visitante]} alt={database[partido[0]].visitante} />
                                </div>
                                {

                                    prediccionUsuario.prediccion === undefined ?
                                        null
                                        :
                                        !prediccionUsuario.prediccion[partido[0]].ptsTotal ?
                                            <p className='puntos'>0 pts</p>
                                            :
                                            <p className='puntos'>{prediccionUsuario.prediccion[partido[0]].ptsTotal ? prediccionUsuario.prediccion[partido[0]].ptsTotal + " pts" : "0 pts"} </p>

                                }
                            </div>
                        })
                        }
                    </div>

                    :
                    <div className='loaderContain'>
                        <FadeLoader className='loader' color={'#edebeb'} loading={true} size={10} aria-label="Loading Spinner" data-testid="loader" />
                    </div>
            }
        </>
    )
}

export default Prediccion