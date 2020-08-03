import React from 'react';

import earthLogo from '../../assets/images/earthLogo.png';
import classes from './Logo.module.css';

const Logo: React.FC = () => {
    return (
        <div className={classes.Logo} >
            <img src={earthLogo} alt="TheEarth" />
        </div>
    );
}

export default Logo;