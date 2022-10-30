import React, { useContext, useEffect, useState } from 'react';
import { Prode } from '../../Context/prodeData';
import './styles.css';
import FadeLoader from "react-spinners/FadeLoader";
import habilitarUser from '../Utils/habilitarUser';
import getAllPuntajes from '../Utils/getAllPuntajes';
import enviarResultados from '../Utils/enviarResultados';


const Admin = () => {

    const { allPuntajes, setAllPuntajes, allMatches } = useContext(Prode);
    const [habilitar, setHabilitar] = useState(0);
    const [nombreBuscado, setNombreBuscado] = useState("");
    const [usuariosOrd, setUsuariosOrd] = useState([]);
    const [equipoLocal, setEquipoLocal] = useState("");
    const [equipoVisitante, setEquipoVisitante] = useState("");

    const changeColor = (userId, status) => {
        let btn = document.getElementById(`${userId}btn`);
        let habilitado = document.getElementById(userId);

        if ((status === true && habilitado.innerHTML === "OK")) {
            btn.classList.remove('ok');
            btn.classList.add('no');

            habilitado.classList.remove('ok');
            habilitado.classList.add('no');

            habilitado.innerHTML = "NO";
        } else if ((status === true && habilitado.innerHTML === "NO")) {
            btn.classList.add('ok');
            btn.classList.remove('no');

            habilitado.classList.add('ok');
            habilitado.classList.remove('no');

            habilitado.innerHTML = "OK";
        }


        if ((status === false && habilitado.innerHTML === "NO")) {
            btn.classList.add('ok');
            btn.classList.remove('no');

            habilitado.classList.add('ok');
            habilitado.classList.remove('no');

            habilitado.innerHTML = "OK";
        } else if ((status === false && habilitado.innerHTML === "OK")) {
            btn.classList.remove('ok');
            btn.classList.add('no');

            habilitado.classList.remove('ok');
            habilitado.classList.add('no');

            habilitado.innerHTML = "NO";
        }
    }

    const changeStatus = (userId, status) => {
        habilitarUser(userId, setAllPuntajes);
        setHabilitar(habilitar + 1);
        changeColor(userId, status);
    }

    const buscadorHandle = () => {
        let buscador = document.getElementById("buscador").value
        setNombreBuscado(buscador.toUpperCase());
    }

    const buscadorPartido = () => {
        let local = document.getElementById('locales').value;
        let visitante = document.getElementById('visitantes').value;
        setEquipoLocal(local.toUpperCase());
        setEquipoVisitante(visitante.toUpperCase());

    }

    const ordenarUsuarios = (a, b) => {

        if (a.habilitado > b.habilitado) return 1;
        if (a.habilitado < b.habilitado) return -1;

    }

    useEffect(() => {
        let ordenados = allPuntajes.sort(ordenarUsuarios)
        setUsuariosOrd(ordenados);
    }, [allPuntajes])



    return (
        <div className='adminCont'>
            {
                !allPuntajes.length ?
                    <div className='loaderContain'>
                        <FadeLoader className='loader' color={'#edebeb'} loading={true} size={10} aria-label="Loading Spinner" data-testid="loader" />
                    </div>
                    :
                    <>
                        <h2>ADMINISTRACIÓN</h2>
                        <h3>HABILITAR USUARIOS</h3>
                        <input type="text" id="buscador" placeholder='Buscar' className='inputProde' onChange={() => buscadorHandle()} />
                        <div className='tablaCont'>
                            <ul className='listaHabil'>
                                {
                                    allPuntajes.map(usuario => {
                                        if (nombreBuscado === "") {
                                            if (usuario.habilitado === false || usuario.habilitado === true) {
                                                return <ul key={usuario.uid} className="itemHabil">
                                                    <li className='subItemHabil'>{usuario.nombre.toUpperCase()}</li>
                                                    <li id={usuario.uid} className={`subItemHabil status ${usuario.habilitado === true ? "ok" : "no"}`}>
                                                        {usuario.habilitado === true ? "OK" : "NO"}
                                                    </li>
                                                    <li className='subItemHabil btn' onClick={() => changeStatus(usuario.uid, usuario.habilitado)}>
                                                        <div id={`${usuario.uid}btn`} className={`btnHabilitar ${usuario.habilitado === true ? "ok" : "no"}`}></div>
                                                    </li>
                                                </ul>
                                            }
                                        } else if (usuario.nombre.toUpperCase().includes(nombreBuscado, 0)) {
                                            if (usuario.habilitado === false || usuario.habilitado === true) {
                                                return <ul key={usuario.uid} className="itemHabil">
                                                    <li className='subItemHabil'>{usuario.nombre.toUpperCase()}</li>
                                                    <li id={usuario.uid} className={`subItemHabil status ${usuario.habilitado === true ? "ok" : "no"}`}>
                                                        {usuario.habilitado === true ? "OK" : "NO"}
                                                    </li>
                                                    <li className='subItemHabil btn' onClick={() => changeStatus(usuario.uid, usuario.habilitado)}>
                                                        <div id={`${usuario.uid}btn`} className={`btnHabilitar ${usuario.habilitado === true ? "ok" : "no"}`}></div>
                                                    </li>
                                                </ul>
                                            }
                                        }
                                    })
                                }
                            </ul>
                        </div>
                    </>
            }
            {
                allMatches.length ?
                    <>
                        <h3>EDITAR RESULTADOS</h3>
                        <input type="text" id="locales" placeholder='Equipo local' onChange={() => buscadorPartido()} />
                        <input type="text" id="visitantes" placeholder='Equipo visitante' onChange={() => buscadorPartido()} />
                        <div className='tablaCont'>
                            <ul className='listaResultados'>
                                {
                                    equipoLocal !== "" || equipoVisitante !== "" ?
                                        allMatches.map(partido => {
                                            if (partido[1].local.toUpperCase().includes(equipoLocal, 0) && partido[1].visitante.toUpperCase().includes(equipoVisitante, 0)) {
                                                return <li key={partido[0]} className="predPartido">
                                                    <p className='invisible'>{partido[1].partido}</p>
                                                    <p className='textoResultado l'>{partido[1].local.toUpperCase()}</p>
                                                    <div className='selectsResul'>
                                                        <input name="golesL" type="number" className="golesLocal" />
                                                        <p>vs</p>
                                                        <input name="golesV" type="number" className="golesVisitante" />
                                                    </div>
                                                    <p className='textoResultado v'>{partido[1].visitante.toUpperCase()}</p>
                                                </li>
                                            }
                                        })
                                        :
                                        null
                                }
                            </ul>
                        </div>
                        {
                            equipoLocal !== "" || equipoVisitante !== "" ?
                                <div className='btnFiltro' onClick={() => enviarResultados()}>ENVIAR</div>
                                :
                                null
                        }
                    </>
                    : null
            }
        </div>
    )
}

export default Admin