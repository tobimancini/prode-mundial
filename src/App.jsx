import { collection, getDocs } from "firebase/firestore";
import { useContext, useEffect, useState } from 'react';
import './App.css';
import Group from './Components/Group';
import Login from "./Components/Login";
import { auth, db } from "./Firebase/config";
import setPrediction from "./Components/Utils/setPrediction";
import { Prode } from './Context/prodeData';
import getPredictionDB from "./Components/Utils/getPredictionDB";
import getAllPuntajes from "./Components/Utils/getAllPuntajes";
import TablaPosiciones from "./Components/TablaPosiciones";
import Navbar from "./Components/Navbar";
import Prediccion from "./Components/Prediccion";
import { onAuthStateChanged } from "firebase/auth";
import setPuntos from "./Components/Utils/setPuntos";
import ModalPrediccion from "./Components/ModalPrediccion";
import FadeLoader from "react-spinners/FadeLoader";
import Tooltip from "./Components/Tooltip";
import Admin from "./Components/Admin";
import Home from "./Components/Home";
import getInfo from "./Components/Utils/getInfo";
import { ImTrophy } from "react-icons/im";
import { BiFootball } from "react-icons/bi";
import { IoFootball, IoMdFootball } from "react-icons/io";
import setCampeonElegido from "./Components/Utils/setCampeonElegido";
import setGoleadorElegido from "./Components/Utils/setGoleadorElegido";
import Reglas from "./Components/Reglas";



