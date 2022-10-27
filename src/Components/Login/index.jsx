import React, { useContext, useState } from 'react';
import './styles.css';
import { Prode } from '../../Context/prodeData';
import crearUsuario from '../Utils/crearUsuario';
import iniciarSesion from '../Utils/iniciarSesion';
import cerrarSesion from '../Utils/cerrarSesion';
import recuperarPass from '../Utils/recuperarPass';

const Login = (props) => {

    const setUserID = props.userID;

    const { userLogged, setUserLogged, setPrediccionActual, setPuntajesAct, setPuntajeTotal, userInfo, setUserInfo, setTooltip, setToolText, tooltip, equiposFem, equiposMasc } = useContext(Prode);



    const [gender, setGender] = useState("");
    const elegirGenero = () =>{
        let genero = document.getElementById('userGender').value;
        setGender(genero);
    }


    return (
        <form id='loginContainer'>
            {
                userLogged !== "" ?
                    <>
                        <h2>BIENVENIDO/A, {userInfo.nombre ? userInfo.nombre.toUpperCase() : null}! </h2>
                        <div className="btnFiltro" onClick={() => cerrarSesion(setUserLogged, setUserID,
                            setPrediccionActual, setPuntajesAct, setPuntajeTotal, setUserInfo)}>Log Out</div>
                    </>
                    :
                    <>
                        {/* <h4>NO TENÉS USUARIO?</h4> */}
                        <h2>CREA UN USUARIO</h2>
                        <label>Nombre</label>
                        <input id='userName' type="name" placeholder='Nombre' className='inputProde'/>
                        <label>Apellido</label>
                        <input id='userLastName' type="name" placeholder='Apellido' className='inputProde'/>
                        <label>Email</label>
                        <input id='userEmail' type="email" placeholder='Email' className='inputProde'/>
                        <label>D.N.I.</label>
                        <input id='userDNI' type="number" placeholder='DNI' className='inputProde'/>
                        <label>Sexo</label>
                        <select name='gender' id="userGender" className='selectProde' onChange={()=>elegirGenero()}>
                            <option value="">Seleccione su sexo</option>
                            <option value="M">Masculino</option>
                            <option value="F">Femenino</option>
                        </select>
                        <label>Equipo</label>
                        <select name="team" id="userTeam" className='selectProde'>
                            {
                                gender === "M"?
                                equiposMasc.map(equipo =>{
                                    return <option key={equipo} value={equipo}>{equipo}</option>
                                })
                                :
                                gender === "F"?
                                equiposFem.map(equipo =>{
                                    return <option key={equipo} value={equipo}>{equipo}</option>
                                })
                                :
                                <option value="">Primero seleccione su sexo</option>
                            }
                        </select>
                        <label>Contraseña</label>
                        <input id='userPass' type="password" placeholder='Contraseña' className='inputProde'/>
                        <button className="btnFiltro" onClick={() => crearUsuario()}>Crear</button>

                            <h4>YA TENÉS USUARIO?</h4>
                        <h2>INICIÁ SESIÓN</h2>
                        <label>Email</label>
                        <input id='loginEmail' type="email" placeholder='Email' className='inputProde'/>
                        <label>Contraseña</label>
                        <input id='loginPass' type="password" placeholder='Contraseña' className='inputProde'/>
                        <button className="btnFiltro" onClick={() => iniciarSesion(setTooltip, tooltip, setToolText)}>Ingresar</button>

                            <h4>TE OLVIDASTE LA CONTRASEÑA?</h4>
                        <h2>RECUPERÁ TU CONTRASEÑA</h2>
                        <label>Email</label>
                        <input id='recuperarEmail' type="email" placeholder='Email' className='inputProde'/>
                        <button className="btnFiltro" onClick={() => recuperarPass(setToolText, setTooltip, tooltip)}>Recuperar</button>
                    </>



            }

        </form>
    )
}

export default Login