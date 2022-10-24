import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase/config";

const iniciarSesion = async (setTooltip, tooltip) => {
    const userCreate = document.querySelector('#loginContainer');
    userCreate.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = userCreate['loginEmail'].value;
        const contraseña = userCreate['loginPass'].value;
        const loginWithEmailAndPass = async (email, contraseña) => {
            try {
                const res = await signInWithEmailAndPassword(auth, email, contraseña);
                const user = res.user;
                userCreate.reset();
                setTooltip(tooltip + 1)
                setTimeout(() => {
                    setTooltip(tooltip + 2)
                }, 2500);
            } catch (err) {
                console.error(err);
            }
        };

        loginWithEmailAndPass(email, contraseña);
    })

}

export default iniciarSesion;