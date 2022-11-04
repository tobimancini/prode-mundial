import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Firebase/config";
import { addDoc, query, where, updateDoc } from "firebase/firestore";


const compararResultados = async () => {
    const allResults = [];
    const allPredicts = [];

    const querySnapshot = await getDocs(collection(db, "Predicciones"));
    querySnapshot.forEach((doc) => {
        allPredicts.push(doc.data())
    });

    const resultados = await getDocs(collection(db, "Resultados"));
    resultados.forEach((doc) => {
        allResults.push(doc.data())
    });


    let predictOrd = [];

    let puntajesTotales = [];

    for (let i = 0; i < allPredicts.length; i++) {
        const predict = allPredicts[i];
        let predictArr = Object.entries(predict);
        predictOrd.push(predictArr);
    }

    for (let i = 0; i < predictOrd.length; i++) {
        let puntajes = 0;
        const prediccion = predictOrd[i];

        let userId = prediccion.filter((el) => (el[0] === "uid"))
        const q = query(collection(db, "Usuarios"), where("uid", "==", userId[0][1]));
        let querySnap = await getDocs(q);


        let partidos = [];
        for (let i = 0; i < prediccion.length; i++) {
            const el = prediccion[i];
            if (el[0] !== "apellido" && el[0] !== "nombre" && el[0] !== "uid", el[0] !== "equipo") {
                partidos.push(el);
            }
        }
        for (let i = 0; i < allResults.length; i++) {
            let puntaje = 0;
            const result = allResults[i];
            for (let i = 0; i < partidos.length; i++) {
                let partido = partidos[i];

                if (result[partido[0]] !== undefined) {
                    if (result[partido[0]].visitante === partido[1].visitante) {
                        puntaje += 1;
                    }
                    if (result[partido[0]].local === partido[1].local) {
                        puntaje += 1;
                    }
                    if (result[partido[0]].ganador === partido[1].ganador) {
                        puntaje += 3;
                    }
                    if (puntaje === 5) {
                        puntaje += 3
                    }
                    let queryRef = querySnap.docs[0].ref;
                    await updateDoc(queryRef, {
                        [partido[0]] : {
                            puntaje: puntaje
                        }
                    });
                }
            }
            puntajes += puntaje;
        }
        let userData = [];

        for (let i = 0; i < prediccion.length; i++) {
            const el = prediccion[i];
            if (el[0] === "nombre" || el[0] === "apellido" || el[0] === "uid" || el[0] === "equipo") {
                userData.push(el);
            }

        }

        let newUD = {};
        for (let i = 0; i < userData.length; i++) {
            const el = userData[i];
            let hola = {
                [el[0]]: el[1]
            }
            Object.assign(newUD, hola)
        }

        let puntajeUsuario = { puntaje: puntajes }

        Object.assign(newUD, puntajeUsuario)


        puntajesTotales.push(newUD);


    }
    puntajesTotales.sort((a, b) => a.puntaje < b.puntaje ? 1 : b.puntaje < a.puntaje ? -1 : 0)

    for (let i = 0; i < puntajesTotales.length; i++) {
        const el = puntajesTotales[i];
        let posicion = { posicion: i + 1 }
        Object.assign(el, posicion)
    }


    const tablaPosi = await getDocs(collection(db, "Posiciones"));

    if (!tablaPosi.docs.length) {
        for (let i = 0; i < puntajesTotales.length; i++) {
            const el = puntajesTotales[i];
            const tablaPosi = await addDoc(collection(db, "Posiciones"), el);
        }
        console.log("created");
    } else {
        for (let i = 0; i < puntajesTotales.length; i++) {
            const el = puntajesTotales[i];
            const q = query(collection(db, "Posiciones"), where("uid", "==", el.uid));
            const queryS = await getDocs(q);

            let queryL = queryS.docs.length;
            if (queryL > 0) {
                let queryRef = queryS.docs[0].ref;
                await updateDoc(queryRef, el);
            } else {
                const tablaPosi = await addDoc(collection(db, "Posiciones"), el);
            }
        }
        console.log("updated");

    }

    let equipos = [];

    for (let i = 0; i < puntajesTotales.length; i++) {
        const el = puntajesTotales[i];
        if (equipos.length === 0) {
            equipos.push({ equipo: el.equipo })
        } else {
            let aparece = false;
            for (let i = 0; i < equipos.length; i++) {
                const element = equipos[i];
                if (element.equipo === el.equipo) {
                    aparece = true;
                }
            }
            if (aparece === false) {
                equipos.push({ equipo: el.equipo })
            }
        }
    }
    for (let i = 0; i < puntajesTotales.length; i++) {
        const el = puntajesTotales[i];
        for (let i = 0; i < equipos.length; i++) {
            const equipo = equipos[i];
            if (equipo.puntaje === undefined) {
                if (el.equipo === equipo.equipo) {
                    let puntos = { puntaje: el.puntaje }
                    Object.assign(equipo, puntos)
                }
            } else {
                if (el.equipo === equipo.equipo) {
                    equipo.puntaje = equipo.puntaje + el.puntaje;
                }
            }
        }
    }

    equipos.sort((a, b) => a.puntaje < b.puntaje ? 1 : b.puntaje < a.puntaje ? -1 : 0);

    for (let i = 0; i < equipos.length; i++) {
        const equipo = equipos[i];
        Object.assign(equipo, { posicion: i + 1 })
    }

    const tablaEquipos = await getDocs(collection(db, "PosicionesEquipos"));

    if (!tablaEquipos.docs.length) {
        for (let i = 0; i < equipos.length; i++) {
            const el = equipos[i];
            const tablaEquipos = await addDoc(collection(db, "PosicionesEquipos"), el);
        }
        console.log("created equipos");
    } else {
        for (let i = 0; i < equipos.length; i++) {
            const el = equipos[i];
            const q = query(collection(db, "PosicionesEquipos"), where("equipo", "==", el.equipo));
            const queryS = await getDocs(q);

            let queryL = queryS.docs.length;
            if (queryL > 0) {
                let queryRef = queryS.docs[0].ref;
                await updateDoc(queryRef, el);
            } else {
                const tablaEquipos = await addDoc(collection(db, "PosicionesEquipos"), el);
            }
        }
        console.log("updated equipos");

    }

    for (let i = 0; i < puntajesTotales.length; i++) {
        const usuario = puntajesTotales[i];
        const q = query(collection(db, "Usuarios"), where("uid", "==", usuario.uid));
        const queryUser = await getDocs(q);
        const userRef = queryUser.docs[0].ref;

        for (let i = 0; i < equipos.length; i++) {
            const equipo = equipos[i];
            if (usuario.equipo === equipo.equipo) {
                await updateDoc(userRef, {
                    posicion: usuario.posicion,
                    posicionEquipo: equipo.posicion,
                    puntajeActual: usuario.puntaje,
                    puntajeEquipo: equipo.puntaje
                })
                console.log("veces posiciones actualizadas");

            }

        }


    }

}

export default compararResultados;