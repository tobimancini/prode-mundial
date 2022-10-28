import React, { useContext, useEffect, useState } from 'react'
import { Prode } from '../../Context/prodeData';
import getMatchScore from '../Utils/getMatchScore';
import sortPrediccion from '../Utils/sortPrediccion';
import './styles.css'
import { ImCross } from 'react-icons/im';
import FadeLoader from "react-spinners/FadeLoader";


const ModalPrediccion = () => {

    const { allPuntajes, setModalPredic, modalPredic, usuarioElegido, userLogged, prediccionActual, banderas, database, setUsuarioElegido, setEquipoElegido,
        equipoElegido, tipoIdElegido, equiposUser, pageState } = useContext(Prode);

    const [prediccionUser, setPrediccionUser] = useState([]);
    const [ordenarPredic, setOrdenarPredic] = useState([]);
    const [ordenarUsers, setOrdenarUsers] = useState([]);

    const [userPicked, setUserPicked] = useState({});
    const [teamUsers, setTeamUsers] = useState([])

    const closeModalPrediccion = () => {
        setModalPredic(modalPredic % 2 === 1 ? 2 : 1);
        setOrdenarPredic([]);
    }

    const getUserPrediction = () => {
        let usuario = [];

        for (let i = 0; i < allPuntajes.length; i++) {
            const user = allPuntajes[i];
            if (user.uid === usuarioElegido) {
                usuario.push(user)
            }
        }
        let partidosConPuntos = [];
        let prediccionTotalUser = Object.entries(usuario[0].prediccion);
        for (let i = 0; i < prediccionTotalUser.length; i++) {
            const partido = prediccionTotalUser[i];
            if (!partido[1].ptsTotal === false) {
                partidosConPuntos.push(partido);
            }

        }
        setPrediccionUser(partidosConPuntos)
        setUserPicked(usuario[0]);
    }

    const getTeamUsers = () => {
        let usuarios = [];
        for (let i = 0; i < allPuntajes.length; i++) {
            const user = allPuntajes[i];
            if (user.equipo === equipoElegido) {
                usuarios.push(user)
            }
        }
        setTeamUsers(usuarios);
    }

    useEffect(() => {
        if (usuarioElegido !== "" && tipoIdElegido === "usuario") {
            getUserPrediction()
        }
        if (equipoElegido !== "" && tipoIdElegido === "equipo") {
            getTeamUsers();
        }

    }, [usuarioElegido, equipoElegido])

    useEffect(() => {
        if (usuarioElegido !== "" && tipoIdElegido === "usuario") {
            sortPrediccion(prediccionUser, setOrdenarPredic, true);
        }
        if (equipoElegido !== "" && tipoIdElegido === "equipo") {
            sortPrediccion(teamUsers, setOrdenarUsers, "equipo");
        }
        console.log(prediccionUser);
    }, [prediccionActual, allPuntajes, userPicked, teamUsers, usuarioElegido, tipoIdElegido, pageState])



    //getuserPrediction
    //el userPicked es el usuario con toda su info
    // el prediccionUser es la prediccion de ese usuario . un array con [0] el id, y con [1] la prediccion

    return (
        <div className={`bgModal ${modalPredic % 2 === 0 ? "inactive" : "active"}`}>
            {
                tipoIdElegido === "usuario" ?

                    !ordenarPredic.length ?
                        <div className='loaderContain'>
                            <FadeLoader className='loader' color={'#edebeb'} loading={true} size={10} aria-label="Loading Spinner" data-testid="loader" />
                        </div>
                        :

                        <div className={`modalPrediccion ${modalPredic % 2 === 0 ? "inactive" : "active"}`}>
                            {
                                userPicked != {} ?
                                    <h3>PREDICCIÓN DE {userPicked.nombre ? `${userPicked.nombre.toUpperCase()} ${userPicked.apellido.toUpperCase()}` : null } </h3>
                                    :
                                    null

                            }
                            {
                                ordenarPredic.length ?
                                    ordenarPredic.map(partido => {
                                        return <div className='predPartido' key={partido[1][0]}>
                                            <div className='prediccionMiddle'>
                                                <img src={process.env.PUBLIC_URL + banderas[database[partido[1][0]].local]} alt={database[partido[1][0]].local} />
                                                <p className='predicData'> {database[partido[1][0]].loc} {partido[1][1].local} vs {partido[1][1].visitante} {database[partido[1][0]].vis}</p>
                                                <img src={process.env.PUBLIC_URL + banderas[database[partido[1][0]].visitante]} alt={database[partido[1][0]].visitante} />
                                            </div>
                                            <p className='puntos'>{!userPicked.prediccion[partido[1][0]].ptsTotal ? (userPicked.prediccion[partido[1][0]].ptsTotal == 0 ? "0" : "-")
                                                : userPicked.prediccion[partido[1][0]].ptsTotal} pts</p>
                                        </div>

                                    })

                                    :

                                    null
                            }
                            <ImCross className='cerrarModal' onClick={() => closeModalPrediccion()} />
                        </div>
                    :
                    !ordenarUsers.length ?
                        <div className='loaderContain'>
                            <FadeLoader className='loader' color={'#edebeb'} loading={true} size={10} aria-label="Loading Spinner" data-testid="loader" />
                        </div>
                        :

                        <div className={`modalPrediccion ${modalPredic % 2 === 0 ? "inactive" : "active"}`}>
                            {
                                teamUsers.length > 0 ?
                                    <h3>USUARIOS DE {equipoElegido.toUpperCase()}: </h3>
                                    :
                                    null

                            }
                            {
                                ordenarUsers.length ?
                                    teamUsers.map(user => {
                                        return <div className='predPartido' key={user.uid}>
                                            <div className='prediccionMiddle'>
                                                <img src={process.env.PUBLIC_URL + banderas[user.equipo]}  />
                                                <p className='predicData'>{user.nombre.toUpperCase()} {user.apellido.toUpperCase()} </p>
                                                {/* <img src={process.env.PUBLIC_URL + banderas[database[partido[1][0]].visitante]} alt={database[partido[1][0]].visitante} /> */}
                                            </div>
                                            <p className='puntos'>{user.puntajeActual} pts</p>
                                        </div>

                                    })

                                    :

                                    null
                            }
                            <ImCross className='cerrarModal' onClick={() => closeModalPrediccion()} />
                        </div>
            }
        </div>
    )
}

export default ModalPrediccion