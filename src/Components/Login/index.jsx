import React, { useContext } from 'react';
import './styles.css';
import { Prode } from '../../Context/prodeData';
import crearUsuario from '../Utils/crearUsuario';
import iniciarSesion from '../Utils/iniciarSesion';
import cerrarSesion from '../Utils/cerrarSesion';
import recuperarPass from '../Utils/recuperarPass';

const Login = (props) => {

    const setUserID = props.userID;

    const { userLogged, setUserLogged, setPrediccionActual, setPuntajesAct, setPuntajeTotal, userInfo, setUserInfo, setTooltip, setToolText, tooltip } = useContext(Prode);


    return (
        <form id='loginContainer'>
            {
                userLogged !== "" ?
                    <>
                        <h3>Bienvenido, {userInfo.nombre ? userInfo.nombre.toUpperCase() : null}! </h3>
                        <div className="btnFiltro" onClick={() => cerrarSesion(setUserLogged, setUserID,
                            setPrediccionActual, setPuntajesAct, setPuntajeTotal, setUserInfo)}>Log Out</div>
                    </>
                    :
                    <>
                        <h4>NO TENÉS USUARIO?</h4>
                        <h2>CREATE UN USUARIO</h2>
                        <label>Nombre Completo</label>
                        <input id='userName' type="name" placeholder='Nombre Completo' />
                        <label>Email</label>
                        <input id='userEmail' type="email" placeholder='Email' />
                        <label>D.N.I.</label>
                        <input id='userDNI' type="number" placeholder='DNI' />
                        <label>Contraseña</label>
                        <input id='userPass' type="password" placeholder='Contraseña' />
                        <button className="btnFiltro" onClick={() => crearUsuario()}>Crear</button>

                            <h4>YA TENÉS USUARIO?</h4>
                        <h2>INICIÁ SESIÓN</h2>
                        <input id='loginEmail' type="email" placeholder='Email' />
                        <input id='loginPass' type="password" placeholder='Contraseña' />
                        <button className="btnFiltro" onClick={() => iniciarSesion(setTooltip, tooltip, setToolText)}>Ingresar</button>

                            <h4>TE OLVIDASTE LA CONTRASEÑA?</h4>
                        <h2>RECUPERÁ TU CONTRASEÑA</h2>
                        <input id='recuperarEmail' type="email" placeholder='Email' />
                        <button className="btnFiltro" onClick={() => recuperarPass(setToolText, setTooltip, tooltip)}>Recuperar</button>
                    </>



            }

        </form>
    )
}

export default Login