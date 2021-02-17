import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import { useEffect } from 'react';

import api from '../../../services/api'
import Button from 'react-bootstrap/Button';

import history from './../../../routes/history'
import { Cliente } from '../../../models/cliente.interface';
import { Telefone } from '../../../models/telefone.interface';
import alertaService from '../../../services/sweetalerta.service';
import { SweetAlertResult } from 'sweetalert2';

const ClienteList: React.FC = () => {
    const [clientes, setClientes] = useState<Cliente[]>([]);

    useEffect(() => {
        const findAll = async () => {
            const { data } = await api.get('/clientes')
            setClientes(data)
        }

        findAll();
    }, [])

    const confirmDelete = (id: number) => {
        alertaService.confirmAlerta('Tem certeza que deseja deletar o clinete?')
            .then((result: SweetAlertResult) => {
                if (result.isConfirmed) {
                    deleteCliente(id)
                }
            })
    }

    const deleteCliente = async (id: number) => {
        try {
            await api.delete(`/clientes/${id}`);
            alertaService.alertaSucesso('Cliente deletado com sucesso!')
            setClientes(
                clientes.filter(cliente => cliente.id !== id)
            );
        } catch (erro) {
            alertaService.alertaErro('Erro ao tentar deletar cliente!')
        }


    }

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>CPF</th>
                    <th>Telefones</th>
                    <th>Emails</th>
                    <th>Endereço</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    clientes.length > 0 ? clientes.map((cliente: Cliente) => (
                        <tr key={cliente.id}>
                            <td>{cliente.nome}</td>
                            <td>{cliente.cpf}</td>
                            <td>{
                                <ul>
                                    {
                                        cliente.telefones.map((telefone: Telefone, index) => (
                                            <li key={index}>
                                                {telefone.numero} - {telefone.tipo}
                                            </li>
                                        ))
                                    }
                                </ul>
                            }</td>
                            <td>{
                                <ul>
                                    {
                                        cliente.emails.map((email: string, index) => (
                                            <li key={index}>
                                                {email}
                                            </li>
                                        ))
                                    }
                                </ul>
                            }</td>
                            <td>{cliente?.endereco?.logradouro}</td>
                            <td>
                                <Button variant="secondary" className="mr-3" onClick={() => history.push(`/edit/${cliente.id}`)}>Editar</Button>
                                <Button variant="danger" onClick={() => confirmDelete(cliente.id)}>Excluir</Button>
                            </td>
                        </tr>
                    )) : (
                            <tr>
                                <td colSpan={6}>
                                    Nenhum cliente cadastrado até o momento.
                            </td>
                            </tr>
                        )
                }


            </tbody>
        </Table>
    );
}

export default ClienteList;