import { db } from "../../Firebase/config";
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import getAllPuntajes from "./getAllPuntajes";


const setPuntos = async (uid, setPuntajesAct, setPuntajeTotal, setAllPuntajes) => {

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

    let resultados;

    const querySnapshot = await getDocs(collection(db, "Resultados"));
    querySnapshot.forEach((doc) => {
        resultados = doc.data();
    });

    let resArray = Object.entries(resultados);

    let prediccion;
    let documentoId;
    const q = query(collection(db, "Usuarios"), where("uid", "==", uid));

    const queryUser = await getDocs(q);
    queryUser.forEach((doc) => {
        prediccion = doc.data();
        documentoId = doc.id;
    });

    const userRef = doc(db, 'Usuarios', documentoId);

    let puntajesActualizados=[];
    let puntajeActualTotal = 0;

    for (let i = 0; i < resArray.length; i++) {
        const idResultado = resArray[i][0];
        const resultado = resArray[i][1];
        const resUser = prediccion.prediccion[idResultado];

        let ptsPorGoles = goles(resultado.local, resUser.local) + goles(resultado.visitante, resUser.visitante);
        let ptsPorGanador = ganador(resUser.ganador, resultado.ganador);
        let ptsExacto = ptsPorGoles + ptsPorGanador === 5 ? 3 : 0;

        let puntajeFinal = ptsPorGanador + ptsPorGoles + ptsExacto;

        puntajeActualTotal+=puntajeFinal;
        

        await updateDoc(userRef, {
            [`prediccion.${idResultado}.ptsGoles`]: ptsPorGoles,
            [`prediccion.${idResultado}.ptsGanador`]: ptsPorGanador,
            [`prediccion.${idResultado}.ptsExacto`]: ptsExacto,
            [`prediccion.${idResultado}.ptsTotal`]: puntajeFinal,
            "puntajeActual":puntajeActualTotal
            
        })

        puntajesActualizados.push({
            [idResultado]: puntajeFinal
        })
    }

    // console.log(puntajesActualizados);
    setPuntajesAct(puntajesActualizados);
    setPuntajeTotal(puntajeActualTotal);

    await getAllPuntajes(setAllPuntajes)
}

export default setPuntos;