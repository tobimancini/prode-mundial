import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Firebase/config";

const getAllPuntajes = async(setAllPuntajes) => {
    const querySnapshot = await getDocs(collection(db, "Usuarios"));
    let usuarios = [];
    querySnapshot.forEach((doc) => {
        let usuario = doc.data();
        usuarios.push(usuario)
    });


    usuarios.sort((a, b) => (a.puntajeFinal > b.puntajeFinal) ? 1 : -1)
    console.log(usuarios);
    setAllPuntajes(usuarios);
}

export default getAllPuntajes;