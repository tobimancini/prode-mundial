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


function App() {

  const { database, setDatabase, resultadosAct, setResultadosAct, userLogged, setPrediccionActual, prediccionActual, allPuntajes, faseElegida, setFaseElegida, setToolText,
    setAllPuntajes, setNow, pageState, setUserLogged, setPuntajesAct, setPuntajeTotal, userInfo, setUserInfo, banderas, setBanderas, modalPredic, tooltip, setTooltip } = useContext(Prode);

  const [userID, setUserID] = useState("");


  const [faseUno, setFaseUno] = useState([]);
  const [faseDos, setFaseDos] = useState([]);
  const [faseTres, setFaseTres] = useState([]);
  const [octFinal, setOctFinal] = useState([]);
  const [cuarFinal, setCuarFinal] = useState([]);
  const [semiFinal, setSemiFinal] = useState([]);
  const [terycuarFinal, setTerycuarFinal] = useState([]);
  const [finalisima, setFinalisima] = useState([]);

  const [allMatches, setAllMatches] = useState([]);

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

  const obtenerResultados = async () => {
    let resultados;

    const querySnapshot = await getDocs(collection(db, "Resultados"));
    querySnapshot.forEach((doc) => {
      resultados = doc.data();
    });

    let resArray = Object.entries(resultados)
    setResultadosAct(resArray);
  }

  useEffect(() => {
    obtenerResultados();
  }, [prediccionActual])

  const predict = () => {
    getPredictionDB(userLogged, setPrediccionActual, prediccionActual, true, setPrediction, allMatches, "");
    setTimeout(() => {
      setPuntos(userLogged, setPuntajesAct, setPuntajeTotal, setAllPuntajes);  
    }, 500);

    let guardarBtn = document.getElementById('saveBtnSpan');

    guardarBtn.classList.remove('inactive');
    guardarBtn.classList.add('active');

    setTimeout(() => {
      guardarBtn.classList.add('inactive');
      guardarBtn.classList.remove('active');
    }, 1800);
    
    if (userLogged !== "") {
      setToolText("Se guardó tu predicción.")
      setTooltip(tooltip+1)
      setTimeout(() => {
        setTooltip(tooltip+2)
      }, 2500);
    }else{
      setToolText("Iniciá sesion para poder jugar.")
      setTooltip(tooltip+1)
      setTimeout(() => {
        setTooltip(tooltip+2)
      }, 2500);
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
    }, 30000);
  }, []);


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserLogged(user.uid);
        setUserID(user.uid);
        getPredictionDB(user.uid, setPrediccionActual, prediccionActual, false, "", "", setUserInfo)
        setTooltip(tooltip+1);

        setTimeout(() => {
          setTooltip(tooltip+2)
        }, 2500);

        setTimeout(() => {
          setPuntos(user.uid, setPuntajesAct, setPuntajeTotal, setAllPuntajes);
          // setTimeout(() => {
          //   getAllPuntajes(setAllPuntajes);
          // }, 500);
        }, 500);

        setToolText("Iniciaste sesión como "+user.email)

      } else {
        setToolText("Necesitás iniciar sesión para poder jugar.")
      }
    })
  }, []);


  return (
    <div className="App" >
      <Navbar />
      {
        database === "" || banderas === {} ?
          <div className="loaderContain">
            <FadeLoader className='loader' color={'#edebeb'} loading={true} size={5} aria-label="Loading Spinner" data-testid="loader" />
          </div>

          :

          pageState === "perfil" ?
            <Login userID={setUserID} />
            :
            pageState === "partidos" ?
              <>
                <h2 className="partidosTitulo">PARTIDOS</h2>
                <div className="selYBtn">
                  <select name="fase" id="faseElegida" onChange={() => filtrarFase()}>
                    {
                      fases.map(fase => {
                        return <option key={fase} value={fase}>{fase}</option>
                      })
                    }
                  </select>

                </div>
                {
                  database.partido1 != undefined ?
                    <Group grupo={faseElegida} partidos={partidosPorFase} fases={fases} />
                    :
                    null
                }

                <div className="guardarCambios" onClick={() => predict()}>
                  <p>GUARDAR PREDICCIÓN</p>
                  <div>
                    <span id="saveBtnSpan"></span>
                  </div>
                </div>
              </>
              :
              pageState === "clasificacion" && allPuntajes.length ?
                <>
                  <TablaPosiciones />
                </>
                :
                <Prediccion />


      }
      {
        modalPredic === false ?
          null :
          <ModalPrediccion />
      }
      <Tooltip/>

    </div>
  );
}

export default App;
