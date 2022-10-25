import React, { useContext, useEffect, useState } from 'react';
import { Prode } from '../../Context/prodeData';
import './styles.css';
import FadeLoader from "react-spinners/FadeLoader";
import habilitarUser from '../Utils/habilitarUser';
import getAllPuntajes from '../Utils/getAllPuntajes';


const Admin = () => {

    const { allPuntajes, setAllPuntajes } = useContext(Prode);
    const [habilitar, setHabilitar] = useState(0);

    const changeStatus = (userId) =>{
        habilitarUser(userId);
        setHabilitar(habilitar+1)
    }


    useEffect(() => {
        getAllPuntajes(setAllPuntajes)
    }, [changeStatus])
    

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
                                            <li className={`subItemHabil status ${usuario.habilitado===true?"ok":"no"}`}>{usuario.habilitado===true?"OK":"NO"}</li>
                                            <li className='subItemHabil btn' onClick={()=>changeStatus(usuario.uid)}>
                                                <div className={`btnHabilitar ${usuario.habilitado===true?"ok":"no"}`}></div>
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