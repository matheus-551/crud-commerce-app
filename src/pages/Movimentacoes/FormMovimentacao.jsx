import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';
import { errorMessage } from '../../components/Toast/toast';
import { successMessage } from './../../components/Toast/toast';

function FormMovimentacao() {
    const [movimentacao, setMovimentacao] = useState({
        id: '',
        tipoMovimentacao: '',
        dataHoraInicio: '',
        dataHoraFIm: '',
        idConteiner: ''
    });

    const [conteineres, setConteineres] = useState([{}]);

    const URL = "http://localhost:8080/api/movimentacoes";
    const navigate = useNavigate();
    const urlParams = useParams();

    useEffect(() => {
        const params = urlParams.id;

        if(params) {
            axios.get(`${URL}/${params}`)
            .then( response => {
                setMovimentacao(response.data);
            }).catch( error => {
                errorMessage(error.response.data);
            })
        }
    }, [])

    useEffect(() => {
        axios.get('http://localhost:8080/api/conteineres')
        .then( response => {
            setConteineres(response.data);
        }).catch( error => {
            errorMessage(error.response.data)
        })
    }, [])

    const handleDataChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setMovimentacao(values => ({...values, [name]: value}))
    }

    const validar = () => {
        let msgs = []

        if(!movimentacao.idConteiner) {
            msgs.push("O campo contêiner é obrigatório")
        }

        if(!movimentacao.dataHoraInicio) {
            msgs.push("O campo data hora inicio é obrigatório")
        }
       
        if(!movimentacao.dataHoraFim) {
            msgs.push("O campo data hora fim é obrigatório")
        }

        if(!movimentacao.tipoMovimentacao) {
            msgs.push("O campo de tipo de movimentação é obrigatorio");
        }

        return msgs;
    }

    const createMovimentacao = () => {
        const messages = validar();

        if(messages.length > 0) {
            messages.forEach(msg => errorMessage(msg))
            return false;
        }

        axios.post(`${URL}`, movimentacao)
        .then( response => {
            successMessage("Movimentação salva com sucesso");
            navigate("/movimentacao");
        }).catch( error => {
            errorMessage(error.response.data);
        })
    }

    const updataMovimentacao = () => {
        const messages = validar();

        if(messages.length > 0) {
            messages.forEach(msg => errorMessage(msg))
            return false;
        }

        axios.put(`${URL}/${movimentacao.id}`, {
            id: movimentacao.id,
            tipoMovimentacao: movimentacao.tipoMovimentacao,
            dataHoraInicio: movimentacao.dataHoraInicio,
            dataHoraFIm: movimentacao.dataHoraFIm,
            idConteiner: movimentacao.idConteiner
        })
        .then( response => {
            successMessage("Movimentação atualizada com sucesso")
            navigate("/movimentacao")
        }).catch( error => {
            errorMessage(error.response.data)
        })
    }

    return  (
        <div className='Form'>
            <div className='containerForm'>
                <div className='headerForm'>
                    {!movimentacao.id ? <h1>CADATRO DE MOVIMENTAÇÃO</h1> : <h1>EDITAR MOVIMENTAÇÃO</h1>}  
                </div>

                <hr/>

                <label htmlFor='dataHoraInicio'>Data e hora de inicio: </label>
                <input type="text" 
                    name="dataHoraInicio"
                    value={movimentacao.dataHoraInicio}
                    onChange={handleDataChange}
                    placeholder="yyyy-MM-dd HH:mm:ss"/>
                
                <label htmlFor='dataHoraFim'>Data e hora de fim: </label>
                <input type="text" 
                    name="dataHoraFim"
                    value={movimentacao.dataHoraFim}
                    onChange={handleDataChange}
                    placeholder="yyyy-MM-dd HH:mm:ss"/>

                <div className='formGroup'>
                    <div className='containerSelect'>
                        <label htmlFor='tipoMovimentacao'>Tipo de Movimentação: </label>
                        <select name="tipoMovimentacao" value={movimentacao.tipoMovimentacao} onChange={handleDataChange}>
                            <option value="">Selecione o tipo de movimentação</option>
                            <option value="EMBARQUE">EMBARQUE</option>
                            <option value="DESCARGA">DESCARGA</option>
                            <option value="GATE_IN">GATE-IN</option>
                            <option value="GATE_OUT">GATE-OUT</option>
                            <option value="REPOSICIONAMENTO">REPOSICIONAMENTO</option>
                            <option value="PASSAGEM">PASSAGEM</option>
                            <option value="SCANNER">SCANNER</option>
                        </select>
                    </div>
                    <div className='containerSelect'>
                        <label htmlFor='conteiner'>Contêiner</label>
                        <select name="idConteiner" value={movimentacao.idConteiner} onChange={handleDataChange}>
                            <option value="">selecione o conteiner</option>
                            {conteineres.map((conteiner, index) => {
                                return (
                                    <option key={index} value={conteiner.id}>{conteiner.numeroConteiner}</option>
                                )
                            })}
                        </select>
                    </div>
                </div>
                
                {!movimentacao.id ? <a onClick={createMovimentacao} className='saveButton'>Salva Movimentação</a> : <a onClick={updataMovimentacao} className='saveButton'>Salvar Alterações</a>}

                
            </div>
        </div>
    )
}

export default FormMovimentacao;