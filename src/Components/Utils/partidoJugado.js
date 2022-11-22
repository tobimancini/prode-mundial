import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../Firebase/config";

const partidoJugadoTrue = async(idPartido, setToolText, setTooltip, tooltip) => {

    const docRef = await addDoc(collection(db, "Jugados"), {
        jugado: idPartido
    });

    setToolText(idPartido+" jugado!")
    setTooltip(tooltip+1)
    setTimeout(() => {
        setTooltip(tooltip+2)
    }, 3000);
}

export default partidoJugadoTrue