import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../Firebase/config";

const getTabla = async (tipo, num, setPosicionesGrup, setPosicionesInd, scrollTrue) => {
    if (tipo === "individual") {
        const w = query(collection(db, "Posiciones"), where("posicion", "<", num));
        const tablaSnap = await getDocs(w);

        let tablaJugadores = [];

        tablaSnap.forEach((doc) => {
            tablaJugadores.push(doc.data());
        })
        setPosicionesInd(tablaJugadores)
    } else {
        const x = query(collection(db, "PosicionesEquipos"), where("posicion", "<", num));
        const tablaEquiposSnap = await getDocs(x);

        let tablaEquipos = [];

        tablaEquiposSnap.forEach((doc) => {
            tablaEquipos.push(doc.data());
        })
        setPosicionesGrup(tablaEquipos);
    }
    setTimeout(() => {
        scrollTrue();  
    }, 300);
}

export default getTabla;