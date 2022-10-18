import { db } from "../../Firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";


const getPuntos = async (uid) => {

    //puntajes
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

    let resArray = Object.entries(resultados)
    // console.log(resArray);
////

    let prediccion;
    const q = query(collection(db, "Usuarios"), where("uid", "==", uid));

    const queryUser = await getDocs(q);
    queryUser.forEach((doc) => {
        prediccion = doc.data();
    });

    // console.log(prediccion.prediccion);


    for (let i = 0; i < resArray.length; i++) {
        const idResultado = resArray[i][0];
        const resultado = resArray[i][1];
        const resUser = prediccion.prediccion[idResultado];

        const ptsPorGoles = goles(resultado.local, resUser.local)+goles(resultado.visitante, resUser.visitante);
        const ptsPorGanador = ganador(resUser.ganador, resultado.ganador);

        let puntajeFinal;

        if (ptsPorGoles+ptsPorGanador === 5) {
            puntajeFinal = 8;
        }else{
            puntajeFinal = ptsPorGanador+ptsPorGoles;
        }

    }


    // return "numero"
}

export default getPuntos;