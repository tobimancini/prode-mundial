import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../Firebase/config";

const borrarJugador = async(id, uid) =>{
    await deleteDoc(doc(db, "Usuarios", id));

    const q = query(collection(db, "Predicciones"), where("uid", "==", uid));

    const querySnapshot = await getDocs(q);
    
    querySnapshot.forEach(async (doc) => {
        let predId = doc.id;  
        await deleteDoc(doc(db, "Predicciones", predId));
    })


}

export default borrarJugador;