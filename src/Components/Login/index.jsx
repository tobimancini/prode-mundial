import React, { useContext, useEffect, useState } from 'react';
import { getAuth, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut, onAuthStateChanged } from "firebase/auth";
import './styles.css';
import { auth, db } from '../../Firebase/config';
import { addDoc, collection } from 'firebase/firestore';
import checkUser from '../Utils/checkUser';
import newUser from '../Utils/newUser';
import { async } from '@firebase/util';
import { Prode } from '../../Context/prodeData';
import getPredictionDB from '../Utils/getPredictionDB';
import setPuntos from '../Utils/setPuntos';
import crearUsuario from '../Utils/crearUsuario';
import iniciarSesion from '../Utils/iniciarSesion';
import cerrarSesion from '../Utils/cerrarSesion';

const Login = (props) => {

    const setUserID = props.userID;

    const { userLogged, setUserLogged, setPrediccionActual, setPuntajesAct, setPuntajeTotal, userInfo, setUserInfo } = useContext(Prode);

    return (
        <form id='loginContainer'>
            {
                userLogged === "" ?
                    <>
                        <h2>Crear usuario</h2>
                        <label>Nombre Completo</label>
                        <input id='userName' type="name" placeholder='Nombre Completo' />
                        <label>Email</label>
                        <input id='userEmail' type="email" placeholder='Email' />
                        <label>D.N.I.</label>
                        <input id='userDNI' type="number" placeholder='DNI' />
                        <label>Contraseña</label>
                        <input id='userPass' type="password" placeholder='Contraseña' />
                        <button className="btnFiltro" onClick={() => crearUsuario()}>Crear</button>

                        <h2>Log in</h2>
                        <input id='loginEmail' type="email" placeholder='Email' />
                        <input id='loginPass' type="password" placeholder='Contraseña' />
                        <button className="btnFiltro" onClick={() => iniciarSesion()}>Ingresar</button>
                    </>
                    :
                    <>
                        <h3>Bienvenido, {userInfo.nombre.toUpperCase()}! </h3>
                        <div className="btnFiltro" onClick={() => cerrarSesion(setUserLogged, setUserID,
                             setPrediccionActual, setPuntajesAct, setPuntajeTotal, setUserInfo)}>Log Out</div>
                    </>
            }

        </form>
    )
}

export default Login