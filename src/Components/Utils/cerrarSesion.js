import { signOut } from "firebase/auth";
import { auth } from "../../Firebase/config";

const cerrarSesion = async (setUserLogged, setUserID, setPrediccionActual, setPuntajesAct, setPuntajeTotal, setUserInfo) => {
    try {
        signOut(auth).then(() => {
            setUserLogged("");
            setUserID("");
            setPrediccionActual({})
            setPuntajesAct([]) 
            setPuntajeTotal([])
            setUserInfo({})
        })
    } catch (err) {
        console.error(err);
    }
}

export default cerrarSesion;