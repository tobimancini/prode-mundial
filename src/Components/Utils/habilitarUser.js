import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../Firebase/config";

const habilitarUser = async (userId) => {
    const q = query(collection(db, "Usuarios"), where("uid", "==", userId));
    let usuarioRef = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        usuarioRef.push(doc)
    });
    let idUsuario = usuarioRef[0].id;
    let status = usuarioRef[0]._document.data.value.mapValue.fields.habilitado.booleanValue;

    const userRef = doc(db, 'Usuarios', idUsuario);

    if (status === true) {
        await updateDoc(userRef, {
            "habilitado": false
        })
    }else if (status === false){
        await updateDoc(userRef, {
            "habilitado": true
        })
    }
}

export default habilitarUser;