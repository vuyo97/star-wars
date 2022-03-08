import React from 'react';
// import clip from './assets/video.gif'; 
import Logo from '../../assets/logo2.png';
import Saber1 from '../../assets/darth.png'; 
import Saber2 from '../../assets/lsaber2.png'; 
import Saber3 from '../../assets/lsaber4.png'; 
import './comp.css';

const Background = () => {
    return(
    <div className="bg">
    <img src={Logo} className='banner' alt="Star Wars Logo" />
    <img src={Saber3} className='lsideSaber' alt="lightsaber" />
    <img src={Saber1} className='mSaber' alt="lightsaber" />
    <img src={Saber2} className='rsideSaber' alt="lightsaber" />
    </div>
    )
}

export default Background;