import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase/config";
import checkUser from "./checkUser";
import newUser from "./newUser";

const crearUsuario = async (setToolText, setTooltip, tooltip) => {
    const userCreate = document.querySelector('#loginContainer');
    userCreate.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = userCreate['userEmail'].value;
        const email2 = userCreate['userEmail2'];
        const contraseña = userCreate['userPass'].value;
        const contraseña2 = userCreate['userPass2'];
        const nombre = userCreate['userName'].value;
        const apellido = userCreate['userLastName'].value;
        const dni = userCreate['userDNI'].value;
        const jaula = userCreate['jaulaPlayer'].value;

        let sexo;
        let equipo;

        if (jaula === "true") {
            sexo = userCreate['userGender'].value;
            equipo = userCreate['userTeam'].value;
        }

        if (contraseña === contraseña2.value) {
            document.getElementById('userPass2').classList.remove('wrong');
            if (email === email2.value) {
                document.getElementById('userEmail2').classList.remove('wrong');
                const registerWithEmailAndPassword = async (nombre, email, contraseña) => {
                    try {
                        const res = await createUserWithEmailAndPassword(auth, email, contraseña);
                        const user = res.user;
                        newUser(dni, nombre, email, user, apellido, sexo, equipo, jaula);
                        userCreate.reset();
                    } catch (err) {
                        console.error(err);
                    }
                };

                checkUser(email, nombre, contraseña, registerWithEmailAndPassword, setToolText, setTooltip, tooltip);
            } else {
                setToolText('REVISAR QUE COINCIDAN LOS EMAILS')
                setTooltip(tooltip + 1)
                setTimeout(() => {
                    setTooltip(tooltip + 2)
                }, 3000);
                document.getElementById('userEmail2').classList.add('wrong');
            }

        } else {
            setToolText('LAS CONRTASEÑAS NO COINCIDEN')
            setTooltip(tooltip + 1)
            setTimeout(() => {
                setTooltip(tooltip + 2)
            }, 3000);
            document.getElementById('userPass2').classList.add('wrong');
        }

    })
}

export default crearUsuario;