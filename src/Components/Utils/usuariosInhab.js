import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../Firebase/config";
import getAllPuntajes from "./getAllPuntajes";

const usuariosInhab = async (setInhabilitados) => {
    const q = query(collection(db, "Usuarios"), where("habilitado", "==", false));
    let usuarioRef = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        usuarioRef.push({
            data: doc.data(),
            id: doc.id,
            ref: doc.ref
        })
    });

    setInhabilitados(usuarioRef)
    
}
export default usuariosInhab;