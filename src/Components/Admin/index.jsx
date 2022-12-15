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
import traerJugador from '../Utils/traerJugador';
import borrarJugador from '../Utils/borrarJugador';
import modificarUser from '../Utils/modificarUser';
import prediccionUser from '../Utils/prediccionUser';
import traerEquipo from '../Utils/traerEquipo';
import sinPredic from '../Utils/sinPredic';
import actualizarDatosUser from '../Utils/actualizarDatosUser';
import resultadoPuntos from '../Utils/resultadoPuntos';


const Admin = () => {

    const { allPuntajes, setAllPuntajes, allMatches, userInfo, setToolText, setTooltip, tooltip, equiposMasc, equiposFem, partidosJugados } = useContext(Prode);
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
    const [jugadoresDelete, setJugadoresDelete] = useState([]);
    const [equiposDelete, setEquiposDelete] = useState([]);
    const [edicion, setEdicion] = useState("");

    const equiposMundial = ["Qatar", "Ecuador", "Senegal", "Holanda", "Inglaterra", "Irán", "Estados Unidos", "Gales", "Argentina", "Arabia Saudita", "México", "Polonia", "Francia",
        "Australia", "Dinamarca", "Túnez", "España", "Costa Rica", "Alemania", "Japón", "Bélgica", "Canadá", "Marruecos", "Croacia", "Brasil", "Serbia", "Suiza",
        "Camerún", "Portugal", "Ghana", "Uruguay", "Corea del Sur"];
    equiposMundial.sort((a, b) => a < b ? -1 : b < a ? 1 : 0);

    const jugadores = ["Lionel Messi", "Cristiano Ronaldo", "Neymar", "Kylian Mbappe", "Harry Kane", "Karim Benzema", "Robert Lewandowski", "Julián Álvarez", "Romelu Lukaku", "Luis Suarez",
    "Gabriel Jesús", "Richarlison", "Vinicius Júnior", "Ángel Di María", "Paulo Dybala", "Bruno Fernandes", "Memphis Depay", "Pedri", "Morata", "Hakimi",
    "Marcus Rashford", "Heung-Min Son", "Al Dawsari", "Kai Havertz", "Thomas Muller", "Joao Félix", "Diogo Jota", "Hirving Lozano", "Timo Werner",
    "Serge Gnabry", "Sané", "Sadio Mané", "Christian Pulisic", "Christian Eriksen", "Lautaro Martinez", "Gareth Bale", "Luka Modric", "Coutinho", "Dusan Tadic"];

    let equipos = [...equiposMasc, ...equiposFem];

    return (
        <div className='adminCont'>

            {
                allMatches.length && userInfo ?
                    userInfo.apellido != "JAULA" ?
                        <>
                            <h2>VER PARTIDOS JUGADOS</h2>
                            <div className='btnFiltro act' onClick={() => console.log(partidosJugados)}>VER PARTIDOS JUGADOS</div>
                            <h2>USUARIOS SIN PREDICCION</h2>
                            <div className='btnFiltro act' onClick={() => sinPredic()}>VER USUARIOS SIN PREDICCION</div>
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
                                    <div className='btnFiltro' onClick={() => resultadoPuntos(setCargando, setToolText, setTooltip, tooltip)}>ENVIAR</div>
                                    :
                                    null
                            }
                            <h2>Actualizar Puntajes</h2>
                            <div className='btnFiltro act' onClick={() => compararResultados(setCargando, setToolText, setTooltip, tooltip)}>Actualizar</div>
                            <h2>Actualizar Datos Usuario</h2>
                            <div className='btnFiltro act' onClick={() => actualizarDatosUser()}>Actualizar</div>
                            
                        </>
                        :

                        null
                    :
                    null
            }

            {
                allMatches.length && userInfo ?
                    <>
                        <h2>BUSCAR POR DNI O APELLIDO</h2>
                        <input type="text" id='usuariosGet' placeholder='Buscar jugador' className='inputBuscar' />
                        <div className='btnFiltro act' onClick={() => traerJugador(setJugadoresDelete)} >Buscar</div>
                        {
                            jugadoresDelete.length ?
                                jugadoresDelete.map((usuario) => {
                                    return <div key={usuario.id + usuario.data.apellido} className='btnFiltro act small'>
                                        <p>{usuario.data.nombre.toUpperCase() + " " + usuario.data.apellido.toUpperCase() + " " + usuario.data.dni} </p>
                                        <div className='tools'>
                                            {
                                                usuario.data.habilitado === false ?
                                                    <div onClick={() => habilitar(usuario.ref)}>Habilitar</div>
                                                    :
                                                    null
                                            }
                                            <div onClick={() => setEdicion(edicion === usuario.id ? "" : usuario.id)}>Editar</div>
                                            <div onClick={() => prediccionUser(usuario.data.uid)}>Prediccion</div>
                                            {
                                                userInfo.apellido !== "JAULA" ?
                                                    <div className='borrar' onClick={() => borrarJugador(usuario.id, usuario.data.uid)}>Borrar</div>
                                                    :
                                                    null
                                            }
                                        </div>
                                        {
                                            edicion === usuario.id ?
                                                <form id="edicionUsuario" >
                                                    <label>Nombre</label>
                                                    <input id='edicionNombre' type="text" placeholder='Nombre' className='inputProde' />
                                                    <label>Apellido</label>
                                                    <input id='edicionApellido' type="text" placeholder='Apellido' className='inputProde' />
                                                    <label>Jaula</label>
                                                    <select name="jaula" id="edicionJaula" className='inputProde'>
                                                        <option value="">Elegir</option>
                                                        <option value="true">Si</option>
                                                        <option value="false">No</option>
                                                    </select>
                                                    <label>Equipo</label>
                                                    <select name="equipos" id="edicionEquipo" className='inputProde'>
                                                        <option value="">Equipo</option>
                                                        {equipos.length ?
                                                            equipos.map((equipo) => {
                                                                return <option key={equipo} value={equipo} >{equipo}</option>
                                                            })
                                                            :
                                                            null
                                                        }
                                                    </select>
                                                    <label>Campeón</label>
                                                    <select name="equiposC" id="edicionCampeon" className='inputProde'>
                                                        <option value="">Campeón</option>
                                                        {equiposMundial.length ?
                                                            equiposMundial.map((equipo) => {
                                                                return <option key={equipo} value={equipo} >{equipo}</option>
                                                            })
                                                            :
                                                            null
                                                        }
                                                    </select>
                                                    <label>Goleador</label>
                                                    <select name="goleador" id="edicionGoleador" className='inputProde'>
                                                        <option value="">Goleador</option>
                                                        {jugadores.length ?
                                                            jugadores.map((jugador) => {
                                                                return <option key={jugador} value={jugador} >{jugador}</option>
                                                            })
                                                            :
                                                            null
                                                        }
                                                    </select>

                                                    <div className='btnFiltro' onClick={() => modificarUser(usuario.ref, usuario.data.uid)}>Guardar cambios</div>
                                                </form>
                                                :
                                                null
                                        }
                                    </div>
                                })
                                :
                                null
                        }
                    </>
                    : null
            }
            {
                allMatches.length && userInfo ?
                    <>
                        <h2>BUSCAR USUARIOS DE UN EQUIPO</h2>
                        <input type="text" id='equiposGet' placeholder='Buscar por equipo' className='inputBuscar' />
                        <div className='btnFiltro act' onClick={() => traerEquipo(setEquiposDelete)} >Buscar</div>
                        {
                            equiposDelete.length ?
                                equiposDelete.map((usuario) => {
                                    return <div key={usuario.id + usuario.data.apellido} className='btnFiltro act small'>
                                        <p>{usuario.data.nombre.toUpperCase() + " " + usuario.data.apellido.toUpperCase() + " " + usuario.data.equipo} </p>
                                        <div className='tools'>
                                            {
                                                usuario.data.habilitado === false ?
                                                    <div onClick={() => habilitar(usuario.ref)}>Habilitar</div>
                                                    :
                                                    null
                                            }
                                            <div onClick={() => setEdicion(edicion === usuario.id ? "" : usuario.id)}>Editar</div>
                                            <div onClick={() => prediccionUser(usuario.data.uid)}>Prediccion</div>
                                            {
                                                userInfo.apellido !== "JAULA" ?
                                                    <div className='borrar' onClick={() => borrarJugador(usuario.id, usuario.data.uid)}>Borrar</div>
                                                    :
                                                    null
                                            }
                                        </div>
                                        {
                                            edicion === usuario.id ?
                                                <form id="edicionUsuario" >
                                                    <label>Nombre</label>
                                                    <input id='edicionNombre' type="text" placeholder='Nombre' className='inputProde' />
                                                    <label>Apellido</label>
                                                    <input id='edicionApellido' type="text" placeholder='Apellido' className='inputProde' />
                                                    <label>Jaula</label>
                                                    <select name="jaula" id="edicionJaula" className='inputProde'>
                                                        <option value="">Elegir</option>
                                                        <option value="true">Si</option>
                                                        <option value="false">No</option>
                                                    </select>
                                                    <label>Equipo</label>
                                                    <select name="equipos" id="edicionEquipo" className='inputProde'>
                                                        <option value="">Equipo</option>
                                                        {equipos.length ?
                                                            equipos.map((equipo) => {
                                                                return <option key={equipo} value={equipo} >{equipo}</option>
                                                            })
                                                            :
                                                            null
                                                        }
                                                    </select>
                                                    <label>Campeón</label>
                                                    <select name="equiposC" id="edicionCampeon" className='inputProde'>
                                                        <option value="">Campeón</option>
                                                        {equiposMundial.length ?
                                                            equiposMundial.map((equipo) => {
                                                                return <option key={equipo} value={equipo} >{equipo}</option>
                                                            })
                                                            :
                                                            null
                                                        }
                                                    </select>
                                                    <label>Goleador</label>
                                                    <select name="goleador" id="edicionGoleador" className='inputProde'>
                                                        <option value="">Goleador</option>
                                                        {jugadores.length ?
                                                            jugadores.map((jugador) => {
                                                                return <option key={jugador} value={jugador} >{jugador}</option>
                                                            })
                                                            :
                                                            null
                                                        }
                                                    </select>

                                                    <div className='btnFiltro' onClick={() => modificarUser(usuario.ref, usuario.data.uid)}>Guardar cambios</div>
                                                </form>
                                                :
                                                null
                                        }
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
        </div >
    )
}

export default Admin