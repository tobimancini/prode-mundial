import { async } from "@firebase/util";
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../Firebase/config";

const setCampeonElegido = async (userInfo, campeon, setToolText, setTooltip, tooltip, setCampeon) => {

    if (userInfo.habilitado === true) {
        let guardarBtn = document.getElementById('saveBtnSpan');

        guardarBtn.classList.remove('inactive');
        guardarBtn.classList.add('active');

        if (campeon === "") {
            setTimeout(() => {
                setToolText("ELIJA UNA OPCIÓN ANTES DE GUARDAR.")
                setTooltip(tooltip + 1);
                setTimeout(() => {
                    setTooltip(tooltip + 2)
                }, 4000);
                guardarBtn.classList.add('inactive');
                guardarBtn.classList.remove('active');
            }, 600);
        } else {
            const q = query(collection(db, "Usuarios"), where("uid", "==", userInfo.uid));
            let usuarioRef = [];
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                usuarioRef.push(doc.ref)
            });

            await updateDoc(usuarioRef[0], {
                "campeon": campeon
            });
            setCampeon(campeon)

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
    } else {
        setToolText("LO SENTIMOS, PERO NO ESTAS HABILITADO TODAVÍA.")
        setTooltip(tooltip + 1);
        setTimeout(() => {
            setTooltip(tooltip + 2)
        }, 4000);
    }



}

export default setCampeonElegido;