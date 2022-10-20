import { signOut } from "firebase/auth";
import { auth } from "../../Firebase/config";

const cerrarSesion = async (setUserLogged, setUserID, setPrediccionActual, setPuntajesAct, setPuntajeTotal) => {
    try {
        signOut(auth).then(() => {
            setUserLogged("");
            setUserID("");
            setPrediccionActual({})
            setPuntajesAct([]) 
            setPuntajeTotal([])
        })
    } catch (err) {
        console.error(err);
    }
}

export default cerrarSesion;