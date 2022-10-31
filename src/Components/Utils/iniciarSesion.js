import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase/config";

const iniciarSesion = async (setTooltip, tooltip, setToolText, tof, setLoaderOn) => {
    const userCreate = document.querySelector('#loginContainer');
    userCreate.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = userCreate['loginEmail'].value;
        const contraseña = userCreate['loginPass'].value;
        const loginWithEmailAndPass = async (email, contraseña) => {
            try {
                const res = await signInWithEmailAndPassword(auth, email, contraseña);
                const user = res.user;
                setLoaderOn(true);
                userCreate.reset();
            } catch (err) {
                if (tof === false) {
                    setToolText('LOS DATOS DEL USUARIO Y/O LA CONTRASEÑA INGRESADA SON INCORRECTOS.')
                    setTooltip(tooltip+1);
                    setTimeout(() => {
                        setTooltip(tooltip+2)
                    }, 4000);
                }
            }
        };

        loginWithEmailAndPass(email, contraseña);
    })

}

export default iniciarSesion;