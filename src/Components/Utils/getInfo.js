import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../Firebase/config";

const getInfo = async (uid, setPosicionesInd, setPosicionesGrup, setMiPrediccion, setUserInfo, setCampeon, setGoleador, setResultados, setJauleño) => {
    const q = query(collection(db, "Usuarios"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);

    let user;

    querySnapshot.forEach((doc) => {
        user = doc.data();
    })

    const u = query(collection(db, "Predicciones"), where("uid", "==", uid));
    const predicSnap = await getDocs(u);

    let prediccion = [];

    predicSnap.forEach((doc) => {
        prediccion.push(doc.data())
    })

    const w = query(collection(db, "Posiciones"), where("posicion", "<", 11));
    const tablaSnap = await getDocs(w);

    let tablaJugadores = [];

    tablaSnap.forEach((doc) => {
        tablaJugadores.push(doc.data());
    })

    const x = query(collection(db, "PosicionesEquipos"), where("posicion", "<", 11));
    const tablaEquiposSnap = await getDocs(x);

    let tablaEquipos = [];

    tablaEquiposSnap.forEach((doc) => {
        tablaEquipos.push(doc.data());
    })

    const queryResultados = await getDocs(collection(db, "Resultados"));
    let resultados = [];
    queryResultados.forEach((doc) => {
        let result = Object.entries(doc.data())
        resultados.push(result)
    });

    setResultados(resultados)
    setUserInfo(user)
    setMiPrediccion(prediccion)
    setPosicionesInd(tablaJugadores)
    setPosicionesGrup(tablaEquipos)
    setCampeon(user.campeon)
    setGoleador(user.goleador)
    setJauleño(user.jaula)

}

export default getInfo;