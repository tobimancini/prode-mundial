import React, { createContext, useState } from 'react';

export const Prode = createContext();

const ProdeData = ({ children }) => {

    const [database, setDatabase] = useState("");

    const [matchPlayed, setMatchPlayed] = useState(false);

    const [allMatches, setAllMatches] = useState([]);

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

    const [equipoElegido, setEquipoElegido] = useState("");

    const [tipoIdElegido, setTipoIdElegido] = useState("");

    const [sortedPredic, setSortedPredic] = useState([]);

    const [faseElegida, setFaseElegida] = useState("Fase 1")

    const [tooltip, setTooltip] = useState(0);

    const [toolText, setToolText] = useState("");

    const [userHabilitado, setUserHabilitado] = useState(false);

    const equiposMasc = ["Brasil", "Bélgica", "Suecia", "Alemania", "Holanda", "Croacia", "Dinamarca", "Serbia", "Japón", "Francia", "Uruguay", "Portugal", "Estados Unidos", "Nigeria",
        "Inglaterra", "México", "Argentina", "Costa de Marfil", "Camerún", "Italia", "Colombia", "España", "República Checa", "Ecuador", "Boznia", "Gales",
        "Grecia", "Perú", "Suiza", "Irlanda", "Ghana", "Egipto", "Australia", "China", "Escocia", "Sudáfrica", "Polonia", "Rusia", "Ucrania", "Paraguay", "Turquía",
        "Corea del Sur", "Argelia", "Marruecos"];
    const equiposFem = ["Paris Saint-Germain", "Manchester City", "Ajax", "Barcelona", "Manchester United", "Inter", "Bayern Munich", "Chelsea", "Real Madrid", "Olimpique de Marsella",
        "Liverpool", "Juventus", "Borussia Dortmund", "Arsenal", "Porto", "Milan"];

    const [equiposUser, setEquiposUser] = useState("");

    const [donePredictions, setDonePredictions] = useState("");

    const [gender, setGender] = useState("");
    const [jaulero, setJaulero] = useState(false);

    const [loaderOn, setLoaderOn] = useState(false);

    const [posicionesInd, setPosicionesInd] = useState([]);
    const [posicionesGrup, setPosicionesGrup] = useState([]);
    const [miPrediccion, setMiPrediccion] = useState([]);



    return (
        <Prode.Provider value={{
            database, setDatabase, matchPlayed, setMatchPlayed, userLogged, setUserLogged, prediccionActual, setPrediccionActual, resultadosAct, setResultadosAct,
            defaultFase, setDefaultFase, puntajesAct, setPuntajesAct, puntajeTotal, setPuntajeTotal, allPuntajes, setAllPuntajes, now, setNow, pageState, setPageState,
            userInfo, setUserInfo, banderas, setBanderas, modalPredic, setModalPredic, usuarioElegido, setUsuarioElegido, sortedPredic, setSortedPredic, faseElegida, setFaseElegida
            , tooltip, setTooltip, toolText, setToolText, userHabilitado, setUserHabilitado, equiposFem, equiposMasc, equipoElegido, setEquipoElegido, tipoIdElegido, setTipoIdElegido,
            equiposUser, setEquiposUser, allMatches, setAllMatches, donePredictions, setDonePredictions, gender, setGender, jaulero, setJaulero, loaderOn, setLoaderOn,
            setPosicionesInd, setPosicionesGrup, setMiPrediccion, posicionesInd, posicionesGrup, miPrediccion
        }}>
            {children}
        </Prode.Provider>
    )
}

export default ProdeData