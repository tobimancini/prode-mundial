import { addDoc, collection, doc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "../../Firebase/config";

const resultadoPuntos = async (setCargando, setToolText, setTooltip, tooltip, partidoNum) => {
    setCargando(true);

    let golesLocal = document.querySelectorAll('.golesLocal');
    let golesVisitante = document.querySelectorAll('.golesVisitante');
    let partido = document.querySelectorAll('.invisible');


    let resultado = [];
    const allPredicts = [];
    let partidoEnviado;
    let local;
    let visitante;
    let ganadorEnviado;

    if (golesLocal.length) {

        for (let i = 0; i < golesLocal.length; i++) {
            const loc = golesLocal[i].value;
            const vis = golesVisitante[i].value;
            const part = partido[i].innerHTML;

            if (loc !== "" && vis !== "") {
                partidoEnviado = part;
                local = loc;
                visitante = vis;
                ganadorEnviado = parseInt(loc) > parseInt(vis) ? "local" : parseInt(loc) === parseInt(vis) ? "empate" : "visitante";

                const queryPred = await getDocs(collection(db, "Predicciones"));
                queryPred.forEach((doc) => {
                    allPredicts.push({
                        partido: doc.data()[`partido${part}`],
                        uid: doc.data().uid,
                        apellido: doc.data().apellido,
                        nombre: doc.data().nombre,
                        equipo: doc.data().equipo
                    })
                });

                // console.log(allPredicts);


                // let ganador = parseInt(loc) > parseInt(vis) ? "local" : parseInt(loc) === parseInt(vis) ? "empate" : "visitante";

                // resultado.push([{
                //     [`partido${part}`]: {
                //         "partido": part,
                //         "local": loc,
                //         "visitante": vis,
                //         "ganador": ganador
                //     }
                // }]);

                // const q = query(collection(db, "Resultados"), where(`partido${part}.partido`, "==", part));

                // const querySnapshot = await getDocs(q);
                // let prediccion = [];
                // querySnapshot.forEach((doc) => {
                //     prediccion.push(doc.id);
                // });

                // if (prediccion.length > 0) {
                //     const resultadosRef = doc(db, "Resultados", prediccion[0]);
                //     await updateDoc(resultadosRef, resultado[i][0]);
                // } else {
                //     await addDoc(collection(db, "Resultados"), resultado[i][0]);
                // }


            }

        }
    }
    let usuarios = [];
    // const q = query(collection(db, "Usuarios"), where("uid", "==", "sfZ0AtOS3UU3cX62YGX3JPwHsbn1"));
    // let querySnap = await getDocs(q);

    const querySnap = await getDocs(collection(db, "Usuarios"));
    querySnap.forEach((doc) => {
        if (doc.data().habilitado === true) {
            usuarios.push([doc.data(), doc.ref])
        }
    });

    let puntajesTotales = [];
    for (let i = 0; i < allPredicts.length; i++) {
        // let puntajes = 0;
        const prediccion = allPredicts[i];
        let userId = prediccion.uid;

        for (let i = 0; i < usuarios.length; i++) {
            let administrador = usuarios[i][0];
            let userRef = usuarios[i][1]
            if (administrador.administrador === false && administrador.habilitado === true && administrador.uid === userId) {
                let puntaje = 0;
                const result = {
                    partido: {
                        "partido": partidoEnviado,
                        "local": local,
                        "visitante": visitante,
                        "ganador": ganadorEnviado
                    }
                };

                if (prediccion.partido !== undefined) {
                    if (result.partido.visitante === prediccion.partido.visitante) {
                        puntaje += 1;
                    }
                    if (result.partido.local === prediccion.partido.local) {
                        puntaje += 1;
                    }
                    if (result.partido.ganador === prediccion.partido.ganador) {
                        puntaje += 3;
                    }
                    if (puntaje === 5) {
                        puntaje += 3
                    }
                    // console.log(administrador.puntajeActual + puntaje);
                    // await updateDoc(userRef, {
                    //     [`partido${partidoEnviado}`]: {
                    //         puntaje: puntaje
                    //     },
                    //     puntajeActual: puntaje + administrador.puntajeActual
                    // });
                }

                let puntajeUser = {
                    nombre: administrador.nombre,
                    apellido: administrador.apellido,
                    puntaje: puntaje + administrador.puntajeActual,
                    equipo: administrador.equipo,
                    uid: administrador.uid
                }

                puntajesTotales.push(puntajeUser)
                // puntajes += puntaje;

                // let userData = [];

                // for (let i = 0; i < prediccion.length; i++) {
                //     const el = prediccion[i];
                //     if (el[0] === "nombre" || el[0] === "apellido" || el[0] === "uid" || el[0] === "equipo") {
                //         userData.push(el);
                //     }

                // }

                // let newUD = {};
                // for (let i = 0; i < userData.length; i++) {
                //     const el = userData[i];
                //     let hola = {
                //         [el[0]]: el[1]
                //     }
                //     Object.assign(newUD, hola)
                // }

                // let puntajeUsuario = { puntaje: puntajes }

                // Object.assign(newUD, puntajeUsuario)


                // puntajesTotales.push(newUD);

            }
        }





    }

    puntajesTotales.sort((a, b) => a.puntaje < b.puntaje ? 1 : b.puntaje < a.puntaje ? -1 : 0)

    const querySnapshot = await getDocs(collection(db, "Posiciones"));
    const posicionesUsers = [];
    querySnapshot.forEach((doc) => {
        posicionesUsers.push({
            data: doc.data(),
            ref: doc.ref
        })
    });

    // console.log(posicionesUsers);
    let allNew = [];
    let repetidos = [];
    for (let i = 0; i < puntajesTotales.length; i++) {
        const el = puntajesTotales[i];
        let posicion = { posicion: i + 1 }
        Object.assign(el, posicion)


        for (let i = 0; i < posicionesUsers.length; i++) {
            const user = posicionesUsers[i];
            if (user.data.uid === el.uid) {
                let exist = false;
                for (let i = 0; i < allNew.length; i++) {
                    const el = allNew[i];
                    if (user.data.uid === el.uid) {
                        exist = true;
                    }
                }
                if (exist === false) {

                    allNew.push(el)
                } else {
                    repetidos.push(el)
                }
                // await updateDoc(user.ref, el);
            }
        }


    }

    console.log(allNew);
    console.log(repetidos);

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


    let posicionesEquipos = [];

    const queryEquipos = await getDocs(collection(db, "PosicionesEquipos"));
    queryEquipos.forEach((doc) => {
        posicionesEquipos.push([doc.data(), doc.ref])
    });

    // console.log(posicionesEquipos);

    if (!posicionesEquipos.length) {
        for (let i = 0; i < equipos.length; i++) {
            const el = equipos[i];
            // const tablaEquipos = await addDoc(collection(db, "PosicionesEquipos"), el);
        }
    } else {
        for (let i = 0; i < posicionesEquipos.length; i++) {
            const posicion = posicionesEquipos[i][0];
            console.log(posicion);
            for (let i = 0; i < equipos.length; i++) {
                const el = equipos[i];
                // const q = query(collection(db, "PosicionesEquipos"), where("equipo", "==", el.equipo));
                // const queryS = await getDocs(q);

                // let queryL = queryS.docs.length;
                // if (queryL > 0) {
                //     let queryRef = queryS.docs[0].ref;
                // await updateDoc(queryRef, el);
                // } else {
                // const tablaEquipos = await addDoc(collection(db, "PosicionesEquipos"), el);
            }
        }
    }





    // // // // const tablaPosi = await getDocs(collection(db, "Posiciones"));

    // // // // if (!tablaPosi.docs.length) {
    // // // //     for (let i = 0; i < puntajesTotales.length; i++) {
    // // // //         const el = puntajesTotales[i];
    // // // //         const tablaPosi = await addDoc(collection(db, "Posiciones"), el);
    // // // //     }
    // // // // } else {
    // // // //     for (let i = 0; i < puntajesTotales.length; i++) {
    // // // //         const el = puntajesTotales[i];
    // // // //         const q = query(collection(db, "Posiciones"), where("uid", "==", el.uid));
    // // // //         const queryS = await getDocs(q);

    // // // //         let queryL = queryS.docs.length;
    // // // //         if (queryL > 0) {
    // // // //             let queryRef = queryS.docs[0].ref;
    // // // //             await updateDoc(queryRef, el);
    // // // //         } else {
    // // // //             const tablaPosi = await addDoc(collection(db, "Posiciones"), el);
    // // // //         }
    // // // //     }

    // // // // }

    // // // // let equipos = [];

    // // // // for (let i = 0; i < puntajesTotales.length; i++) {
    // // // //     const el = puntajesTotales[i];
    // // // //     if (el.equipo !== "") {
    // // // //         if (equipos.length === 0) {
    // // // //             equipos.push({ equipo: el.equipo })
    // // // //         } else {
    // // // //             let aparece = false;
    // // // //             for (let i = 0; i < equipos.length; i++) {
    // // // //                 const element = equipos[i];
    // // // //                 if (element.equipo === el.equipo) {
    // // // //                     aparece = true;
    // // // //                 }
    // // // //             }
    // // // //             if (aparece === false) {
    // // // //                 equipos.push({ equipo: el.equipo })
    // // // //             }
    // // // //         }
    // // // //     }

    // // // // }

    // // // // for (let i = 0; i < puntajesTotales.length; i++) {
    // // // //     const el = puntajesTotales[i];
    // // // //     for (let i = 0; i < equipos.length; i++) {
    // // // //         const equipo = equipos[i];
    // // // //         if (equipo.puntaje === undefined) {
    // // // //             if (el.equipo === equipo.equipo) {
    // // // //                 let puntos = { [el.uid]: el.puntaje }
    // // // //                 Object.assign(equipo, puntos)
    // // // //             }
    // // // //         }
    // // // //     }
    // // // // }




    // // // // for (let i = 0; i < equipos.length; i++) {
    // // // //     const el = equipos[i];
    // // // //     let equipoPuntos = 0;
    // // // //     let equipo = Object.entries(el);
    // // // //     equipo.splice(0, 1)
    // // // //     equipo.sort((a, b) => a[1] < b[1] ? 1 : b[1] < a[1] ? -1 : 0)
    // // // //     const nuevo = equipo.slice(0, 5)

    // // // //     for (let i = 0; i < nuevo.length; i++) {
    // // // //         const el = nuevo[i];
    // // // //         equipoPuntos += el[1]
    // // // //     }
    // // // //     equipos[i].puntaje = equipoPuntos;

    // // // // }

    // // // // equipos.sort((a, b) => a.puntaje < b.puntaje ? 1 : b.puntaje < a.puntaje ? -1 : 0);


    // // // // for (let i = 0; i < equipos.length; i++) {
    // // // //     const equipo = equipos[i];
    // // // //     Object.assign(equipo, { posicion: i + 1 })
    // // // // }

    // // // // const tablaEquipos = await getDocs(collection(db, "PosicionesEquipos"));


    // // // // if (!tablaEquipos.docs.length) {
    // // // //     for (let i = 0; i < equipos.length; i++) {
    // // // //         const el = equipos[i];
    // // // //         const tablaEquipos = await addDoc(collection(db, "PosicionesEquipos"), el);
    // // // //     }
    // // // // } else {
    // // // //     for (let i = 0; i < equipos.length; i++) {
    // // // //         const el = equipos[i];
    // // // //         const q = query(collection(db, "PosicionesEquipos"), where("equipo", "==", el.equipo));
    // // // //         const queryS = await getDocs(q);

    // // // //         let queryL = queryS.docs.length;
    // // // //         if (queryL > 0) {
    // // // //             let queryRef = queryS.docs[0].ref;
    // // // //             await updateDoc(queryRef, el);
    // // // //         } else {
    // // // //             const tablaEquipos = await addDoc(collection(db, "PosicionesEquipos"), el);
    // // // //         }
    // // // //     }

    // // // // }

    // const allResults = [];
    // const allPredicts = [];

    // const querySnapshot = await getDocs(collection(db, "Predicciones"));
    // querySnapshot.forEach((doc) => {
    //     allPredicts.push(doc.data().partidoNum)
    // });

    // const resultados = await getDocs(collection(db, "Resultados"));
    // resultados.forEach((doc) => {
    //     allResults.push(doc.data())
    // });

    // console.log(allPredicts);

    setCargando(false);
    setToolText("SE ENVIARON LOS RESULTADOS.")
    setTooltip(tooltip + 1);
    setTimeout(() => {
        setTooltip(tooltip + 2)
    }, 4000);

}

export default resultadoPuntos;