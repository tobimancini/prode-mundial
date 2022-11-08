import React, { useContext, useEffect, useState } from 'react';
import { Prode } from '../../Context/prodeData';
import './styles.css';
import { BsQuestionCircleFill } from 'react-icons/bs';



const Partido = (props) => {

    const { prediccionActual, resultadosAct, puntajesAct, now, setNow, banderas, miPrediccion, userInfo, resultados } = useContext(Prode);
    const partido = props.partido;
    const local = partido.local;
    const loc = partido.loc;
    const vis = partido.vis;
    const visitante = partido.visitante;
    const numPartido = partido.partido;
    const fecha = partido.fecha;

    let idPartido = props.idPartido;

    const [prediccionPartido, setPrediccionPartido] = useState();

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
    }, [puntajesAct, prediccionActual, resultadosAct])

    useEffect(() => {
        partidoJugado();
    }, [now]);

    const [resultadoMatch, setResultadoMatch] = useState("");

    const findMatch = () =>{
        if (resultados.length) {
            for (let i = 0; i < resultados.length; i++) {
                const partido = resultados[i][0];
                if (partido[0] === "partido"+numPartido) {
                    setResultadoMatch(partido[1])
                }
            }
        }
    }

    useEffect(() => {
      findMatch()
    }, [resultados])
    


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
                    {
                        banderas[local] === undefined ?
                            <BsQuestionCircleFill className='flag' />
                            :
                            <img src={process.env.PUBLIC_URL + banderas[local]} alt={local} className="flag" />
                    }
                    <div className='matchTeam'>{loc}</div>
                </div>
                {
                    jugado === false ?
                        <div name={numPartido} className="localCounter">
                            <div onClick={() => addHandler("L")} className='addLess'>+</div>
                            <output name={numPartido} className="selectLocal" id={`${idPartido}L`}>-</output>
                            <div onClick={() => lessHandler("L")} className='addLess'>-</div>
                        </div>
                        :
                        resultadoMatch !== "" ?
                            <p className='resultadoGoles'>{!resultadoMatch.local ? "-" : resultadoMatch.local}</p>
                            :
                            null


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
                        resultadoMatch !== "" ?
                            <p className='resultadoGoles'>{!resultadoMatch.visitante ? "-" : resultadoMatch.visitante}</p>
                            :
                            null
                }
                <div className='teamContain'>
                    {
                        banderas[local] === undefined ?
                            <BsQuestionCircleFill className='flag' />
                            :
                            <img src={process.env.PUBLIC_URL + banderas[visitante]} alt={visitante} className="flag" />
                    }
                    <div className='matchTeam'>{vis}</div>
                </div>
            </div>
            <div className="partidoBottom">
                {
                    miPrediccion[0] ?
                        miPrediccion[0]["partido" + numPartido] ?

                            <p className='prediccionPartido'>Predicción: {local} {miPrediccion[0]["partido" + numPartido].local} vs {miPrediccion[0]["partido" + numPartido].visitante} {visitante}</p>
                            :
                            <p className='prediccionPartido'>No hiciste una predicción todavía.</p>
                        :
                        <p className='prediccionPartido'>No hiciste una predicción todavía.</p>
                }

                {
                    userInfo["partido" + numPartido] ?
                        <p className='puntaje'>{userInfo["partido" + numPartido].puntaje} pts</p>
                        :
                        <p className='puntaje'></p>
                }


            </div>

        </div>
    )
}

export default Partido