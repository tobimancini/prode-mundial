import React, { useContext, useEffect, useState } from 'react'
import { Prode } from '../../Context/prodeData';
import getMatchScore from '../Utils/getMatchScore';
import sortPrediccion from '../Utils/sortPrediccion';
import './styles.css'
import { ImCross } from 'react-icons/im';


const ModalPrediccion = () => {

    const { allPuntajes,setModalPredic,  modalPredic, usuarioElegido, userLogged, prediccionActual, banderas, database } = useContext(Prode);

    const [prediccionUser, setPrediccionUser] = useState([]);
    const [ordenarPredic, setOrdenarPredic] = useState([]);

    const [userPicked, setUserPicked] = useState({});

    const getUserPrediction = () => {
        let usuario = [];
        for (let i = 0; i < allPuntajes.length; i++) {
            const user = allPuntajes[i];
            if (user.uid === usuarioElegido) {
                usuario.push(user)
            }
        }
        setUserPicked(usuario[0]);
        let partidosConPuntos = [];
        let prediccionTotalUser = Object.entries(usuario[0].prediccion);
        for (let i = 0; i < prediccionTotalUser.length; i++) {
            const partido = prediccionTotalUser[i];
            if (!partido[1].ptsTotal === false) {
                partidosConPuntos.push(partido);
            }

        }
        setPrediccionUser(partidosConPuntos)
    }

    useEffect(() => {
        getUserPrediction()
    }, [usuarioElegido])

    useEffect(() => {
        // console.log(prediccionUser);
        if (prediccionUser.length > 0) {
            prediccionUser.forEach(element => {
                console.log(element[0]);
                console.log(element[1].ptsTotal);
            });
        }
    }, [prediccionUser])

    useEffect(() => {
        sortPrediccion(prediccionUser, setOrdenarPredic);
    }, [prediccionActual, allPuntajes])


    //getuserPrediction
    //el userPicked es el usuario con toda su info
    // el prediccionUser es la prediccion de ese usuario . un array con [0] el id, y con [1] la prediccion

    return (
        <div className='bgModal'>
            <div className='modalPrediccion'>
                {
                    userPicked != {} ?
                        <h3>{userPicked.nombre ? userPicked.nombre.toUpperCase() : userPicked.nombre}: </h3>
                        :
                        null

                }
                {
                    ordenarPredic.length !== 0 && allPuntajes.length > 0 && prediccionUser ?

                        ordenarPredic.map(partido => {

                            return <div className='predPartido' key={partido[1][0]}>
                                <div className='prediccionMiddle'>
                                    <img src={process.env.PUBLIC_URL + banderas[database[partido[1][0]].local]} alt={database[partido[1][0]].local} />
                                    <p className='predicData'> {database[partido[1][0]].loc} {partido[1][0].local} vs {partido[1][0].visitante} {database[partido[1][0]].vis}</p>
                                    <img src={process.env.PUBLIC_URL + banderas[database[partido[1][0]].visitante]} alt={database[partido[1][0]].visitante} />
                                </div>
                                <p className='puntos'>{!userPicked.prediccion[partido[1][0]].ptsTotal ? (userPicked.prediccion[partido[1][0]].ptsTotal == 0 ? "0" : "-")
                                    : userPicked.prediccion[partido[1][0]].ptsTotal} pts</p>
                            </div>

                        })

                        :

                        null
                }
                <ImCross className='cerrarModal' onClick={()=>setModalPredic(false)} />
            </div>
        </div>
    )
}

export default ModalPrediccion