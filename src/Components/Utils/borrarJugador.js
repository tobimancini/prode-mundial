import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../Firebase/config";

const borrarJugador = async(id, uid) =>{
    await deleteDoc(doc(db, "Usuarios", id));

    const q = query(collection(db, "Predicciones"), where("uid", "==", uid));

    const querySnapshot = await getDocs(q);
    
    let predId ; 
    querySnapshot.forEach((doc) => {
        predId = doc.id;
        console.log(doc.id); 
    })
    
    await deleteDoc(doc(db, "Predicciones", predId));
    console.log("borrarPRedi");



}

export default borrarJugador;