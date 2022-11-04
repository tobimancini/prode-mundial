import React, { useContext, useEffect, useState } from 'react'
import { Prode } from '../../Context/prodeData'
import getMatchScore from '../Utils/getMatchScore';
import sortPrediccion from '../Utils/sortPrediccion';
import './styles.css';
import { BsQuestionCircleFill } from 'react-icons/bs';
import FadeLoader from "react-spinners/FadeLoader";

const Prediccion = () => {

    const { prediccionActual, database, banderas, allPuntajes, userLogged, userInfo, sortedPredic, setSortedPredic, allMatches, miPrediccion } = useContext(Prode);

    const [prediccionUsuario, setPrediccionUsuario] = useState([]);
    const [faseSel, setFaseSel] = useState("1");
    const [newPrediction, setNewPrediction] = useState([]);

    const fases = ["1", "2", "3", "Octavos de Final", "Cuartos de Final", "Semifinales", "Tercer y Cuarto Puesto", "Final"];

    const getPartidosFase = () => {
        let prediccionFase = [];
        for (let i = 0; i < sortedPredic.length; i++) {
            const partido = sortedPredic[i];
            for (let i = 0; i < allMatches.length; i++) {
                const match = allMatches[i];
                if (partido[0] === match[0]) {
                    if (match[1].fase === faseSel) {
                        switch (match[1].fase) {
                            case "1":
                                prediccionFase.push(partido)
                                break;
                            case "2":
                                prediccionFase.push(partido)
                                break;
                            case "3":
                                prediccionFase.push(partido)
                                break;
                            default:
                                break;
                        }

                    } else if (match[1].grupo === faseSel) {
                        switch (match[1].grupo) {
                            case "Octavos de Final":
                                prediccionFase.push(partido)
                                break;
                            case "Cuartos de Final":
                                prediccionFase.push(partido)
                                break;
                            case "Semifinales":
                                prediccionFase.push(partido)
                                break;
                            case "Tercer y Cuarto Puesto":
                                prediccionFase.push(partido)
                                break;
                            case "Final":
                                prediccionFase.push(partido)
                                break;
                            default:
                                break;
                        }
                    }
                }
            }
        }
        setNewPrediction(prediccionFase);
    }

    const changeFase = () => {
        const fase = document.getElementById('predFase').value;
        setFaseSel(fase);
    }

    useEffect(() => {
        sortPrediccion(prediccionActual, setSortedPredic, false)
        getMatchScore(allPuntajes, userLogged, setPrediccionUsuario);
    }, [prediccionActual, allPuntajes]);

    useEffect(() => {
        getPartidosFase();
    }, [faseSel, sortedPredic])



    return (
        <>

            {
                miPrediccion.length && allMatches.length ?

                    <div className='prediccionCont'>
                        <h2 className='prediccionTitulo'>MI PREDICCIÓN</h2>
                        <div className='selYBtn'>
                            <select id='predFase' name="fase" className="faseElegida" onChange={() => changeFase()}>
                                {
                                    fases.map(fase => {
                                        return <option key={fase + "Predic"} value={fase}>{fase === "1" || fase === "2" || fase === "3" ? "Fase " + fase : fase}</option>
                                    })
                                }
                            </select>
                            <div className="flecha"></div>
                        </div>
                        <div className='tablaCont'>
                            {allMatches.map(partido => {
                                if (miPrediccion[0][partido[0]] && (faseSel === partido[1].fase || faseSel === partido[1].grupo)) {
                                    return <div className='predPartido' key={partido[1].partido}>

                                        <div className='prediccionMiddle'>
                                            {
                                                banderas[database[partido[0]].local] === undefined ?
                                                    <BsQuestionCircleFill className='unkFlag' /> :
                                                    <img src={process.env.PUBLIC_URL + banderas[database[partido[0]].local]} alt={database[partido[0]].local} />
                                            }

                                            <p className='predicData'> {partido[1].loc} {miPrediccion[0][partido[0]].local} vs {miPrediccion[0][partido[0]].visitante} {partido[1].vis}</p>
                                            {
                                                banderas[database[partido[0]].local] === undefined ?
                                                    <BsQuestionCircleFill className='unkFlag' /> :
                                                    <img src={process.env.PUBLIC_URL + banderas[database[partido[0]].visitante]} alt={database[partido[0]].visitante} />
                                            }

                                            <p className='puntos'>{userInfo[partido[0]] ? userInfo[partido[0]].puntaje+" pts" : ""}</p>
                                        </div>
                                        
                                    </div>
                                }

                            })
                            }
                        </div>

                        <p className="btnFiltro" >TOTAL : {userInfo.puntajeActual} pts</p>
                    </div>

                    :
                    <div className='prediccionCont'>
                        <h3>NO REALIZASTE UNA PREDICCIÓN</h3>
                    </div>
            }
        </>
    )
}

export default Prediccion