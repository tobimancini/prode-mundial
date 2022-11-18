import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../Firebase/config";


const traerEquipo = async (setUsersDelete) => {
    const input = document.getElementById('equiposGet').value;
    let q ;
    if (input === "") {
        q = query(collection(db, "Usuarios"), where("equipo", "!=", input));
    }else{
        q = query(collection(db, "Usuarios"), where("equipo", "==", input));

    }

    const querySnapshot = await getDocs(q);
    let users = [];
    querySnapshot.forEach((doc) => {
        users.push({
            id: doc.id,
            ref: doc.ref,
            data: doc.data()
        })
    })
    setUsersDelete(users)

}

export default traerEquipo