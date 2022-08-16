import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import axios from 'axios'

import { successMessage, errorMessage } from '../../components/Toast/toast';

function FormCliente() {
    const [cliente, setCliente] = useState({
        id: null,
        nome: ''
    })

    const URL = 'http://localhost:8080/api/clientes'
    const navigate = useNavigate();
    const urlParams = useParams();

    useEffect(() => {
        const params = urlParams.id;

        if(params) {
            axios.get(`${URL}/${params}`)
            .then( response => {
                setCliente(response.data);
            }).catch( error => {
                errorMessage(error.response.data)
            })
        }
    }, [])

    const handleDataChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setCliente(values => ({...values, [name]: value}))
    }

    const createCliente = () => {
        axios.post(URL, cliente)
        .then( response => {
            navigate("/");
            successMessage("Cliente salvo com sucesso !");
        }).catch( error => {
            errorMessage(error.response.data);
        })
    }

    const updateCliente = () => {
        axios.put(`${URL}/${cliente.id}`, cliente)
        .then( response => {
            navigate("/");
            successMessage("Cliente atualizado com sucesso !");
        }).catch( error => {
            errorMessage(error.response.data);
        })
    }

    return (
        <div className='Form'>
            <div className='containerForm'>
                <div className='headerForm'>
                    {cliente.id 
                    ?
                    <h1>EDITAR CLIENTE</h1>
                    :
                    <h1>CADASTRO DE CLEINTE</h1>
                    }
                </div>

                <hr/>

                <label htmlFor='nome'>Nome do cliente: </label>
                <input type="text"
                    name='nome'
                    value={cliente.nome || ''}
                    onChange={handleDataChange}
                    placeholder='digite o nome do cliente'/>
                {
                    cliente.id 
                    ?
                    <a onClick={updateCliente} className='saveButton'>Salvar alterações</a> 
                    :
                    <a onClick={createCliente} className='saveButton'>Salvar novo cliente</a>
                }
            </div>
        </div>
    )
}

export default FormCliente;