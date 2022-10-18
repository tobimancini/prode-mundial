import React, { useContext, useEffect, useState } from 'react'
import { Prode } from '../../Context/prodeData';
import Partido from '../Partido'

const Group = (props) => {

    const group = props.grupo;
    const partidosPorGrupo = props.partidos;
    const fases = props.fases;

    const { defaultFase, setDefaultFase } = useContext(Prode);


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


    const groupName = () => {
        if (group === "A" || group === "B" || group === "C" || group === "D" || group === "E" || group === "F" || group === "G" || group === "H") {
            return <h2>{`Grupo ${group}`}</h2>
        } else {
            return <h2>{group}</h2>
        }
    }


    
    useEffect(() => {
      createGroup();
    }, [group])
    



    return (
        <div className='zonaContainer'>
            {groupName()}
            {/* {
                
                checkFase()
                
            }
            {
                defaultFase.length === 0 ?
                    null
                    :
                    <>
                    <h3>{group}</h3>
                    {defaultFase.map(match => {
                        return <Partido key={match[0]} partido={match[1]} idPartido={match[0]} />
                    })}
                    </>

            } */}
            {
                defaultFase.map(match => {
                    return <Partido key={match[0]} partido={match[1]} idPartido={match[0]} />
                })
            }
        </div>
    )
}

export default Group