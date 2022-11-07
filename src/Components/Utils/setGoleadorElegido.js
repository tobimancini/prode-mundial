import { collection, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../Firebase/config";

const setGoleadorElegido = async (userInfo, goleador, setToolText, setTooltip, tooltip, setGoleador) => {
    let guardarBtn = document.getElementById('saveBtnSpan');

    guardarBtn.classList.remove('inactive');
    guardarBtn.classList.add('active');

    const q = query(collection(db, "Usuarios"), where("uid", "==", userInfo.uid));
    let usuarioRef = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        usuarioRef.push(doc.ref)
    });

    await updateDoc(usuarioRef[0], {
        "goleador": goleador
    });
    setGoleador(goleador)

    setToolText("SE GUARDÓ TU PREDICCIÓN.")
    setTooltip(tooltip + 1);
    setTimeout(() => {
        setTooltip(tooltip + 2)
    }, 4000);
    setTimeout(() => {
        guardarBtn.classList.add('inactive');
        guardarBtn.classList.remove('active');
    }, 600);
}

export default setGoleadorElegido;