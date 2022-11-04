import { addDoc, collection } from "firebase/firestore";
import { db } from "../../Firebase/config";

const newUser = async (dni, nombre, email, user, apellido, sexo, equipo, jaula) => {

    const partidos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56,
        57, 58, 59, 60, 61, 62, 63, 64]

    let partidosVacios = partidos.map(partido => {
        let allMatches = {
            [`partido${partido}`]: {
                "local": "",
                "visitante": "",
                "ganador": "",
                "partido": partido
            }
        };

        return { ...allMatches }
    })

    let finalPrediction = {}

    let allMatches = () => {
        for (let i = 0; i < partidosVacios.length; i++) {
            const match = partidosVacios[i];
            finalPrediction = Object.assign(finalPrediction, match)
        }
    }

    let usuario;

    if (jaula === false) {
        usuario = {
            "prediccion": finalPrediction,
            "dni": dni,
            "nombre": nombre,
            "email": email,
            "uid": user.uid,
            authProvider: "local",
            "habilitado": false,
            "apellido": apellido,
            "sexo": "",
            "equipo": "",
            "puntajeActual": 0,
            "jaula": false
        }
    }else{
        usuario = {
            "prediccion": finalPrediction,
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
            "administrador" : false
        }
    }

    allMatches();

    const docRef = await addDoc(collection(db, "Usuarios"), usuario);

}




export default newUser;