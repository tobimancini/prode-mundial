import React, { useContext, useState, useEffect } from 'react';
import './styles.css';
import { Prode } from '../../Context/prodeData';
import crearUsuario from '../Utils/crearUsuario';
import iniciarSesion from '../Utils/iniciarSesion';
import cerrarSesion from '../Utils/cerrarSesion';
import recuperarPass from '../Utils/recuperarPass';
import equiposPorSexo from '../Utils/equiposPorSexo';
import { FadeLoader } from 'react-spinners';
import compararResultados from '../Utils/compararResultados';

const Login = (props) => {

    const setUserID = props.userID;

    const { userLogged, setUserLogged, setPrediccionActual, setPuntajesAct, setPuntajeTotal, userInfo, setUserInfo, setTooltip, setToolText, tooltip, equiposFem,
        equiposMasc, jaulero, setJaulero, gender, setGender, allPuntajes, setAllPuntajes, equiposUser, setEquiposUser, setLoaderOn, loaderOn, campeon, goleador } = useContext(Prode);


    const [loginStage, setLoginStage] = useState("login");

    // const juegaJaula = () => {
    //     let jaula = document.getElementById('userJaula').value;
    //     setJaulero(jaula);
    // }


    const elegirGenero = () => {
        let genero = document.getElementById('userGender').value;
        setGender(genero);
    }

    const [posicionIndividual, setPosicionIndividual] = useState(0);
    const [posicionGrupal, setPosicionGrupal] = useState(0);

    const getTeamPosition = async () => {
        let posicion = 0;
        if (userInfo.equipo) {
            for (let i = 0; i < equiposUser.length; i++) {
                const equipo = equiposUser[i];
                if (equipo[1] === userInfo.equipo) {

                    posicion = i + 1 + " º";

                }
            }
            setPosicionGrupal(posicion);
        }

    }

    useEffect(() => {
        let posicion = -1;
        for (let i = 0; i < allPuntajes.length; i++) {
            const user = allPuntajes[i];
            if (user.uid === userInfo.uid) {
                posicion = i;
            }
        }
        setPosicionIndividual(posicion + 1 + " º");
        // getTeamPosition();
        equiposPorSexo(userInfo.sexo, allPuntajes, setEquiposUser)

        if (userInfo.nombre) {
            setLoaderOn(false);
        }
        // console.log(allPuntajes);
    }, [userInfo, allPuntajes]);

    useEffect(() => {
        getTeamPosition();
    }, [equiposUser]);

    const getCreateUser = () => {
        document.getElementById('loginEmail').addEventListener('input', (e) => {
            if (e.target.value === "crearUser123") {
                setLoginStage("crear")
            }
            console.log(e.target.value);
        })
    }

    const [jaula, setJaula] = useState(true);

    return (
        <form id='loginContainer'>
            {
                userInfo.nombre ?
                    <>
                        <h2 onClick={() => compararResultados()}>MI PERFIL</h2>

                        <div className='predPartido data'>
                            <p className='title'>Nombre: </p>
                            <p className='info'>{userInfo.nombre.toUpperCase()} {userInfo.apellido.toUpperCase()}</p>
                        </div>
                        {
                            userInfo.equipo !== "" ?
                                <div className='predPartido data'>
                                    <p className='title'>Equipo: </p>
                                    <p className='info'>{userInfo.equipo.toUpperCase()}</p>
                                </div>
                                :
                                null
                        }
                        <div className='predPartido data'>
                            <p className='title'>Puntos: </p>
                            <p className='info'>{userInfo.puntajeActual} pts</p>
                        </div>
                        <div className='predPartido data'>
                            <p className='title'>Tu posición:</p>
                            <p className='info'>
                                {userInfo.posicion === "" ? "" : userInfo.posicion + " º"}
                            </p>
                        </div>
                        {
                            userInfo.equipo !== "" ?
                                <div className='predPartido data'>
                                    <p className='title'>{userInfo.equipo}:</p>
                                    <p className='info' >
                                        {userInfo.posicionEquipo === "" ? "" : userInfo.posicionEquipo + " º"}
                                    </p>
                                </div>
                                :
                                null
                        }
                        <div className='predPartido data'>
                            <p className='title'>Campeón elegido:</p>
                            <p className='info' >
                                {campeon.toUpperCase()}
                            </p>
                        </div>
                        <div className='predPartido data'>
                            <p className='title'>Goleador elegido:</p>
                            <p className='info' >
                                {goleador.toUpperCase()}
                            </p>
                        </div>
                        <div className="btnFiltro" onClick={() => cerrarSesion(setUserLogged, setUserID,
                            setPrediccionActual, setPuntajesAct, setPuntajeTotal, setUserInfo)}>Log Out</div>

                    </>
                    :
                    <>
                        {
                            loginStage === "login" ?
                                <>
                                    <h2>INICIÁ SESIÓN</h2>
                                    <label>Email</label>
                                    <input id='loginEmail' type="email" placeholder='Email' className='inputProde' onKeyDown={() => getCreateUser()} />
                                    <label>Contraseña</label>
                                    <input id='loginPass' type="password" placeholder='Contraseña' className='inputProde' />
                                    <button className="btnFiltro" onClick={() => iniciarSesion(setTooltip, tooltip, setToolText, false, setLoaderOn)}>Ingresar</button>
                                    <div className='preguntas'>
                                        {/* <h4 className='pregunta'>TODAVÍA NO TE HICISTE UN USUARIO?</h4>
                                        <div className='btnFiltro' onClick={() => setLoginStage("crear")}>Crear usuario</div> */}
                                        <h4 className='pregunta'>TE OLVIDASTE LA CONTRASEÑA?</h4>
                                        <div className='btnFiltro' onClick={() => setLoginStage("recuperar")}>Recuperar contraseña</div>
                                    </div>


                                </>
                                :
                                loginStage === "crear" ?
                                    <>
                                        <h2>CREÁ UN USUARIO</h2>
                                        <label>Nombre</label>
                                        <input id='userName' type="text" placeholder='Nombre' className='inputProde crearUsuario' />
                                        <label>Apellido</label>
                                        <input id='userLastName' type="text" placeholder='Apellido' className='inputProde crearUsuario' />
                                        <label>Email</label>
                                        <input id='userEmail' type="email" placeholder='Email' className='inputProde crearUsuario' />
                                        <label>D.N.I.</label>
                                        <input id='userDNI' type="number" placeholder='DNI' className='inputProde crearUsuario' />
                                        <label>Jaula</label>
                                        <select name='jaula' id="jaulaPlayer" className='selectProde crearUsuario' onChange={() => setJaula(jaula===true?false:true)}>
                                            <option value={true}>Si</option>
                                            <option value={false}>No</option>
                                        </select>
                                        <label>Sexo</label>
                                        {
                                            jaula === true ?
                                                <>
                                                    <select name='gender' id="userGender" className='selectProde crearUsuario' onChange={() => elegirGenero()}>
                                                        <option value="">Seleccione su sexo</option>
                                                        <option value="M">Masculino</option>
                                                        <option value="F">Femenino</option>
                                                    </select>
                                                    <label>Equipo</label>
                                                    <select name="team" id="userTeam" className='selectProde crearUsuario'>
                                                        {
                                                            gender === "M" ?
                                                                equiposMasc.map(equipo => {
                                                                    return <option key={equipo} value={equipo}>{equipo}</option>
                                                                })
                                                                :
                                                                gender === "F" ?
                                                                    equiposFem.map(equipo => {
                                                                        return <option key={equipo} value={equipo}>{equipo}</option>
                                                                    })
                                                                    :
                                                                    <option value="">Primero seleccione su sexo</option>
                                                        }
                                                    </select>
                                                </>
                                                :
                                                null
                                        }

                                        <label>Contraseña</label>
                                        <input id='userPass' type="password" placeholder='Contraseña' className='inputProde crearUsuario' />
                                        <button className="btnFiltro" onClick={() => crearUsuario(setToolText, setTooltip, tooltip)}>Crear</button>
                                        <div className='preguntas'>
                                            <h4 className='pregunta'>YA TENÉS USUARIO?</h4>
                                            <div className='btnFiltro' onClick={() => setLoginStage("login")}>Iniciá sesión</div>
                                            <h4 className='pregunta'>TE OLVIDASTE LA CONTRASEÑA?</h4>
                                            <div className='btnFiltro' onClick={() => setLoginStage("recuperar")}>Recuperar contraseña</div>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <h2>RECUPERÁ TU CONTRASEÑA</h2>
                                        <label>Email</label>
                                        <input id='recuperarEmail' type="email" placeholder='Email' className='inputProde' />
                                        <button className="btnFiltro" onClick={() => recuperarPass(setToolText, setTooltip, tooltip)}>Recuperar</button>
                                        <div className='preguntas'>
                                            <h4 className='pregunta'>YA TENÉS USUARIO?</h4>
                                            <div className='btnFiltro' onClick={() => setLoginStage("login")}>Iniciá sesión</div>
                                            {/* <h4 className='pregunta'>TODAVÍA NO TE HICISTE UN USUARIO?</h4>
                                            <div className='btnFiltro' onClick={() => setLoginStage("crear")}>Recuperar contraseña</div> */}
                                        </div>
                                    </>

                        }

                    </>



            }

            {
                loaderOn === true ?
                    <div className='loaderContain'>
                        <FadeLoader className='loader' color={'#fff'} loading={true} size={10} aria-label="Loading Spinner" data-testid="loader" />
                    </div>
                    :
                    null
            }

        </form>
    )
}

export default Login