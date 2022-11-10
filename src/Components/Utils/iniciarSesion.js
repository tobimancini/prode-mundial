import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase/config";

const iniciarSesion = async (setTooltip, tooltip, setToolText, tof, setLoaderOn) => {
    const userCreate = document.querySelector('#loginContainer');
    userCreate.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = userCreate['loginEmail'].value;
        const contraseña = userCreate['loginPass'].value;
        setLoaderOn(true);
        const loginWithEmailAndPass = async (email, contraseña) => {
            try {
                const res = await signInWithEmailAndPassword(auth, email, contraseña);
                const user = res.user;
                userCreate.reset();
                setLoaderOn(false);

            } catch (err) {
                if (tof === false) {
                    setToolText('LOS DATOS DEL USUARIO Y/O LA CONTRASEÑA INGRESADA SON INCORRECTOS.')
                    setTooltip(tooltip + 1);
                    setTimeout(() => {
                        setTooltip(tooltip + 2)
                    }, 4000);
                    setLoaderOn(false);

                }
            }
        };

        loginWithEmailAndPass(email, contraseña);
    })

}

export default iniciarSesion;