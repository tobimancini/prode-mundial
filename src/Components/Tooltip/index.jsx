import React, { useContext } from 'react'
import { Prode } from '../../Context/prodeData';
import './styles.css'

const Tooltip = () => {

    const { tooltip, setTooltip, toolText, setToolText } = useContext(Prode)

    const parImpar = (num) => { return num % 2; }

    return (
        <>
            {
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

            }
        </>
    )
}

export default Tooltip