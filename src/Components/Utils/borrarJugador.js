import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../Firebase/config";

const borrarJugador = async(id) =>{
    await deleteDoc(doc(db, "Usuarios", id));
}

export default borrarJugador;