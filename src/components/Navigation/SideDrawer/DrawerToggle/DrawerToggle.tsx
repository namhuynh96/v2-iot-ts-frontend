import React from 'react';

import classes from './DrawerToggle.module.css';

interface DrawerToggleProps {
    clicked: () => void;
}

const DrawerToggle: React.FC<DrawerToggleProps> = props => {
    return (
        <div className={classes.DrawerToggle} onClick={props.clicked} >
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
};

export default DrawerToggle;