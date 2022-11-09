import { addDoc, collection } from "firebase/firestore";
import { db } from "../../Firebase/config";

const newUser = async (dni, nombre, email, user, apellido, sexo, equipo, jaula) => {
    
        if (jaula === "true") {
            let usuario = {
                "dni": dni,
                "nombre": nombre,
                "email": email,
                "uid": user.uid,
                authProvider: "local",
                "habilitado": true,
                "apellido": apellido,
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
            console.log("se creo un usuario jaulero");
        } else if (jaula === "false") {
            let usuario = {
                "dni": dni,
                "nombre": nombre,
                "email": email,
                "uid": user.uid,
                authProvider: "local",
                "habilitado": true,
                "apellido": apellido,
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
            console.log("se creo un usuario no jaulero");
        }

}




export default newUser;