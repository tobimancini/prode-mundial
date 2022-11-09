import React from 'react';
import './styles.css';

const Home = () => {
    return (
        <div className='homeContainer'>
            <div className='logoTitle'>
                <h1>PRODE QATAR</h1>
            </div>
            <img src={process.env.PUBLIC_URL + "/images/cruyff.jpg"} alt="maradona" className='maradona'/>
            <img src={process.env.PUBLIC_URL + "/images/logoJaula.png"} alt="logoJaula" className='logoJaula'/>
            <span className='coverImg'></span>
        </div>
    )
}

export default Home