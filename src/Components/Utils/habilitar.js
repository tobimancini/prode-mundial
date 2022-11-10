import { updateDoc } from "firebase/firestore";

const habilitar = async (ref) => {
    await updateDoc(ref, {
        "habilitado": true
    })
    console.log("hola");
}

export default habilitar;