import React from 'react';

import { List } from 'phosphor-react';

import './styles.css';

function Navbar() {
    return (
        <div className='navbar'>
            <h1 className='logo'>CRUD COMMERCE</h1>

            <nav>
                <a href='/'>CLIENTE</a>
                <a href='/conteiner'>CONTÊINER</a>
                <a href='/movimentacao'>MOVIMENTAÇÃO</a>
            </nav>

            <List className='menuButton' color='#fff' size={45}/>
        </div>
    )
}

export default Navbar;