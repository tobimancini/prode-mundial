import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../Firebase/config";
import setPuntos from "./setPuntos";

const getPredictionDB = async (userInfo, userID, setPrediccionActual, prediccionActual, tOf, newPrediction, allMatches, setUserInfo, setToolText, setTooltip, tooltip, setPuntajesAct,
    setPuntajeTotal, setAllPuntajes, resultadosAct, setResultadosAct) => {

if (userID !== "") {
    if (tOf === true) {
        newPrediction(allMatches, userID, setToolText, setTooltip, tooltip, userInfo).then(async () => {
            if (userInfo.habilitado === true) {
                const q = query(collection(db, "Usuarios"), where("uid", "==", userID));
                //VER
                console.log("knkknkn");

                const querySnapshot = await getDocs(q);
                let prediccion = [];
                querySnapshot.forEach((doc) => {
                    prediccion.push(doc.data());
                });
                setPrediccionActual(prediccion[0].prediccion);

                setTimeout(() => {
                    setPuntos(setPuntajesAct, setPuntajeTotal, setAllPuntajes, resultadosAct, setResultadosAct, setPrediccionActual, querySnapshot)
                }, 500);
            }
        })

    } else {

        const q = query(collection(db, "Usuarios"), where("uid", "==", userID));
        const querySnapshot = await getDocs(q);
        let prediccion = [];
        querySnapshot.forEach((doc) => {
            prediccion.push(doc.data());
        });
        setUserInfo(prediccion[0]);
        setPrediccionActual(prediccion[0].prediccion);


        setTimeout(() => {
            setPuntos(setPuntajesAct, setPuntajeTotal, setAllPuntajes, resultadosAct, setResultadosAct, setPrediccionActual, querySnapshot)
        }, 500);


    }
}



}

export default getPredictionDB;