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

    console.log(usuarioRef);
    setInhabilitados(usuarioRef)
    // usersRef = [];

    // for (let i = 0; i < usuarioRef.length; i++) {
    //     const user = usuarioRef[i];
        
    // }

    // let idUsuario = usuarioRef[0].id;
    // let status = usuarioRef[0]._document.data.value.mapValue.fields.habilitado.booleanValue;

    // const userRef = doc(db, 'Usuarios', idUsuario);
    // await updateDoc(userRef, {
    //     "habilitado": false
    // })
}
export default usuariosInhab;