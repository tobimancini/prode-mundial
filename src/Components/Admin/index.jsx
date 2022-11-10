import React, { useContext, useEffect, useState } from 'react';
import { Prode } from '../../Context/prodeData';
import './styles.css';
import FadeLoader from "react-spinners/FadeLoader";
import habilitarUser from '../Utils/usuariosInhab';
import getAllPuntajes from '../Utils/getAllPuntajes';
import enviarResultados from '../Utils/enviarResultados';
import compararResultados from '../Utils/compararResultados';
import usuariosInhab from '../Utils/usuariosInhab';
import habilitar from '../Utils/habilitar';


const Admin = () => {

    const { allPuntajes, setAllPuntajes, allMatches, userInfo, setToolText, setTooltip, tooltip } = useContext(Prode);
    const [equipoLocal, setEquipoLocal] = useState("");
    const [equipoVisitante, setEquipoVisitante] = useState("");
    const [cargando, setCargando] = useState(false);

    const buscadorPartido = () => {
        let local = document.getElementById('locales').value;
        let visitante = document.getElementById('visitantes').value;
        setEquipoLocal(local.toUpperCase());
        setEquipoVisitante(visitante.toUpperCase());

    }

    const [inhabilitados, setInhabilitados] = useState([]);


    return (
        <div className='adminCont'>

            {
                allMatches.length && userInfo ?
                    <>
                        <h2>EDITAR RESULTADOS</h2>
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
                                <div className='btnFiltro' onClick={() => enviarResultados(setCargando, setToolText, setTooltip, tooltip)}>ENVIAR</div>
                                :
                                null
                        }
                        <h2>Actualizar Puntajes</h2>
                        <div className='btnFiltro act' onClick={() => compararResultados(setCargando, setToolText, setTooltip, tooltip)}>Actualizar</div>
                        <h2>HABILITAR USUARIOS</h2>
                        <div className='btnFiltro act' onClick={() => usuariosInhab(setInhabilitados)} >Buscar</div>
                        {
                            inhabilitados.length ?
                                inhabilitados.map((usuario) => {
                                    return <div key={usuario.id + usuario.data.apellido} className='btnFiltro small' onClick={() => habilitar(usuario.ref)}>
                                        HABILITAR {usuario.data.nombre.toUpperCase() + " " + usuario.data.apellido.toUpperCase()}
                                    </div>
                                })
                                :
                                null
                        }
                    </>
                    : null
            }
            {
                cargando === false ?
                    null :
                    <div className="loaderContain">
                        <FadeLoader className='loader' color={'#edebeb'} loading={true} size={5} aria-label="Loading Spinner" data-testid="loader" />
                    </div>
            }
        </div>
    )
}

export default Admin