import React, { useContext, useEffect, useState } from 'react'
import { Prode } from '../../Context/prodeData'
import './styles.css';

const Prediccion = () => {

    const { prediccionActual, database, banderas, allPuntajes, userLogged } = useContext(Prode);
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
        prediccionArray.sort((a, b) => (parseInt(a[1].partido) > parseInt(b[1].partido)) ? 1 : ((parseInt(b[1].partido) > parseInt(a[1].partido)) ? -1 : 0));
        setSortedPredic(prediccionArray);
    }


    
    const [prediccionUsuario, setPrediccionUsuario] = useState([]);
    const getMatchScore = () =>{
        let userScores = [];
        for (let i = 0; i < allPuntajes.length; i++) {
            const usuario = allPuntajes[i];
            if (usuario.uid === userLogged) {
                userScores.push(usuario);
            }
        }
        setPrediccionUsuario(userScores[0]);
    }


    useEffect(() => {
        sortPrediccion()
        getMatchScore();
    }, [prediccionActual])



    return (
        <>
            <h2 className='prediccionTitulo' >MI PREDICCIÓN</h2>
            <div className='prediccionCont'>
                <div className='prediccionTitulos'>
                    <div>PARTIDO</div>
                    <div className='prediccionLine'>PREDICCIÓN</div>
                    <div>PUNTOS</div>
                </div>
                {
                    sortedPredic.length !== 0 ?

                        sortedPredic.map(partido => {

                            return <div className='predPartido' key={partido[1].partido}>
                                <p onClick={()=>console.log(prediccionUsuario)}>{partido[1].partido}</p>
                                <div className='prediccionMiddle'>
                                    <img src={process.env.PUBLIC_URL + banderas[database[partido[0]].local]} alt={database[partido[0]].local} />
                                    <p className='predicData'> {database[partido[0]].loc} {partido[1].local} vs {partido[1].visitante} {database[partido[0]].vis}</p>
                                    <img src={process.env.PUBLIC_URL + banderas[database[partido[0]].visitante]} alt={database[partido[0]].visitante} />
                                </div>
                                <p>{!prediccionUsuario.prediccion[partido[0]].ptsTotal ? "-" : prediccionUsuario.prediccion[partido[0]].ptsTotal}</p>
                            </div>
                        })

                        :

                        null
                }
            </div>
        </>
    )
}

export default Prediccion