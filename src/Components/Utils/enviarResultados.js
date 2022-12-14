import { addDoc, collection, doc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "../../Firebase/config";

const enviarResultados = async (setCargando, setToolText, setTooltip, tooltip) => {
    setCargando(true);

    let golesLocal = document.querySelectorAll('.golesLocal');
    let golesVisitante = document.querySelectorAll('.golesVisitante');
    let partido = document.querySelectorAll('.invisible');


    let resultado = [];

    if (golesLocal.length) {

        for (let i = 0; i < golesLocal.length; i++) {
            const loc = golesLocal[i].value;
            const vis = golesVisitante[i].value;
            const part = partido[i].innerHTML;

            if (loc !== "" && vis !== "") {
                let ganador = parseInt(loc) > parseInt(vis) ? "local" : parseInt(loc) === parseInt(vis) ? "empate" : "visitante";

                resultado.push([{
                    [`partido${part}`]: {
                        "partido": part,
                        "local": loc,
                        "visitante": vis,
                        "ganador": ganador
                    }
                }]);

                const q = query(collection(db, "Resultados"), where(`partido${part}.partido`, "==", part));

                const querySnapshot = await getDocs(q);
                let prediccion = [];
                querySnapshot.forEach((doc) => {
                    prediccion.push(doc.id);
                });

                if (prediccion.length > 0) {
                    const resultadosRef = doc(db, "Resultados", prediccion[0]);
                    await updateDoc(resultadosRef, resultado[i][0]);
                } else {
                    await addDoc(collection(db, "Resultados"), resultado[i][0]);
                }


            }

        }
    }

    setCargando(false);
    setToolText("SE ENVIARON LOS RESULTADOS.")
    setTooltip(tooltip + 1);
    setTimeout(() => {
        setTooltip(tooltip + 2)
    }, 4000);

}

export default enviarResultados;