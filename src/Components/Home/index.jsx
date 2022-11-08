import React from 'react';
import './styles.css';

const Home = () => {
    return (
        <div className='homeContainer'>
            <div className='logoTitle'>
                <h1>PRODE MUNDIAL</h1>
                <img src={process.env.PUBLIC_URL + "/images/logoJaula.png"} alt="logoJaula" className='logoJaula' />
            </div>
            <img src={process.env.PUBLIC_URL + "/images/maradona.jpg"} alt="maradona" className='maradona'/>
            <span className='coverImg'></span>
        </div>
    )
}

export default Home