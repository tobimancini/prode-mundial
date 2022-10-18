import React, { useContext, useEffect, useState } from 'react';
import { Prode } from '../../Context/prodeData';
import './styles.css';

const Partido = (props) => {

    const { prediccionActual, resultadosAct } = useContext(Prode);

    const possibleGoals = ["", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

    const partido = props.partido;
    const local = partido.local;
    const visitante = partido.visitante;
    const numPartido = partido.partido;

    let idPartido = props.idPartido;

    const prediccionPartido = prediccionActual[idPartido];

    let resultadoFinal = "";

    const resultadoPartido = () => {
        for (let i = 0; i < resultadosAct.length; i++) {
            const resultado = resultadosAct[i];

            if (resultado[0] === idPartido) {
                resultadoFinal = resultado[1];
                // setResFinal(resultado[1]);
                // console.log(resultadoFinal);
            }

        }
    }

    // useEffect(() => {
    //   resultadoPartido()
    // }, [])


    return (
        <div className='matchContainer'>
            {
                resultadosAct.length !== 0 ?
                    resultadoPartido() :
                    null
            }
            <div className='matchNum'>{`Partido número: ${numPartido}`}</div>
            <div className='match'>
                <div className='matchTeam'>{local}</div>
                {
                    resultadoFinal === "" ?
                        <select name={numPartido} className={"selectLocal"}>
                            {
                                possibleGoals.map(goals => {
                                    return <option value={goals} key={`QTY ${goals}`}>{goals}</option>
                                })
                            }
                        </select>
                        :
                        <p>{resultadoFinal.local}</p>


                }
                <div className='matchTeam'>vs</div>
                <div className='matchTeam'>{visitante}</div>
                {
                    resultadoFinal === "" ?
                        <select name={numPartido} className={"selectVisit"}>
                            {
                                possibleGoals.map(goals => {
                                    return <option value={goals} key={`QTY ${goals}`}>{goals}</option>
                                })
                            }
                        </select>
                        :
                        <p>{resultadoFinal.visitante}</p>
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
                        resultadoFinal === "" || prediccionPartido == false ?
                            <p>-</p>
                            :
                            prediccionPartido.local === "" ?
                                <p>-</p>
                                :

                                <p>5</p>

                    }
                </div>
            </div>
        </div>
    )
}

export default Partido