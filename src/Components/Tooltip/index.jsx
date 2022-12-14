import React, { useContext } from 'react'
import { Prode } from '../../Context/prodeData';
import './styles.css'

const Tooltip = () => {

    const { tooltip, setTooltip, toolText, setToolText, loggedOut, setLoggedOut, setPageState } = useContext(Prode)

    const parImpar = (num) => { return num % 2; }

    const iniciarSesionTT = () =>{
        setTooltip(tooltip+1)
        setLoggedOut(false);
        setPageState("perfil")
    }

    return (
        <>
            {
                loggedOut === false?
                tooltip === 0 ?
                    <div className='tooltip'>
                        <p onClick={() => setTooltip(tooltip + 1)}>{toolText.toUpperCase()}</p>
                    </div>
                    :
                    parImpar(tooltip) === 1 ?
                        <div className='tooltip active'>
                            <p onClick={() => setTooltip(tooltip + 1)}>{toolText.toUpperCase()}</p>
                        </div>
                        :
                        <div className='tooltip inactive'>
                            <p onClick={() => setTooltip(tooltip + 1)}>{toolText.toUpperCase()}</p>
                        </div>
                :
                tooltip === 0 ?
                    <div className='tooltip'>
                        <p onClick={() => setTooltip(tooltip + 1)}>{toolText.toUpperCase()}</p>
                    </div>
                    :
                    parImpar(tooltip) === 1 ?
                        <div className='tooltip active' onClick={()=>iniciarSesionTT()}>
                            <p onClick={() => setTooltip(tooltip + 1)}>{toolText.toUpperCase()}</p>
                        </div>
                        :
                        <div className='tooltip inactive'>
                            <p onClick={() => setTooltip(tooltip + 1)}>{toolText.toUpperCase()}</p>
                        </div>

            }
        </>
    )
}

export default Tooltip