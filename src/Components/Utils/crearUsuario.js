import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase/config";
import checkUser from "./checkUser";
import newUser from "./newUser";

const crearUsuario = async (setToolText, setTooltip, tooltip) => {
    const userCreate = document.querySelector('#loginContainer');
    userCreate.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = userCreate['userEmail'].value;
        const contraseña = userCreate['userPass'].value;
        const nombre = userCreate['userName'].value;
        const apellido = userCreate['userLastName'].value;
        const dni = userCreate['userDNI'].value;
        const jaula = userCreate['jaulaPlayer'].value;

        let sexo ;
        let equipo ;

        if (jaula === true) {
            sexo = userCreate['userGender'].value;
            equipo = userCreate['userTeam'].value;
        }


        const registerWithEmailAndPassword = async (nombre, email, contraseña) => {
            try {
                const res = await createUserWithEmailAndPassword(auth, email, contraseña);
                const user = res.user;
                console.log(user);
                newUser(dni, nombre, email, user, apellido, sexo, equipo, jaula);
                userCreate.reset();
            } catch (err) {
                console.error(err);
            }
        };

        checkUser(email, nombre, contraseña, registerWithEmailAndPassword, setToolText, setTooltip, tooltip);

    })
}

export default crearUsuario;