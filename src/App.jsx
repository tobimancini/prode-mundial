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

function App() {

  const { database, setDatabase, resultadosAct, setResultadosAct, userLogged, setPrediccionActual, prediccionActual,
    setAllPuntajes, setNow, pageState, setUserLogged, setPuntajesAct, setPuntajeTotal, userInfo, setUserInfo } = useContext(Prode);

  const [userID, setUserID] = useState("");

  const [grupoA, setGrupoA] = useState([]);
  const [grupoB, setGrupoB] = useState([]);
  const [grupoC, setGrupoC] = useState([]);
  const [grupoD, setGrupoD] = useState([]);
  const [grupoE, setGrupoE] = useState([]);
  const [grupoF, setGrupoF] = useState([]);
  const [grupoG, setGrupoG] = useState([]);
  const [grupoH, setGrupoH] = useState([]);
  const [octFinal, setOctFinal] = useState([]);
  const [cuarFinal, setCuarFinal] = useState([]);
  const [semiFinal, setSemiFinal] = useState([]);
  const [terycuarFinal, setTerycuarFinal] = useState([]);
  const [finalisima, setFinalisima] = useState([]);

  const [allMatches, setAllMatches] = useState([]);

  const [faseElegida, setFaseElegida] = useState("Grupo A")

  const getData = async () => {
    const response = await fetch(process.env.PUBLIC_URL + "/fixture/partidos.json");
    const jsonData = await response.json();

    setDatabase(jsonData);

    let partidos = Object.entries(jsonData);

    let grupoAEdit = [];
    let grupoBEdit = [];
    let grupoCEdit = [];
    let grupoDEdit = [];
    let grupoEEdit = [];
    let grupoFEdit = [];
    let grupoGEdit = [];
    let grupoHEdit = [];
    let octavos = [];
    let cuartos = [];
    let semis = [];
    let tercerycuarto = [];
    let final = [];
    let matches = [];

    for (let i = 0; i < partidos.length; i++) {
      const partido = partidos[i];

      matches.push(partido);

      switch (partido[1].grupo) {
        case "A":
          grupoAEdit.push(partido);
          break;
        case "B":
          grupoBEdit.push(partido);
          break;
        case "C":
          grupoCEdit.push(partido);
          break;
        case "D":
          grupoDEdit.push(partido);
          break;
        case "E":
          grupoEEdit.push(partido);
          break;
        case "F":
          grupoFEdit.push(partido);
          break;
        case "G":
          grupoGEdit.push(partido);
          break;
        case "H":
          grupoHEdit.push(partido);
          break;
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

    setGrupoA(grupoAEdit);
    setGrupoB(grupoBEdit);
    setGrupoC(grupoCEdit);
    setGrupoD(grupoDEdit);
    setGrupoE(grupoEEdit);
    setGrupoF(grupoFEdit);
    setGrupoG(grupoGEdit);
    setGrupoH(grupoHEdit);
    setOctFinal(octavos);
    setCuarFinal(cuartos);
    setSemiFinal(semis);
    setTerycuarFinal(tercerycuarto);
    setFinalisima(final);
    setAllMatches(matches);

  };

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
    getPredictionDB(userLogged, setPrediccionActual, prediccionActual, true, setPrediction, allMatches,"" );
    setTimeout(() => {
      setPuntos(userLogged, setPuntajesAct, setPuntajeTotal);
    }, 500);
  }

  const fases = ["Grupo A", "Grupo B", "Grupo C", "Grupo D", "Grupo E", "Grupo F", "Grupo G", "Grupo H", "Octavos de final", "Cuartos de final", "Semifinales",
    "Tercer y cuarto puesto", "Final"];

  const filtrarFase = () => {
    const fase = document.getElementById('faseElegida').value;
    setFaseElegida(fase);
  }

  const partidosPorFase = [grupoA, grupoB, grupoC, grupoD, grupoE, grupoF, grupoG, grupoH, octFinal, cuarFinal, semiFinal, terycuarFinal, finalisima];

  useEffect(() => {
    getAllPuntajes(setAllPuntajes);
  }, [])

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
        
        setTimeout(() => {
          setPuntos(user.uid, setPuntajesAct, setPuntajeTotal);
        }, 500);

      } else {
        console.log("no user");
      }
    })
  }, []);


  return (
    <div className="App" >
      <Navbar />
      {
        pageState === "perfil" ?
          <Login userID={setUserID} />
          :
          pageState === "partidos" ?
            <>
              <h2 className="partidosTitulo">PARTIDOS</h2>
              {/* <div className="totalPts">
                <p>{puntajeTotal}pts</p>
              </div> */}

              <select name="fase" id="faseElegida">
                {
                  fases.map(fase => {
                    return <option key={fase} value={fase}>{fase}</option>
                  })
                }
              </select>
              <div className="btnFiltro" onClick={() => filtrarFase()}>FILTRAR</div>
              {
                database.partido1 != undefined ?
                  <Group grupo={faseElegida} partidos={partidosPorFase} fases={fases} />
                  :
                  null
              }
              <div className="guardarCambios" onClick={() => predict()}>GUARDAR PREDICCIÓN</div>
            </>
            :
            pageState === "clasificacion" ?
              <>
                <TablaPosiciones />
              </>
              :
              <Prediccion />
      }

    </div>
  );
}

export default App;
