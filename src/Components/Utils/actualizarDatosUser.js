import { collection, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../Firebase/config";

const actualizarDatosUser = async () => {
    // const q = query(collection(db, "Usuarios"), where("habilitado", "==", true));
    // let usuarios = [];
    // let querySnapshot = await getDocs(q);
    // querySnapshot.forEach((doc) => {
    //     usuarios.push(doc.data())
    // });

    let posiciones = [];

    const queryPos = await getDocs(collection(db, "Posiciones"));
    queryPos.forEach((doc) => {
        posiciones.push(doc.data())
    });

    let posicionesEq = [];

    const queryPosEq = await getDocs(collection(db, "PosicionesEquipos"));
    queryPosEq.forEach((doc) => {
        posicionesEq.push(doc.data())
    });


    for (let i = 0; i < posiciones.length; i++) {
        const usuario = posiciones[i];
        console.log(usuario);
        if (usuario.equipo !== "") {
            for (let i = 0; i < posicionesEq.length; i++) {
                const equipo = posicionesEq[i];
                if (usuario.equipo === equipo.equipo) {
                    const q = query(collection(db, "Usuarios"), where("uid", "==", usuario.uid));
                    const queryUser = await getDocs(q);
                    const userRef = queryUser.docs[0].ref;

                    await updateDoc(userRef, {
                        posicion: usuario.posicion,
                        posicionEquipo: equipo.posicion,
                        puntajeActual: usuario.puntaje,
                        puntajeEquipo: equipo.puntaje
                    })
                    // console.log(usuario.apellido+{
                    //     posicion: usuario.posicion,
                    //     posicionEquipo: equipo.posicion,
                    //     puntajeActual: usuario.puntaje,
                    //     puntajeEquipo: equipo.puntaje
                    // });



                }

            }
        } else {
            const q = query(collection(db, "Usuarios"), where("uid", "==", usuario.uid));
            const queryUser = await getDocs(q);
            const userRef = queryUser.docs[0].ref;
            await updateDoc(userRef, {
                posicion: usuario.posicion,
                puntajeActual: usuario.puntaje
            })
        }
    }

}

export default actualizarDatosUser;