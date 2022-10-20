import { async } from "@firebase/util";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../Firebase/config";

const getPredictionDB = async (userID, setPrediccionActual, prediccionActual, tOf, newPrediction, allMatches, setUserInfo) => {

    if (tOf === true) {
        newPrediction(allMatches, userID).then(async () => {
            const q = query(collection(db, "Usuarios"), where("uid", "==", userID));

            const querySnapshot = await getDocs(q);
            let prediccion = [];
            querySnapshot.forEach((doc) => {
                prediccion.push(doc.data());
            });
            setPrediccionActual(prediccion[0].prediccion);
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
    }
}

export default getPredictionDB;