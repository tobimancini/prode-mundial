import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../Firebase/config";

const prediccionUser = async (uid) => {
    const q = query(collection(db, "Predicciones"), where("uid", "==", uid));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
        console.log(doc.data());  
    })

}

export default prediccionUser;