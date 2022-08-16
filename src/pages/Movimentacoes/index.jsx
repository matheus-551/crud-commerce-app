import React,{useState, useEffect} from "react";
import { Link } from 'react-router-dom';

import axios from 'axios';

import { Plus, Pencil, Trash} from 'phosphor-react';
import { errorMessage, successMessage } from './../../components/Toast/toast';

function Movimentacao() {
    const [movimentacoes, setMovimentacoes] = useState([{
        id: null,
        tipoMovimentacao: null,
        dataHoraInicio: null,
        dataHoraFIm: null,
        conteiner: {}
    }])
    const URL = 'http://localhost:8080/api/movimentacoes';

    useEffect(() => {
        axios.get(URL)
        .then( response => {
            setMovimentacoes(response.data);
        }).catch( error => {
            console.log(error.response.data);
        })
    },[])

    const deleteMovimentacao = (movimentacao) => {
        axios.delete(`${URL}/${movimentacao.id}`)
        .then( response => {
            successMessage("Movimentação deletada com sucesso");
        }).catch( error => {
            errorMessage(error.response.data)
        })
    }
    
    return (
        <div>
            <div className="groupItems">
                <h1>MOVIMENTAÇÕES</h1>
                <Link to="/cadastro-movimentacao" className="addButton"><Plus/>NOVA MOVIMENTAÇÃO</Link>
            </div>
            <div className="containerGrid">
                {movimentacoes.map((movimentacao, index) => {
                    return (
                        <div className="card" key={index}>
                            <div className="cardHeader">
                                <span>Tipo da movimentação: <strong>{movimentacao.tipoMovimentacao}</strong></span>
                                <span>N do contêiner: <strong>{movimentacao.conteiner.numeroConteiner}</strong></span>
                            </div>

                            <hr/>

                            <div className="cardBody">
                                <span>Data e Hora do inicio: <strong>{movimentacao.dataHoraInicio}</strong></span>
                                <span>Data e Hora do fim: <strong>{movimentacao.dataHoraFim}</strong></span>
                            </div>

                            <hr/>

                            <div className="cardFooter">
                                <Link to={`/cadastro-movimentacao/${movimentacao.id}`} className="editButton"><Pencil/>EDITAR</Link>
                                <a onClick={() => deleteMovimentacao(movimentacao)} className="deleteButton"><Trash/>DELETAR</a>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Movimentacao;