import React, { useContext, useEffect, useState } from 'react';
import { Prode } from '../../Context/prodeData';
import './styles.css';

const Partido = (props) => {

    const { prediccionActual, resultadosAct, puntajesAct, now, setNow, banderas } = useContext(Prode);
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
    }, [prediccionActual, puntajesAct, prediccionPartido])

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
            <div className='matchNum'>
                <p>{`${fecha.dia}/${fecha.mes}/22`}</p>
                <p>{`${fecha.hora}:00`}</p>
            </div>
            <div className='match'>
                <div className='teamContain'>
                    <img src={process.env.PUBLIC_URL + banderas[local]} alt={local} className="flag" />
                    <div className='matchTeam'>{local}</div>
                </div>
                {
                    jugado === false ?
                        <div name={numPartido} className="localCounter">
                            <div onClick={() => addHandler("L")} className='addLess'>+</div>
                            <output name={numPartido} className="selectLocal" id={`${idPartido}L`}>-</output>
                            <div onClick={() => lessHandler("L")} className='addLess'>-</div>
                        </div>
                        :
                        <p className='resultadoGoles'>{!resultadoFinal.local ? "-" : resultadoFinal.local}</p>


                }
                <div className='matchTeam'>vs</div>
                {
                    jugado === false ?

                        <div name={numPartido} className="localCounter">
                            <div onClick={() => addHandler("V")} className='addLess'>+</div>
                            <output name={numPartido} className="selectVisit" id={`${idPartido}V`}>-</output>
                            <div onClick={() => lessHandler("V")} className='addLess'>-</div>
                        </div>
                        :
                        <p className='resultadoGoles'>{!resultadoFinal.visitante ? "-" : resultadoFinal.visitante}</p>
                }
                <div className='teamContain'>
                    <img src={process.env.PUBLIC_URL + banderas[visitante]} alt={visitante} className="flag" />
                    <div className='matchTeam'>{visitante}</div>
                </div>
            </div>

            {
                !prediccionPartido ?
                    <p>No hiciste una predicción todavía.</p>
                    :
                    prediccionPartido.local != "" ?
                        <div className='prediccionPartido'>
                            <p>Predicción: {local} {prediccionPartido.local} vs {prediccionPartido.visitante} {visitante} </p>
                        </div>
                        :
                        <p className='prediccionPartido'>No hiciste una predicción todavía.</p>
            }

            <div className='puntosCont'>
                {
                    resultadoFinal !== "" && prediccionPartido && puntajePartido !== ""?
                    <p className='puntaje'>{puntajePartido === 1||puntajePartido === 3||puntajePartido === 4||puntajePartido === 8 ? puntajePartido : "-"}</p>
                    :
                    <p className='puntaje'>-</p>
                }
            </div>
        </div>
    )
}

export default Partido