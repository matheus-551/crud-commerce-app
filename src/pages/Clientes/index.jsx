import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';

import axios from 'axios';

import { successMessage, errorMessage} from '../../components/Toast/toast';
import { Plus, Pencil, Trash } from 'phosphor-react';

function Cliente() {
    const [clientes, setClientes] = useState([{}]);
    const URL = 'http://localhost:8080/api/clientes'

    useEffect(() => {
        axios.get(URL)
        .then( response => {
            setClientes(response.data);
        }).catch( error => {
            console.log(error.response.data);
        });
    }, [])

    const deleteCliente = (cliente) => {
        axios.delete(`${URL}/${cliente.id}`)
        .then( response => {
            successMessage("Cliente deletado com sucesso")
        }).catch( error => {
            errorMessage(error.response.data);
        })
    }

    return (
        <div>
            <div className='groupItems'>
                <h1>CLIENTES</h1>
                <Link to="/cadastro-cliente" className='addButton'><Plus/>NOVO CLIENTE</Link>
            </div>
            <div className='containerGrid'>
                {clientes.map((cliente, index) => {
                    return (
                        <div className='card' key={index}>
                            <div className='cardHeader'>
                                <h3>{cliente.nome}</h3>
                            </div>

                            <hr/>

                            <div className='cardFooter'>
                                <Link to={`/cadastro-cliente/${cliente.id}`} className='editButton'><Pencil/>EDITAR</Link>
                                <a className='deleteButton' onClick={() => deleteCliente(cliente)}><Trash/>DELETAR</a>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Cliente;