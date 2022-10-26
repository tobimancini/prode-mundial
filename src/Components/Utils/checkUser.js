import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../Firebase/config";

const checkUser = async (email, nombre, contrseña, createFunction) => {
    const q = query(collection(db, "Usuarios"), where("email", "==", email));
    //VER
    console.log("hola");
    const querySnapshot = await getDocs(q);

    if (querySnapshot.docs.length > 0) {
        console.log("existe el usuario");
    }else{
        createFunction(nombre, email, contrseña);
        console.log("creado");
    }

}

export default checkUser;