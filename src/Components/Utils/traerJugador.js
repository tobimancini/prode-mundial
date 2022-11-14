import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../Firebase/config";

const traerJugador = async(setJugadoresDelete) => {
    const input = document.getElementById('usuariosGet').value;
    const q = query(collection(db, "Usuarios"), where("apellido", "==", input.toUpperCase()));
    const u = query(collection(db, "Usuarios"), where("dni", "==", input));

    const querySnapshot = await getDocs(q);
    const queryDni = await getDocs(u);
    let jugadores = [];
    querySnapshot.forEach((doc) => {
        jugadores.push({
            id: doc.id,
            ref: doc.ref,
            data: doc.data()
        })
    })
    queryDni.forEach((doc) => {
        jugadores.push({
            id: doc.id,
            ref: doc.ref,
            data: doc.data()
        })
    })

    if (jugadores.length === 0) {
        const q = query(collection(db, "Usuarios"), where("habilitado", "==", false));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            jugadores.push({
                id: doc.id,
                ref: doc.ref,
                data: doc.data()
            })
        });
        setJugadoresDelete(jugadores)
    }else{
        setJugadoresDelete(jugadores)
    }
}

export default traerJugador;