import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../Firebase/config";

const getUserMore = async(uid, setChamp, setGoal, setMore) => {
    const q = query(collection(db, "Usuarios"), where("uid", "==", uid));

    const querySnapshot = await getDocs(q);
    let usuario;
    querySnapshot.forEach(async (doc) => {
        usuario = doc.data();
    });

    setChamp(usuario.campeon)
    setGoal(usuario.goleador)
    setMore(uid)
}

export default getUserMore