import React, { createContext, useState } from 'react';

export const Prode = createContext();

const ProdeData = ({ children }) => {

    const [database, setDatabase] = useState("");

    const [matchPlayed, setMatchPlayed] = useState(false);    

    const [userLogged, setUserLogged] = useState("");

    const [prediccionActual, setPrediccionActual] = useState({});

    const [resultadosAct, setResultadosAct] = useState([]);

    const [defaultFase, setDefaultFase] = useState([]);

    const [puntajesAct, setPuntajesAct] = useState([]);
    const [puntajeTotal, setPuntajeTotal] = useState([]);

    const [allPuntajes, setAllPuntajes] = useState([]);
    
    const [now, setNow] = useState(new Date());

    const [pageState, setPageState] = useState("partidos");

    const [userInfo, setUserInfo] = useState({});

    const [banderas, setBanderas] = useState({});

    return (
        <Prode.Provider value={{database, setDatabase, matchPlayed, setMatchPlayed, userLogged, setUserLogged, prediccionActual, setPrediccionActual, resultadosAct, setResultadosAct, 
        defaultFase, setDefaultFase, puntajesAct, setPuntajesAct, puntajeTotal, setPuntajeTotal, allPuntajes, setAllPuntajes, now, setNow, pageState, setPageState, 
        userInfo, setUserInfo, banderas, setBanderas}}>
            {children}
        </Prode.Provider>
    )
}

export default ProdeData