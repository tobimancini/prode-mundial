import { collection, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../Firebase/config";

const modificarUser = async (ref, uid) => {
    const userModify = document.querySelector('#edicionUsuario');

    const nombre = userModify['edicionNombre'].value;
    const apellido = userModify['edicionApellido'].value;
    const equipo = userModify['edicionEquipo'].value;
    const jaula = userModify['edicionJaula'].value;
    const campeon = userModify['edicionCampeon'].value;
    const goleador = userModify['edicionGoleador'].value;


    if (nombre !== "") {
        await updateDoc(ref, {
            "nombre": nombre.toUpperCase()
        })
        const q = query(collection(db, "Predicciones"), where("uid", "==", uid));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async(doc) => {
            let ref = doc.ref;
            await updateDoc(ref, {
                "nombre": nombre.toUpperCase()
            })
        });
    }
    if (apellido !== "") {
        await updateDoc(ref, {
            "apellido": apellido.toUpperCase()
        })
        const q = query(collection(db, "Predicciones"), where("uid", "==", uid));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async(doc) => {
            let ref = doc.ref;
            await updateDoc(ref, {
                "apellido": apellido.toUpperCase()
            })
        });
    }
    if (equipo !== "") {
        await updateDoc(ref, {
            "equipo": equipo
        })
        const q = query(collection(db, "Predicciones"), where("uid", "==", uid));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async(doc) => {
            let ref = doc.ref;
            await updateDoc(ref, {
                "equipo": equipo
            })
        });
    }
    if (jaula !== "") {
        if (jaula === "true") {
            await updateDoc(ref, {
                "jaula": true
            })
        } else {
            await updateDoc(ref, {
                "jaula": false
            })
        }
    }

    if (campeon !== "") {
        if (campeon != "") {
            await updateDoc(ref, {
                "campeon": campeon
            })
        } 
    }

    if (goleador !== "") {
        if (goleador != "") {
            await updateDoc(ref, {
                "goleador": goleador
            })
        } 
    }
    
}

export default modificarUser;