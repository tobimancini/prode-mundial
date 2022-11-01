import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { ImCoinDollar } from "react-icons/im";
import { db } from "../../Firebase/config";

const checkUser = async (email, nombre, contrseña, createFunction, setToolText, setTooltip, tooltip) => {
    const q = query(collection(db, "Usuarios"), where("email", "==", email));
    const querySnapshot = await getDocs(q);

    console.log(querySnapshot)

    const inputsCrear = document.querySelectorAll('.crearUsuario');
    // console.log(inputsCrear);

    let arrayVacio = [];

    if (querySnapshot.docs.length > 0) {
        setToolText("YA EXISTE UN USUARIO CON EL EMAIL INGRESADO.")
        setTooltip(tooltip + 1)
            setTimeout(() => {
                setTooltip(tooltip + 2)
            }, 2500);
    }else{
        for (let i = 0; i < inputsCrear.length; i++) {
            const element = inputsCrear[i].value;

            if (element === "") {
                arrayVacio.push(element);
            }
            
        }
        if (arrayVacio.length) {
            setToolText("TENÉS QUE LLENAR EL FORMULARIO.")
            setTooltip(tooltip + 1)
                setTimeout(() => {
                    setTooltip(tooltip + 2)
                }, 2500);
        }else{
            createFunction(nombre, email, contrseña);
            setToolText("USUARIO CREADO EXITOSAMENTE.")
            setTooltip(tooltip + 1)
                setTimeout(() => {
                    setTooltip(tooltip + 2)
                }, 2500);
        }
    }

}

export default checkUser;