import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../Firebase/config";

const getPredictionDB = async (userID, setPrediccionActual, prediccionActual, tOf, newPrediction, allMatches, setUserInfo, setToolText, setTooltip, tooltip) => {

    if (tOf === true) {   
            const q = query(collection(db, "Usuarios"), where("uid", "==", userID));

            const querySnapshot = await getDocs(q);
            let prediccion = [];
            querySnapshot.forEach((doc) => {
                prediccion.push(doc.data());
            });
            if (prediccion[0].habilitado === true) {
                newPrediction(allMatches, userID).then(async () => {
                    setPrediccionActual(prediccion[0].prediccion);
                    setToolText("SE GUARDÓ TU PREDICCIÓN.")
                    setTooltip(tooltip+1);
                    setTimeout(() => {
                        setTooltip(tooltip+2)
                    }, 4000);
                })
            }else{
                setToolText("PERDÓN, PERO NO ESTAS HABILITADO TODAVÍA.")
                setTooltip(tooltip+1);
                setTimeout(() => {
                    setTooltip(tooltip+2)
                }, 4000);

            }
       
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