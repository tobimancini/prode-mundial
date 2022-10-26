import React, { useContext, useEffect, useState } from 'react';
import { Prode } from '../../Context/prodeData';
import './styles.css';
import FadeLoader from "react-spinners/FadeLoader";
import habilitarUser from '../Utils/habilitarUser';
import getAllPuntajes from '../Utils/getAllPuntajes';


const Admin = () => {

    const { allPuntajes, setAllPuntajes } = useContext(Prode);
    const [habilitar, setHabilitar] = useState(0);
    
    const changeColor = (userId, status) =>{
        let btn = document.getElementById(`${userId}btn`);
        let habilitado = document.getElementById(userId);

        if ((status === true && habilitado.innerHTML === "OK")) {
            btn.classList.remove('ok');
            btn.classList.add('no');

            habilitado.classList.remove('ok');
            habilitado.classList.add('no');

            habilitado.innerHTML = "NO";
        }else if ((status === true && habilitado.innerHTML === "NO")) {
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
        }else if ((status === false && habilitado.innerHTML === "OK")) {
            btn.classList.remove('ok');
            btn.classList.add('no');

            habilitado.classList.remove('ok');
            habilitado.classList.add('no');

            habilitado.innerHTML = "NO";
        }
    }

    const changeStatus = (userId, status) => {
        habilitarUser(userId);
        setHabilitar(habilitar + 1);
        changeColor(userId, status);
    }



    return (
        <div className='adminCont'>
            {
                !allPuntajes.length ?
                    <div className='loaderContain'>
                        <FadeLoader className='loader' color={'#edebeb'} loading={true} size={10} aria-label="Loading Spinner" data-testid="loader" />
                    </div>
                    :
                    <>
                        <h2>HABILITACIÓN</h2>
                        <ul className='listaHabil'>
                            {
                                allPuntajes.map(usuario => {
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
                                })
                            }
                        </ul>
                    </>
            }
        </div>
    )
}

export default Admin