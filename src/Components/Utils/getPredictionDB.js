import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../Firebase/config";
import setPuntos from "./setPuntos";

const getPredictionDB = async (userInfo, userID, setPrediccionActual, prediccionActual, tOf, newPrediction, allMatches, setUserInfo, setToolText, setTooltip, tooltip, setPuntajesAct,
    setPuntajeTotal, setAllPuntajes, resultadosAct, setResultadosAct, setMiPrediccion) => {

    if (userInfo.uid) {
        if (tOf === true) {
            newPrediction(allMatches, setToolText, setTooltip, tooltip, userInfo).then(async () => {
                if (userInfo.habilitado === true) {
                    const q = query(collection(db, "Usuarios"), where("uid", "==", userInfo.uid));

                    const querySnapshot = await getDocs(q);
                    let prediccion = [];
                    querySnapshot.forEach((doc) => {
                        prediccion.push(doc.data());
                    });
                    setUserInfo(prediccion[0]);

                    const u = query(collection(db, "Predicciones"), where("uid", "==", userInfo.uid));
                    const predicSnap = await getDocs(u);

                    let miPredic = [];

                    predicSnap.forEach((doc) => {
                        miPredic.push(doc.data())
                    })
                    setMiPrediccion(miPredic)

                }
            })

        }
    }



}

export default getPredictionDB;