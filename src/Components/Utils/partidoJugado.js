import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../Firebase/config";

const partidoJugadoTrue = async(idPartido) => {

    const docRef = await addDoc(collection(db, "Jugados"), {
        jugado: idPartido
    });
}

export default partidoJugadoTrue