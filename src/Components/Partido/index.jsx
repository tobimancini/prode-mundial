import React, { useContext, useEffect, useState } from 'react';
import { Prode } from '../../Context/prodeData';
import './styles.css';

const Partido = (props) => {

    const { prediccionActual, resultadosAct, puntajesAct, now, setNow } = useContext(Prode);

    const possibleGoals = ["", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];


    const partido = props.partido;
    const local = partido.local;
    const visitante = partido.visitante;
    const numPartido = partido.partido;
    const fecha = partido.fecha;

    let idPartido = props.idPartido;

    const prediccionPartido = prediccionActual[idPartido];

    let resultadoFinal = "";

    const resultadoPartido = () => {
        for (let i = 0; i < resultadosAct.length; i++) {
            const resultado = resultadosAct[i];

            if (resultado[0] === idPartido) {
                resultadoFinal = resultado[1];
            }

        }
    }

    const [puntajePartido, setPuntajePartido] = useState(0);
    let puntaje;
    const actualizarPuntaje = () => {
        for (let i = 0; i < puntajesAct.length; i++) {
            const puntajes = puntajesAct[i];
            if (puntajes[idPartido]) {
                puntaje = puntajes[idPartido];
            }
        }
        setPuntajePartido(puntaje);
    }

    const [jugado, setJugado] = useState(false);


    const partidoJugado = () => {
        if (now.getMonth() + 1 > fecha.mes || (now.getMonth() + 1 == fecha.mes && now.getDate() > fecha.dia) ||
            (now.getMonth() + 1 == fecha.mes && now.getDate() == fecha.dia && now.getHours() > fecha.hora) ||
            (now.getMonth() + 1 == fecha.mes && now.getDate() == fecha.dia && now.getHours() == fecha.hora && now.getMinutes() >= fecha.minutos)) {
            setJugado(true)
        }
    }



    const addHandler = (lv) => {
        let gol = document.getElementById(`${idPartido}${lv}`);
        let golValue = gol.value;
        if (golValue === "-") {
            gol.value = 0;
        } else if (parseInt(golValue) < 20) {
            gol.value = parseInt(golValue) + 1
        }
    }

    const lessHandler = (lv) => {
        let gol = document.getElementById(`${idPartido}${lv}`);
        let golValue = gol.value;
        if (golValue === "-") {
            gol.value = 0;
        } else if (parseInt(golValue) > 0) {
            gol.value = parseInt(golValue) - 1
        }
    }

    useEffect(() => {
        actualizarPuntaje();
    }, [puntajesAct])

    useEffect(() => {
        partidoJugado();
    }, [now])



    return (
        <div className='matchContainer'>
            {
                resultadosAct.length !== 0 ?
                    resultadoPartido() :
                    null
            }
            <div className='match'>
                <div className='teamContain'>
                    <img src={process.env.PUBLIC_URL + "/images/spain.png"} alt={local} className="flag" />
                    <div className='matchTeam'>{local}</div>
                </div>
                {
                    jugado === false ?
                        // <select name={numPartido} className={"selectLocal"}>
                        //     {
                        //         possibleGoals.map(goals => {
                        //             return <option value={goals} key={`QTY ${goals}`}>{goals}</option>
                        //         })
                        //     }
                        // </select>
                        <div name={numPartido} className="localCounter">
                            <div onClick={() => addHandler("L")} className='addLess'>+</div>
                            <output name={numPartido} className="selectLocal" id={`${idPartido}L`}>-</output>
                            <div onClick={() => lessHandler("L")} className='addLess'>-</div>
                        </div>
                        :
                        <p>{!resultadoFinal.local ? "-" : resultadoFinal.local}</p>


                }
                <div className='matchTeam'>vs</div>
                {
                    jugado === false ?
                        // <select name={numPartido} className={"selectVisitante"}>
                        //     {
                        //         possibleGoals.map(goals => {
                        //             return <option value={goals} key={`QTY ${goals}`}>{goals}</option>
                        //         })
                        //     }
                        // </select>
                        <div name={numPartido} className="localCounter">
                            <div onClick={() => addHandler("V")} className='addLess'>+</div>
                            <output name={numPartido} className="selectVisit" id={`${idPartido}V`}>-</output>
                            <div onClick={() => lessHandler("V")} className='addLess'>-</div>
                        </div>
                        :
                        <p>{!resultadoFinal.visitante ? "-" : resultadoFinal.visitante}</p>
                }
                <div className='teamContain'>
                    <img src={process.env.PUBLIC_URL + "/images/spain.png"} alt={visitante} className="flag" />
                    <div className='matchTeam'>{visitante}</div>
                </div>
            </div>
            <div className='matchNum'>
                <p>{`${fecha.dia}/${fecha.mes}/22`}</p>
                <p>{`${fecha.hora}:00`}</p>
            </div>
            <div className='puntosCont'>
                <p>Puntos</p>
                {
                    resultadoFinal === "" || !prediccionPartido ?
                        <p className='puntaje'>-</p>
                        :
                        prediccionPartido.local === "" ?
                            <p className='puntaje'>-</p>
                            :

                            <p className='puntaje'>{puntajePartido}</p>

                }
            </div>
            <div>
                <h4>Prediccion</h4>
                {
                    !prediccionPartido ?
                        <p>-</p>
                        :
                        prediccionPartido.local != "" ?
                            <div>
                                <p>{local}:{prediccionPartido.local}</p>
                                <p>{visitante}:{prediccionPartido.visitante}</p>
                            </div>
                            :
                            <p>-</p>
                }
            </div>
        </div>
    )
}

export default Partido