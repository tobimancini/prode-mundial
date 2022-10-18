import React, { createContext, useEffect, useState } from 'react';

export const Prode = createContext();

const ProdeData = ({ children }) => {

    const [matchPlayed, setMatchPlayed] = useState(false);    

    const [userLogged, setUserLogged] = useState("");

    const [prediccionActual, setPrediccionActual] = useState({});

    const [resultadosAct, setResultadosAct] = useState([]);

    const [defaultFase, setDefaultFase] = useState([]);

    return (
        <Prode.Provider value={{matchPlayed, setMatchPlayed, userLogged, setUserLogged, prediccionActual, setPrediccionActual, resultadosAct, setResultadosAct, defaultFase, setDefaultFase}}>
            {children}
        </Prode.Provider>
    )
}

export default ProdeData