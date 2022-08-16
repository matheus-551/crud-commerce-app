import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Cliente from "./pages/Clientes";
import Conteiner from "./pages/Conteineres";
import Movimentacao from "./pages/Movimentacoes";

import FormCliente from "./pages/Clientes/FormCliente";
import FormConteiner from "./pages/Conteineres/FormConteiner";
import FormMovimentacao from "./pages/Movimentacoes/FormMovimentacao";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Cliente/>}/>
                <Route path="/conteiner" element={<Conteiner/>}/>
                <Route path="/movimentacao" element={<Movimentacao/>}/>
                <Route path="/cadastro-cliente" element={<FormCliente/>}>
                    <Route path="/cadastro-cliente:id" element={<FormCliente/>}/>
                </Route>
                <Route path="/cadastro-conteiner" element={<FormConteiner/>}>
                    <Route path="/cadastro-conteiner:id" element={<FormConteiner/>}/>
                </Route>
                <Route path="/cadastro-movimentacao" element={<FormMovimentacao/>}>
                <Route path="/cadastro-movimentacao:id" element={<FormMovimentacao/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;