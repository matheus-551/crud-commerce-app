import React, {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';

import { successMessage, errorMessage } from '../../components/Toast/toast';

function FormConteiner() {
    const [conteiner, setConteiner] = useState({
        id: null,
        numeroConteiner: '',
        categoria: '',
        status: '',
        tipoConteiner: '',
        idCliente: ''
    })
    const [clientes, setCliente] = useState([{}]);

    const URL = "http://localhost:8080/api/conteineres";
    const navigate = useNavigate();
    const urlParams = useParams();

    useEffect(() => {
        let params = urlParams.id;

        if(params) {
            axios.get(`${URL}/${params}`)
            .then( response => {
                setConteiner(response.data)
            }).catch( error => {
                errorMessage(error.response.data);
            })
        }
    }, [])

    useEffect(() => {
        axios.get("http://localhost:8080/api/clientes")
        .then( response => {
            setCliente(response.data);
        }).catch(error => {
            console.log(error.response.data);
        })
    }, [])

    const handleDataChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setConteiner(values => ({...values, [name]: value}))
    }

    const validar = () => {
        const msgs = []

        if(!conteiner.idCliente) {
            msgs.push("O campo cliente é obrigatório");
        }

        if(!conteiner.status) {
            msgs.push("O campo status é obrigatório")
        }

        if(!conteiner.categoria) {
            msgs.push("O campo categoria é obrigatorio")
        }
        
        if(!conteiner.tipoConteiner) {
            msgs.push("O TIpo do contêiner é obrigatório")
        }

        if(msgs.length > 0) {
            msgs.forEach(msgs => errorMessage(msgs))
        }

        return msgs;
    }

    const createConteiner = () => {
        const messages =  validar();

        if(messages.length > 0) {
            messages.forEach(msg => errorMessage(msg))
            return false;
        }

        axios.post(`${URL}`, conteiner)
        .then( response => {
            navigate("/conteiner");
            successMessage("Contêiner cadatrado com sucesso");
        }).catch( error => {
            errorMessage(error.response.data)
        })
    }

    const updateConteiner = () => {
        const messages = validar();

        if(messages.length > 0) {
            messages.forEach(msg => errorMessage(msg))
            return false;
        }

        axios.put(`${URL}/${conteiner.id}`, conteiner)
        .then( response => {
            navigate("/conteiner");
            successMessage("Contêiner atualizado com sucesso");
        }).catch( error => {
            errorMessage(error.response.data)
        })
    }

    return (
        <div className='Form'>
            <div className='containerForm'>

                {conteiner.id ? <h1>EDITAR CONTÊINER</h1> :  <h1>CADATRO DE CONTÊINER</h1>}
           
                <hr/>

                <label htmlFor='numeroConteiner'>Número do contêiner: </label>
                <input type="text"
                    name='numeroConteiner'
                    value={conteiner.numeroConteiner}
                    onChange={handleDataChange}
                    placeholder='O número do contêiner exige ter 4 letras e 7 números Ex: abcd1234567'/>

                <div className='formGroup'>
                    <div className='containerSelect'>
                        <label htmlFor='idCliente'>Cliente: </label>
                        <select name="idCliente" value={conteiner.idCliente} onChange={handleDataChange}>
                            <option value="0">Selecione um cliente</option>
                            {clientes.map((cliente, index) => {
                                return (
                                    <option value={cliente.id} key={index}>{cliente.nome}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className='containerSelect'>
                        <label htmlFor='categoria'>Categoria: </label>
                        <select name='categoria' value={conteiner.categoria} onChange={handleDataChange}>
                            <option value="">Selecione a categoria</option>
                            <option value="IMPORTACAO">IMPORTAÇÃO</option>
                            <option value="EXPORTACAO">EXPORTAÇÃO</option>
                        </select>
                    </div>    
                </div>
                <div className='formGroup'>
                <div className='containerSelect'>
                        <label htmlFor='tipoConteiner'>Tipo do Contêiner: </label>
                        <select name='tipoConteiner' value={conteiner.tipoConteiner} onChange={handleDataChange}>
                            <option value="">Selecione o tipo do contêiner</option>
                            <option value="PEQUENO">20</option>
                            <option value="GRANDE">40</option>
                        </select>
                    </div>
                    <div className='containerSelect'>
                        <label htmlFor='status'>Status: </label>
                        <select name='status' value={conteiner.status} onChange={handleDataChange}>
                            <option value="">Selecione o status</option>
                            <option value="CHEIO">CHEIO</option>
                            <option value="VAZIO">VAZIO</option>
                        </select>
                    </div>
                </div>
                
                {conteiner.id ? <a onClick={updateConteiner} className='saveButton'>Salvar alterações</a> : <a onClick={createConteiner} className='saveButton'>Salva contêiner</a>}                
            </div>
        </div>
    )
}

export default FormConteiner;