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

const Login = (props) => {

    const setUserID = props.userID;

    const { userLogged, setUserLogged, setPrediccionActual, prediccionActual, setPuntajesAct, puntajesAct, setPuntajeTotal } = useContext(Prode);


    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserLogged(user.uid);
                setUserID(user.uid);
                getPredictionDB(user.uid, setPrediccionActual, prediccionActual, false);
                setPuntos(user.uid, setPuntajesAct, setPuntajeTotal);

            } else {
                console.log("no user");
            }
        })
    }, [])


    const crearUsuario = async () => {
        const userCreate = document.querySelector('#loginContainer');
        userCreate.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = userCreate['userEmail'].value;
            const contraseña = userCreate['userPass'].value;
            const nombre = userCreate['userName'].value;
            const dni = userCreate['userDNI'].value;

            console.log(email, contraseña, nombre);


            const registerWithEmailAndPassword = async (nombre, email, contraseña) => {
                try {
                    const res = await createUserWithEmailAndPassword(auth, email, contraseña);
                    const user = res.user;
                    newUser(dni, nombre, email, user);
                    userCreate.reset();
                    console.log(`se ha creado el usuario de ${nombre}`);
                } catch (err) {
                    console.error(err);
                    alert(err.message);
                }
            };

            checkUser(email, nombre, contraseña, registerWithEmailAndPassword);

        })
    }

    const iniciarSesion = async () => {
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
                    console.log(`se ha logueado el usuario de ${email}`);
                    // setUserLogged(user.uid);
                } catch (err) {
                    console.error(err);
                    alert(err.message);
                }
            };

            loginWithEmailAndPass(email, contraseña);
        })

    }

    const cerrarSesion = async () => {
        try {
            signOut(auth).then(() => {
                setUserLogged("");
                setUserID("");
            })
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    }

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
                        <button onClick={() => crearUsuario()}>Crear</button>

                        <h2>Log in</h2>
                        <input id='loginEmail' type="email" placeholder='Email' />
                        <input id='loginPass' type="password" placeholder='Contraseña' />
                        <button onClick={() => iniciarSesion()}>Ingresar</button>
                    </>
                    :
                    <>
                        {/* <h2>{userLogged}</h2> */}
                        <div onClick={() => cerrarSesion()}>Log out</div>
                    </>
            }

        </form>
    )
}

export default Login