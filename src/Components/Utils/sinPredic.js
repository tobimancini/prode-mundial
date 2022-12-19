import { async } from "@firebase/util";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../Firebase/config";

const sinPredic = async () => {
    // // const q = query(collection(db, "Usuarios"), where("habilitado", "==", true));

    // // const querySnapshot = await getDocs(q);
    // let habilitados = [];
    // querySnapshot.forEach((doc) => {
    //     habilitados.push(doc.data())
    // });
    const q = query(collection(db, "Predicciones"), where("apellido", "==", "ETCHEBERRY"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        console.log(doc.id);
    });

    // const queryPredic = await getDocs(collection(db, "Predicciones"));
    // let predicciones = [];
    // queryPredic.forEach((doc) => {
    //     predicciones.push(doc.data())
    // });

    // let sinPrediccion = [];

    // for (let i = 0; i < habilitados.length; i++) {
    //     const user = habilitados[i];
    //     let withPredic = false;
    //     for (let i = 0; i < predicciones.length; i++) {
    //         const prediccion = predicciones[i];
    //         if (user.uid === prediccion.uid) {
    //             withPredic = true;
    //         }
    //     }
    //     if (withPredic === false) {
    //         sinPrediccion.push(user.nombre+" "+user.apellido)
    //     }
    // }

    // console.log(sinPrediccion);
    // // const q = query(collection(db, "Usuarios"), where("habilitado", "==", true));

    // // const querySnapshot = await getDocs(q);
    // // // const querySnapshot = await getDocs(collection(db, "Usuarios"));
    // // let emailList = [];
    // // querySnapshot.forEach((doc) => {
    // //     emailList.push(doc.data().nombre+" "+doc.data().apellido)
    // // });

    // // console.log(emailList);
}

export default sinPredic