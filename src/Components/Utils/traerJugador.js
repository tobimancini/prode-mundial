import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../Firebase/config";

const traerJugador = async(setJugadoresDelete) => {
    const input = document.getElementById('usuariosGet').value.toUpperCase();
    const q = query(collection(db, "Usuarios"), where("apellido", "==", input));

    const querySnapshot = await getDocs(q);
    let jugadores = [];
    querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        jugadores.push({
            id: doc.id,
            ref: doc.ref,
            data: doc.data()
        })
    });
    setJugadoresDelete(jugadores)
}

export default traerJugador;