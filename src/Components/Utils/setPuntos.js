import { db } from "../../Firebase/config";
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import getAllPuntajes from "./getAllPuntajes";


const setPuntos = async (setPuntajesAct, setPuntajeTotal, setAllPuntajes, resultadosAct, setResultadosAct, setPrediccionActual, queryUser) => {

    const goles = (a, b) => {
        if (a === b) {
            return 1
        } else {
            return 0
        }
    }

    const ganador = (a, b) => {
        if (a === b) {
            return 3
        } else {
            return 0
        }
    }

    let resultados = [];
    let resArray = [];


    if (resultadosAct.length === 0) {
        const querySnapshot = await getDocs(collection(db, "Resultados"));
        querySnapshot.forEach((doc) => {
            resultados.push(doc.data());
        });

        for (let i = 0; i < resultados.length; i++) {
            const partido = Object.entries(resultados[i]);
            resArray.push(partido[0]);
        }
        setResultadosAct(resArray);
    } else {
        resArray = resultadosAct;
    }


    if (resArray.length !== 0) {
        let prediccion;
        let documentoId;

        queryUser.forEach((doc) => {
            prediccion = doc.data();
            documentoId = doc.id;
        });

        const userRef = doc(db, 'Usuarios', documentoId);

        let puntajesActualizados = [];
        let puntajeActualTotal = 0;


        for (let i = 0; i < resArray.length; i++) {
            const idResultado = resArray[i][0];
            const resultado = resArray[i][1];
            const resUser = prediccion.prediccion[idResultado];

            let ptsPorGoles = goles(resultado.local, resUser.local) + goles(resultado.visitante, resUser.visitante);
            let ptsPorGanador = ganador(resUser.ganador, resultado.ganador);
            let ptsExacto = ptsPorGoles + ptsPorGanador === 5 ? 3 : 0;

            let puntajeFinal = ptsPorGanador + ptsPorGoles + ptsExacto;

            puntajeActualTotal += puntajeFinal;


            await updateDoc(userRef, {
                [`prediccion.${idResultado}.ptsGoles`]: ptsPorGoles,
                [`prediccion.${idResultado}.ptsGanador`]: ptsPorGanador,
                [`prediccion.${idResultado}.ptsExacto`]: ptsExacto,
                [`prediccion.${idResultado}.ptsTotal`]: puntajeFinal,
                "puntajeActual": puntajeActualTotal

            })

            puntajesActualizados.push({
                [idResultado]: puntajeFinal
            })
        }
        setPuntajesAct(puntajesActualizados);
        setPuntajeTotal(puntajeActualTotal);

    }
    await getAllPuntajes(setAllPuntajes)
}

export default setPuntos;