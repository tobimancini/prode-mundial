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
    const actualizarPuntaje =() =>{
        for (let i = 0; i < puntajesAct.length; i++) {
            const puntajes = puntajesAct[i];
            // console.log(puntajes);
            if (puntajes[idPartido]) {
                puntaje = puntajes[idPartido];
                // console.log("HOLAAA");
            }
        }
        setPuntajePartido(puntaje);
    }

    const [jugado, setJugado] = useState(false);


    const partidoJugado = () =>{
        if (now.getMonth()+1 > fecha.mes || (now.getMonth()+1 == fecha.mes && now.getDate() > fecha.dia) ||
         (now.getMonth()+1 == fecha.mes && now.getDate() == fecha.dia && now.getHours() > fecha.hora) ||
         (now.getMonth()+1 == fecha.mes && now.getDate() == fecha.dia && now.getHours() == fecha.hora && now.getMinutes() >= fecha.minutos)) {
            setJugado(true)
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
            <div className='matchNum'>{`Partido número: ${numPartido}`}</div>
            <div className='matchNum'>{`Fecha: ${fecha.dia}/${fecha.mes}/22 - ${fecha.hora} hs.`}</div>
            <div className='match'>
                <div className='matchTeam'>{local}</div>
                {
                    jugado === false ?
                        <select name={numPartido} className={"selectLocal"}>
                            {
                                possibleGoals.map(goals => {
                                    return <option value={goals} key={`QTY ${goals}`}>{goals}</option>
                                })
                            }
                        </select>
                        :
                        <p>{!resultadoFinal.local?"-":resultadoFinal.local}</p>


                }
                <div className='matchTeam'>vs</div>
                <div className='matchTeam'>{visitante}</div>
                {
                    jugado === false ?
                    <select name={numPartido} className={"selectVisitante"}>
                        {
                            possibleGoals.map(goals => {
                                return <option value={goals} key={`QTY ${goals}`}>{goals}</option>
                            })
                        }
                    </select>
                    :
                    <p>{!resultadoFinal.visitante?"-":resultadoFinal.visitante}</p>
                }
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
                <div>
                    <h4>Puntaje</h4>
                    {
                        resultadoFinal === "" || !prediccionPartido ?
                            <p>-</p>
                            :
                            prediccionPartido.local === "" ?
                                <p>-</p>
                                :

                                <p>{puntajePartido}</p>

                    }
                </div>
            </div>
        </div>
    )
}

export default Partido