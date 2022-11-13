import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../Firebase/config";

const recuperarPass = async (setToolText, setTooltip, tooltip) => {
    const userCreate = document.querySelector('#loginContainer');
    userCreate.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = userCreate['recuperarEmail'].value;

        sendPasswordResetEmail(auth, email)
        .then(() => {
            setToolText('Se envió un email para reestablecer la contraseña.')
            setTooltip(tooltip+1)
            setTimeout(() => {
                setTooltip(tooltip+2)
            }, 4000);
            userCreate.reset();
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });

    })
}

export default recuperarPass;