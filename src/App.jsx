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


function App() {

  const { database, setDatabase, resultadosAct, setResultadosAct, userLogged, setPrediccionActual, prediccionActual, allPuntajes, faseElegida, setFaseElegida, setToolText,
    setAllPuntajes, setNow, pageState, setUserLogged, setPuntajesAct, setPuntajeTotal, userInfo, setUserInfo, banderas, setBanderas, modalPredic, tooltip, setTooltip,
    allMatches, setAllMatches, donePredictions, loaderOn, setLoaderOn } = useContext(Prode);

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

  const obtenerResultados = async () => {
    let resultados = [];

    const querySnapshot = await getDocs(collection(db, "Resultados"));

    querySnapshot.forEach((doc) => {
      resultados.push(doc.data());
    });
    let resArray = [];

    for (let i = 0; i < resultados.length; i++) {
      const partido = Object.entries(resultados[i]);
      resArray.push(partido[0]);
    }
    setResultadosAct(resArray);
    // console.log(resArray);
  }

  useEffect(() => {
    obtenerResultados();
  }, [prediccionActual])

  const predict = () => {
    getPredictionDB(userInfo, userLogged, setPrediccionActual, prediccionActual, true, setPrediction, allMatches, setUserInfo, setToolText, setTooltip, tooltip, setPuntajesAct, setPuntajeTotal,
      setAllPuntajes, resultadosAct, setResultadosAct);

    let guardarBtn = document.getElementById('saveBtnSpan');

    guardarBtn.classList.remove('inactive');
    guardarBtn.classList.add('active');

    setTimeout(() => {
      guardarBtn.classList.add('inactive');
      guardarBtn.classList.remove('active');
    }, 1800);

    if (userLogged === "") {
      setToolText("Iniciá sesion para poder jugar.")
      setTooltip(tooltip + 1)
      setTimeout(() => {
        setTooltip(tooltip + 2)
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
    }, 5000);
  }, []);


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserLogged(user.uid);
        setUserID(user.uid);
        getPredictionDB(userInfo, user.uid, setPrediccionActual, prediccionActual, false, "", "", setUserInfo, setToolText, setTooltip, tooltip, setPuntajesAct, setPuntajeTotal,
          setAllPuntajes, resultadosAct, setResultadosAct)
        setToolText('INICIASTE SESIÓN COMO ' + user.email);
        setTooltip(tooltip + 1)
        setTimeout(() => {
          setTooltip(tooltip + 2)
        }, 2500);

      } else {
        setTooltip(tooltip + 1);

        setTimeout(() => {
          setTooltip(tooltip + 2)
        }, 2500);
        setToolText("INICIÁ SESIÓN ANTES DE JUGAR.")
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

          pageState === "inicio" ?
            <Home />
            :

            pageState === "perfil" ?
              <Login userID={setUserID} />
              :
              pageState === "partidos" ?
                <>
                  <h2 className="partidosTitulo">PARTIDOS</h2>
                  <p className="donePredictions">{donePredictions}</p>
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

                  <div className="guardarCambios" onClick={() => predict()}>
                    <p>Guardar predicción</p>
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
                  pageState === "prediccion" && allPuntajes.length ?
                    <Prediccion />
                    :
                    pageState === "admin" && allPuntajes.length ?
                      <Admin />
                      :

                      <div className="loaderContain">
                        <FadeLoader className='loader' color={'#edebeb'} loading={true} size={5} aria-label="Loading Spinner" data-testid="loader" />
                      </div>

      }

      <ModalPrediccion />

      <Tooltip />

    </div>
  );
}

export default App;
