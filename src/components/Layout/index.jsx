import React from 'react';

import Navbar from '../Navbar';
import AppRoutes from '../../AppRoutes';

import './styles.css';

function Layout() {
    return (
        <div className='container'>
            <div className='wrapper'>
                <Navbar/>
                <AppRoutes/>
            </div>
        </div>
    )
}

export default Layout;