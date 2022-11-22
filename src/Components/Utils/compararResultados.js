import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Firebase/config";
import { addDoc, query, where, updateDoc } from "firebase/firestore";


const compararResultados = async (setCargando, setToolText, setTooltip, tooltip) => {
    setCargando(true);
    

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

        let administrador;
        querySnap.forEach((doc) => {
            administrador = doc.data()
        })


        if (administrador.administrador === false) {
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
                            [partido[0]]: {
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

    }

    let equipos = [];

    for (let i = 0; i < puntajesTotales.length; i++) {
        const el = puntajesTotales[i];
        if (el.equipo !== "") {
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

    }

    for (let i = 0; i < puntajesTotales.length; i++) {
        const el = puntajesTotales[i];
        for (let i = 0; i < equipos.length; i++) {
            const equipo = equipos[i];
            if (equipo.puntaje === undefined) {
                if (el.equipo === equipo.equipo) {
                    let puntos = { [el.uid]: el.puntaje }
                    Object.assign(equipo, puntos)
                }
            }
        }
    }




    for (let i = 0; i < equipos.length; i++) {
        const el = equipos[i];
        let equipoPuntos = 0;
        let equipo = Object.entries(el);
        equipo.splice(0, 1)
        equipo.sort((a, b) => a[1] < b[1] ? 1 : b[1] < a[1] ? -1 : 0)
        const nuevo = equipo.slice(0, 5)

        for (let i = 0; i < nuevo.length; i++) {
            const el = nuevo[i];
            equipoPuntos += el[1]
        }
        equipos[i].puntaje = equipoPuntos;

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

    }

    // for (let i = 0; i < puntajesTotales.length; i++) {
    //     const usuario = puntajesTotales[i];
    //     const q = query(collection(db, "Usuarios"), where("uid", "==", usuario.uid));
    //     const queryUser = await getDocs(q);
    //     const userRef = queryUser.docs[0].ref;

    //     if (usuario.jaula === true) {
    //         for (let i = 0; i < equipos.length; i++) {
    //             const equipo = equipos[i];
                
    //             if (usuario.equipo === equipo.equipo) {
    //                 await updateDoc(userRef, {
    //                     posicion: usuario.posicion,
    //                     posicionEquipo: equipo.posicion,
    //                     puntajeActual: usuario.puntaje,
    //                     puntajeEquipo: equipo.puntaje
    //                 })
    
    //             }
    
    //         }   
    //     }else{
    //         await updateDoc(userRef, {
    //             posicion: usuario.posicion,
    //             puntajeActual: usuario.puntaje
    //         })
    //     }


    // }

    setCargando(false);
    setToolText("SE GUARDÓ LA ACTUALIZACIÓN.")
    setTooltip(tooltip + 1);
    setTimeout(() => {
        setTooltip(tooltip + 2)
    }, 4000);

}

export default compararResultados;