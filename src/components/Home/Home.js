import React from 'react';
import './Home.css';

import { AppBody } from '../Body/Body';

import { Link } from 'react-router-dom';

export const Home = () => {
    return (
        <AppBody className="page page--home">
            <p>THIS IS THE CONTENT OF THE BODY.</p>
            <Link to="/new">
                Create new
            </Link>
        </AppBody>
    );
}