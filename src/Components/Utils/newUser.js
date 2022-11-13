import { addDoc, collection } from "firebase/firestore";
import { db } from "../../Firebase/config";

const newUser = async (dni, nombre, email, user, apellido, sexo, equipo, jaula) => {
    
        if (jaula === "true") {
            let usuario = {
                "dni": dni,
                "nombre": nombre.toUpperCase(),
                "email": email,
                "uid": user.uid,
                authProvider: "local",
                "habilitado": false,
                "apellido": apellido.toUpperCase(),
                "sexo": sexo,
                "equipo": equipo,
                "puntajeActual": 0,
                "jaula": true,
                "posicion": "",
                "posicionEquipo": "",
                "puntajeEquipo": 0,
                "administrador": false,
                "campeon": "",
                "goleador": ""
            }
            const docRef = await addDoc(collection(db, "Usuarios"), usuario);
        } else if (jaula === "false") {
            let usuario = {
                "dni": dni,
                "nombre": nombre.toUpperCase(),
                "email": email,
                "uid": user.uid,
                authProvider: "local",
                "habilitado": false,
                "apellido": apellido.toUpperCase(),
                "sexo": "",
                "equipo": "",
                "puntajeActual": 0,
                "jaula": false,
                "posicion": "",
                "posicionEquipo": "",
                "puntajeEquipo": 0,
                "administrador": false,
                "campeon": "",
                "goleador": ""
            }
            const docRef = await addDoc(collection(db, "Usuarios"), usuario);
        }

}




export default newUser;