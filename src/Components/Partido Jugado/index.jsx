import React from 'react';
import './styles.css';

const PartidoJugado = (props) => {

    const possibleGoals = ["",0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

    const partido = props.partido;
    const local = partido.local;
    const visitante = partido.visitante;
    const numPartido = partido.partido;


    return (
        <div className='matchContainer'>
            <div className='matchNum'>{`Partido número: ${numPartido}`}</div>
            <div className='match'>
                <div className='matchTeam'>{local}</div>
                <select name={numPartido} className={"selectLocal"}>
                    {
                        possibleGoals.map(goals => {
                            return <option value={goals} key={`QTY ${goals}`}>{goals}</option>
                        })
                    }
                </select>
                <div className='matchTeam'>vs</div>
                <div className='matchTeam'>{visitante}</div>
                <select name={numPartido} className={"selectVisit"}>
                    {
                        possibleGoals.map(goals => {
                            return <option value={goals} key={`QTY ${goals}`}>{goals}</option>
                        })
                    }
                </select>
            </div>
        </div>
    )
}

export default PartidoJugado