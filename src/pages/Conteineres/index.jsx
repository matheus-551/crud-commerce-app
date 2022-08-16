import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

import { Plus, Pencil, Trash } from 'phosphor-react';
import { errorMessage, successMessage } from './../../components/Toast/toast';

function Conteiner() {
    const [conteineres, setConteineres] = useState([{
        id: null,
        numeroConteiner: null,
        categoria: null,
        status: null,
        tipoConteiner: null,
        cliente: {}
    }])
    const URL = 'http://localhost:8080/api/conteineres';

    useEffect(() => {
        axios.get(URL)
        .then( response => {
            setConteineres(response.data)
        }).catch( error => {
            console.log(error.response.data)
        })
    }, [])

    const deleteConteiner = (conteiner) => {
        axios.delete(`${URL}/${conteiner.id}`)
        .then( response => {
            successMessage("Contêiner deletado com sucesso !")
        }).catch( error => {
            errorMessage(error.response.data);
        })
    }

    return (
        <div>
            <div className='groupItems'>
                <h1>CONTÊINERES</h1>
                <Link to="/cadastro-conteiner" className='addButton'><Plus/>NOVO CONTÊINER</Link>
            </div>
            <div className='containerGrid'>
                {conteineres.map((conteiner, index) => {
                    return (
                        <div className='card' key={index}>
                            <div className='cardHeader'>
                                <span>N do contêiner <strong>{conteiner.numeroConteiner}</strong></span>
                                <span>Cliente: <strong>{conteiner.cliente.nome}</strong></span>
                            </div>
                            
                            <hr/>

                            <div className='cardBody'>
                                <span>Categoria: <strong>{conteiner.categoria}</strong></span>
                                <span>status: <strong>{conteiner.status}</strong></span>
                                <span>Tipo do contêiner: <strong>{conteiner.tipoConteiner}</strong></span>
                            </div>

                            <hr/>

                            <div className='cardFooter'>
                                <Link to={`/cadastro-conteiner/${conteiner.id}`} className='editButton'><Pencil/>EDITAR</Link>
                                <a onClick={() => deleteConteiner(conteiner)} className='deleteButton'><Trash/>DELETAR</a>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Conteiner;