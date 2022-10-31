// import http from 'k6/http';
import React, { useContext, useEffect, useState } from 'react'
import { Prode } from '../../Context/prodeData';
import Partido from '../Partido'
import './styles.css'

const Group = (props) => {

    const group = props.grupo;
    const partidosPorGrupo = props.partidos;
    const fases = props.fases;

    const { defaultFase, setDefaultFase, userInfo, donePredictions, setDonePredictions, now, setFaseElegida } = useContext(Prode);


    const createGroup = () => {
        let variableDef;
        for (let i = 0; i < fases.length; i++) {
            const fase = fases[i];
            if (fase == group) {
                variableDef = partidosPorGrupo[i];
            }
        }
        setDefaultFase(variableDef);
    }

    const prediccionesHechas = () => {
        if (defaultFase.length && userInfo.nombre !== undefined) {
            let cantidad = 0;
            for (let i = 0; i < defaultFase.length; i++) {
                const partido = defaultFase[i];
                if (userInfo.prediccion[partido[0]].local !== "") {
                    cantidad = cantidad + 1;
                }
            }
            setDonePredictions(`Predicciones realizadas en ${group.toUpperCase()} : ${cantidad}/${defaultFase.length}`)

        }
    }


    useEffect(() => {
        createGroup();
        prediccionesHechas();
    }, [group, defaultFase, userInfo])




    return (
        <div className='tablaCont'>

            {
                defaultFase.map(match => {
                    return <Partido key={match[0]} partido={match[1]} idPartido={match[0]} />
                })
            }
        </div>
    )
}

export default Group