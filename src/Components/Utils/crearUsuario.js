import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase/config";
import checkUser from "./checkUser";
import newUser from "./newUser";

const crearUsuario = async () => {
    const userCreate = document.querySelector('#loginContainer');
    userCreate.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = userCreate['userEmail'].value;
        const contraseña = userCreate['userPass'].value;
        const nombre = userCreate['userName'].value;
        const dni = userCreate['userDNI'].value;


        const registerWithEmailAndPassword = async (nombre, email, contraseña) => {
            try {
                const res = await createUserWithEmailAndPassword(auth, email, contraseña);
                const user = res.user;
                newUser(dni, nombre, email, user);
                userCreate.reset();
            } catch (err) {
                console.error(err);
            }
        };

        checkUser(email, nombre, contraseña, registerWithEmailAndPassword);

    })
}

export default crearUsuario;