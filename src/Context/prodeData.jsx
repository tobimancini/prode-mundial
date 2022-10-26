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

    const [modalPredic, setModalPredic] = useState(0);

    const [usuarioElegido, setUsuarioElegido] = useState("");

    const [sortedPredic, setSortedPredic] = useState([]);

    const [faseElegida, setFaseElegida] = useState("Fase 1")

    const [tooltip, setTooltip] = useState(0);

    const [toolText, setToolText] = useState("");

    const [userHabilitado, setUserHabilitado] = useState(false)

    return (
        <Prode.Provider value={{database, setDatabase, matchPlayed, setMatchPlayed, userLogged, setUserLogged, prediccionActual, setPrediccionActual, resultadosAct, setResultadosAct, 
        defaultFase, setDefaultFase, puntajesAct, setPuntajesAct, puntajeTotal, setPuntajeTotal, allPuntajes, setAllPuntajes, now, setNow, pageState, setPageState, 
        userInfo, setUserInfo, banderas, setBanderas, modalPredic, setModalPredic, usuarioElegido, setUsuarioElegido, sortedPredic, setSortedPredic, faseElegida, setFaseElegida
        , tooltip, setTooltip, toolText, setToolText, userHabilitado, setUserHabilitado}}>
            {children}
        </Prode.Provider>
    )
}

export default ProdeData