import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Backdrop from '@material-ui/core/Backdrop';


import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';

import './Header.css';

export const AppHeader = () => {

    const [ menuOpen, updateMenuOpen ] = useState(false);

    const closeMenu = () => {
        updateMenuOpen(false);
    }
    const openMenu = () => {
        updateMenuOpen(true);
    }

    return (
        <div className="AppHeader">
            <div className="AppHeaderToggle">
                { menuOpen ?
                    <Button onClick={ closeMenu } className="white-btn"><CloseIcon /> Close Menu </Button>
                    :
                    <Button onClick={ openMenu }  color="primary"><MenuIcon /> Open Menu </Button>
                }
            </div>


            <Backdrop className="backdrop" open={ menuOpen } onClick={ closeMenu }>
                <nav>
                    <ul>
                        <li><NavLink to="/" activeClassName="selected">Home</NavLink></li>
                        <li><NavLink to="/combat/new" activeClassName="selected">New combat</NavLink></li>
                    </ul>
                </nav>
            </Backdrop>
        </div>
    );
}