function App() {

  const { database, setDatabase, resultadosAct, setResultadosAct, userLogged, setPrediccionActual, prediccionActual, allPuntajes, faseElegida, setFaseElegida, setToolText,
    setAllPuntajes, setNow, pageState, setUserLogged, setPuntajesAct, setPuntajeTotal, userInfo, setUserInfo, banderas, setBanderas, modalPredic, tooltip, setTooltip,
    allMatches, setAllMatches, donePredictions, loaderOn, setLoaderOn, setPosicionesInd, setPosicionesGrup, setMiPrediccion, posicionesGrup, posicionesInd, miPrediccion,
    setCampeon, setGoleador, campeon, goleador, now, setResultados, setJauleño, loggedOut, setLoggedOut } = useContext(Prode);

  const [userID, setUserID] = useState("");


  const [faseUno, setFaseUno] = useState([]);
  const [faseDos, setFaseDos] = useState([]);
  const [faseTres, setFaseTres] = useState([]);
  const [octFinal, setOctFinal] = useState([]);
  const [cuarFinal, setCuarFinal] = useState([]);
  const [semiFinal, setSemiFinal] = useState([]);
  const [terycuarFinal, setTerycuarFinal] = useState([]);
  const [finalisima, setFinalisima] = useState([]);


  const getData = async () => {
    const response = await fetch(process.env.PUBLIC_URL + "/fixture/partidos.json");
    const jsonData = await response.json();

    const response2 = await fetch(process.env.PUBLIC_URL + "/fixture/banderas.json");
    const jsonData2 = await response2.json();

    setDatabase(jsonData);
    setBanderas(jsonData2);

    let partidos = Object.entries(jsonData);

    let fase1 = [];
    let fase2 = [];
    let fase3 = [];
    let octavos = [];
    let cuartos = [];
    let semis = [];
    let tercerycuarto = [];
    let final = [];
    let matches = [];

    for (let i = 0; i < partidos.length; i++) {
      const partido = partidos[i];

      matches.push(partido);

      switch (partido[1].fase) {
        case "1":
          fase1.push(partido);
          break;
        case "2":
          fase2.push(partido);
          break;
        case "3":
          fase3.push(partido);
          break;

        default:

          switch (partido[1].grupo) {
            case "Octavos de Final":
              octavos.push(partido);
              break;
            case "Cuartos de Final":
              cuartos.push(partido);
              break;
            case "Semifinales":
              semis.push(partido);
              break;
            case "Tercer y Cuarto Puesto":
              tercerycuarto.push(partido);
              break;
            case "Final":
              final.push(partido);
              break;
          }

      }

      setFaseUno(fase1);
      setFaseDos(fase2);
      setFaseTres(fase3);
      setOctFinal(octavos);
      setCuarFinal(cuartos);
      setSemiFinal(semis);
      setTerycuarFinal(tercerycuarto);
      setFinalisima(final);
      setAllMatches(matches);


    };

  }

  useEffect(() => {
    getData();
  }, []);


  const predict = (partidosState) => {

    if (!userInfo.nombre) {
      setLoggedOut(true)
      setToolText("Iniciá sesion para poder jugar.")
      setTooltip(tooltip + 1)
    } else {
      if (partidosState === "partidos") {
        getPredictionDB(userInfo, userLogged, setPrediccionActual, prediccionActual, true, setPrediction, allMatches, setUserInfo, setToolText, setTooltip, tooltip, setPuntajesAct, setPuntajeTotal,
          setAllPuntajes, resultadosAct, setResultadosAct, setMiPrediccion)
      } else if (partidosState === "campeon") {
        setCampeonElegido(userInfo, chosenEquipo, setToolText, setTooltip, tooltip, setCampeon)
      } else {
        setGoleadorElegido(userInfo, chosenJugador, setToolText, setTooltip, tooltip, setGoleador)
      }

    }
  }

  const fases = ["Fase 1", "Fase 2", "Fase 3", "Octavos de final", "Cuartos de final", "Semifinales", "Tercer y cuarto puesto", "Final"];

  const filtrarFase = () => {
    const fase = document.getElementById('faseElegida').value;
    setFaseElegida(fase);
  }

  const partidosPorFase = [faseUno, faseDos, faseTres, octFinal, cuarFinal, semiFinal, terycuarFinal, finalisima];

  useEffect(() => {
    setNow(new Date());
    setInterval(() => {
      setNow(new Date());
    }, 5000);
  }, []);


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setToolText('INICIASTE SESIÓN COMO ' + user.email);
        setTooltip(tooltip + 1)
        setTimeout(() => {
          setTooltip(tooltip + 2)
        }, 2500);
        getInfo(user.uid, setPosicionesInd, setPosicionesGrup, setMiPrediccion, setUserInfo, setCampeon, setGoleador, setResultados, setJauleño)

      } else {
        setTooltip(tooltip + 1);

        setToolText("INICIÁ SESIÓN ANTES DE JUGAR.")
      }
    })
  }, []);

  const [partidosState, setPartidosState] = useState("partidos");
  const [chosenEquipo, setChosenEquipo] = useState("");
  const [chosenJugador, setChosenJugador] = useState("");

  const equipos = ["Qatar", "Ecuador", "Senegal", "Holanda", "Inglaterra", "Irán", "Estados Unidos", "Gales", "Argentina", "Arabia Saudita", "México", "Polonia", "Francia",
    "Australia", "Dinamarca", "Túnez", "España", "Costa Rica", "Alemania", "Japón", "Bélgica", "Canadá", "Marruecos", "Croacia", "Brasil", "Serbia", "Suiza",
    "Camerún", "Portugal", "Ghana", "Uruguay", "Corea del Sur"];
  equipos.sort((a, b) => a < b ? -1 : b < a ? 1 : 0);
  const jugadores = ["Lionel Messi", "Cristiano Ronaldo", "Neymar", "Kylian Mbappe", "Harry Kane", "Karim Benzema", "Robert Lewandowski", "Julián Álvarez", "Romelu Lukaku", "Luis Suarez",
    "Gabriel Jesús", "Richarlison", "Vinicius Júnior", "Ángel Di María", "Paulo Dybala", "Bruno Fernandes", "Memphis Depay", "Pedri", "Morata", "Hakimi",
    "Marcus Rashford", "Heung-Min Son", "Al Dawsari", "Kai Havertz", "Thomas Muller", "Joao Félix", "Diogo Jota", "Hirving Lozano", "Timo Werner",
    "Serge Gnabry", "Sané", "Sadio Mané", "Christian Pulisic", "Christian Eriksen", "Lautaro Martinez", "Gareth Bale", "Luka Modric", "Coutinho", "Dusan Tadic"];

  useEffect(() => {
    setChosenEquipo("");
    setChosenJugador("");
  }, [partidosState])


  const [campeonesOff, setCampeonesOff] = useState(false);

  const fechaCampeones = {
    mes: 11,
    dia: 20,
    hora: 13,
    minutos: 0
  }

  const fechaLimiteCampeones = () => {
    if (now.getMonth() + 1 > fechaCampeones.mes || (now.getMonth() + 1 == fechaCampeones.mes && now.getDate() > fechaCampeones.dia) ||
      (now.getMonth() + 1 == fechaCampeones.mes && now.getDate() == fechaCampeones.dia && now.getHours() > fechaCampeones.hora) ||
      (now.getMonth() + 1 == fechaCampeones.mes && now.getDate() == fechaCampeones.dia && now.getHours() == fechaCampeones.hora && now.getMinutes() >= fechaCampeones.minutos)) {
      setCampeonesOff(true)
    }
  }
  useEffect(() => {
    fechaLimiteCampeones();
  }, [now]);

  return (
    <div className="App" >
      <Navbar />
      {
        database === "" || banderas === {} ?
          <div className="loaderContain">
            <FadeLoader className='loader' color={'#edebeb'} loading={true} size={5} aria-label="Loading Spinner" data-testid="loader" />
          </div>

          :

          pageState === "inicio" ?
            <Home />
            :

            pageState === "perfil" && userInfo !== {} ?
              <Login userID={setUserID} />
              :
              pageState === "partidos" && userInfo !== {} ?
                <>
                  <h2 className="partidosTitulo">HAcé TU PREDICCIÓN</h2>
                  <p className="notaAdj">*Tenés hasta el 20/11 para predecir al campeón y al goleador.</p>
                  <div className="tablaOpciones partidos">
                    <h3 onClick={() => setPartidosState("partidos")} className={partidosState === "partidos" ? "active" : null}>Partidos</h3>
                    <h3 onClick={() => setPartidosState("campeon")} className={partidosState === "campeon" ? "active" : null}>Campeón</h3>
                    <h3 onClick={() => setPartidosState("goleador")} className={partidosState === "goleador" ? "active" : null}>goleador</h3>
                  </div>

                  {
                    partidosState === "partidos" ?
                      <>
                        <div className="selYBtn">
                          <select name="fase" id="faseElegida" onChange={() => filtrarFase()}>
                            {
                              fases.map(fase => {
                                return <option key={fase} value={fase}>{fase}</option>
                              })
                            }
                          </select>
                          <div className="flecha"></div>
                        </div>
                        {
                          database.partido1 != undefined ?
                            <Group grupo={faseElegida} partidos={partidosPorFase} fases={fases} />
                            :
                            null
                        }

                        <div className="guardarCambios" onClick={() => predict(partidosState)}>
                          <p>Guardar predicción</p>
                          <div>
                            <span id="saveBtnSpan"></span>
                          </div>
                        </div>
                      </>
                      :
                      partidosState === "campeon" ?

                        campeonesOff === false ?
                          <>
                            <ul className="tablaCont">
                              {
                                equipos.map(equipo => {
                                  return <li key={equipo} className={campeon === equipo ? "tablaUser partidos elegido" : "tablaUser partidos"} onClick={() => setChosenEquipo(equipo)}>
                                    <img src={process.env.PUBLIC_URL + banderas[equipo]} alt={equipo} className="chosenBandera" />
                                    <p className="nombre">{equipo}</p>
                                    <div className="selectEquipo">
                                      {
                                        chosenEquipo === equipo ?
                                          <ImTrophy className="teamChosen" />
                                          :
                                          <ImTrophy className="teamChosen black" />
                                      }
                                    </div>
                                  </li>
                                })
                              }
                            </ul>
                            <div className="guardarCambios" onClick={() => predict(partidosState)}>
                              <p>Guardar predicción</p>
                              <div>
                                <span id="saveBtnSpan"></span>
                              </div>
                            </div>
                          </>
                          :
                          userInfo.nombre ?
                            <div className="matchContainer gold">
                              <p style={{ "fontSize": "12px" }}>Campeón elegido:</p>
                              <div className="campeonElegido">
                                {
                                  userInfo.campeon === "" ?
                                    <p className="elegido">No elegiste un campeón</p> :
                                    <>
                                      <p className="elegido">{userInfo.campeon.toUpperCase()}</p>
                                      <img src={process.env.PUBLIC_URL + banderas[userInfo.campeon]} alt={userInfo.campeon} />
                                    </>
                                }
                              </div>
                            </div>
                            :
                            null


                        :
                        partidosState === "goleador" && userInfo !== {} ?
                          campeonesOff === false ?
                            <>
                              <ul className="tablaCont">
                                {
                                  jugadores.map(jugador => {
                                    return <li key={jugador} className={goleador === jugador ? "tablaUser partidos elegido" : "tablaUser partidos"} onClick={() => setChosenJugador(jugador)}>
                                      <p className="nombre">{jugador}</p>
                                      <div className="selectEquipo">
                                        {
                                          chosenJugador === jugador ?
                                            <IoMdFootball className="teamChosen" />
                                            :
                                            <IoMdFootball className="teamChosen black" />
                                        }
                                      </div>
                                    </li>
                                  })
                                }
                              </ul>
                              <div className="guardarCambios" onClick={() => predict(partidosState)}>
                                <p>Guardar predicción</p>
                                <div>
                                  <span id="saveBtnSpan"></span>
                                </div>
                              </div>
                            </>
                            :
                            userInfo.nombre ?

                              <div className="matchContainer gold">
                                <p style={{ "fontSize": "12px" }}>Goleador elegido:</p>
                                <div className="campeonElegido">
                                  {
                                    userInfo.goleador === "" ?
                                      <p className="elegido">No elegiste un goleador</p> :
                                      <>
                                        <p className="elegido">{userInfo.goleador.toUpperCase()}</p>
                                        <IoMdFootball className="teamChosen" style={{ "fontSize": "35px" }} />
                                      </>
                                  }
                                </div>
                              </div>
                              :
                              null
                          :
                          null
                  }
                </>
                :
                pageState === "clasificacion" && userInfo !== {} ?
                  <>
                    <TablaPosiciones />
                  </>
                  :
                  pageState === "prediccion" && userInfo !== {} ?
                    <Prediccion />
                    :
                    pageState === "admin" && userInfo !== {} ?
                      <Admin />
                      :
                      pageState === "reglas" ?
                        <Reglas />
                        :

                        <div className="loaderContain">
                          <FadeLoader className='loader' color={'#edebeb'} loading={true} size={5} aria-label="Loading Spinner" data-testid="loader" />
                        </div>

      }

      <ModalPrediccion />

      <Tooltip />

    </div >
  );
}

export default App;
