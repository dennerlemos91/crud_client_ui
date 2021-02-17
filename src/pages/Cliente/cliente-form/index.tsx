import React, { useState } from 'react';
import { Card, Col, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Builder } from 'builder-pattern';

import history from '../../../routes/history';

import './styles.css'

import { FcPlus } from 'react-icons/fc'
import { FaTrash } from 'react-icons/fa'
import { useParams } from 'react-router-dom';
import { Telefone } from '../../../models/telefone.interface';
import api from '../../../services/api';
import { useEffect } from 'react';
import { Cliente } from '../../../models/cliente.interface';
import { Endereco } from '../../../models/endereco.interface';

import alertaService from '../../../services/sweetalerta.service'

const ClienteForm: React.FC = () => {
    let { id }: any = useParams();
    useEffect(() => {
        if (id) {
            const loadById = async (id: number) => {
                const { data } = await api.get(`/clientes/${id}`);
                setNome(data.nome)
                setCpf(data.cpf)
                setTelefones(data.telefones)
                setEmails(data.emails)
                setCep(data.endereco.cep)
                setLogradouro(data.endereco.logradouro)
                setBairro(data.endereco.bairro)
                setUf(data.endereco.uf)
                setCidade(data.endereco.cidade)
            }
            loadById(id)
        }
    }, [id])


    const telefone = Builder<Telefone>().numero('').build();
    const [nome, setNome] = useState('')
    const [cpf, setCpf] = useState('')
    const [telefones, setTelefones] = useState<Telefone[]>([telefone])
    const [emails, setEmails] = useState<string[]>([''])
    const [cep, setCep] = useState('')
    const [logradouro, setLogradouro] = useState('')
    const [bairro, setBairro] = useState('')
    const [uf, setUf] = useState('')
    const [cidade, setCidade] = useState('')

    const limpar = () => {
        setNome('');
        setCpf('');
        setTelefones([telefone]);
        setEmails(['']);
        setCep('');
        setLogradouro('');
        setBairro('');
        setUf('');
        setCidade('');
        history.push('/novo')
    }

    const salvar = () => {
        const cliente = Builder<Cliente>()
            .nome(nome)
            .cpf(cpf)
            .telefones(telefones)
            .emails(emails)
            .endereco(
                Builder<Endereco>()
                    .cep(cep)
                    .logradouro(logradouro)
                    .bairro(bairro)
                    .uf(uf)
                    .cidade(cidade)
                    .build()
            )
            .build();

        if (id) {
            api.put(`/clientes/${id}`, cliente).then((response) => {
                console.log(response)
                alertaService.alertaSucesso('Cliente atualizado com sucesso')
            })
        } else {
            api.post(`/clientes`, cliente).then(({ data }) => {
                alertaService.alertaSucesso('Cliente salvo com sucesso')
                history.push(`/edit/${data.id}`)
            })
        }

    }
    return (
        <div className="container mt-3">
            <Card>
                <Card.Header>
                    <div className="d-flex align-items-center justify-content-between">
                        <span>Cadastro de cliente</span>
                        <Button variant="link" onClick={() => history.push('/')}>Voltar</Button>
                    </div>
                </Card.Header>
                <Form style={{ padding: '15px' }}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="nome">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control type="text" placeholder="Digite seu nome" value={nome} onChange={(e) => setNome(e.target.value)} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="cpf">
                            <Form.Label>CPF</Form.Label>
                            <Form.Control type="text" placeholder="000.000.000-00" value={cpf} onChange={(e) => setCpf(e.target.value)} />
                        </Form.Group>
                    </Form.Row>

                    <fieldset className="border p-2">
                        <legend className="w-auto">Telefones <FcPlus style={{ fontSize: '25px' }} onClick={() => setTelefones([...telefones, telefone])} /></legend>
                        {
                            telefones.map((telefone, index) => (
                                <div className="row align-items-center" key={index}>
                                    <div className="col">
                                        <Form.Group controlId="tipo">
                                            <Form.Label>Tipo</Form.Label>
                                            <Form.Control as="select" value={telefone.tipo} onChange={(e) => telefone.tipo = e.target.value}>
                                                <option>Selecione um tipo</option>
                                                <option value={'COMERCIAL'}>Comercial</option>
                                                <option value={'RESIDENCIAL'}>Residêncial</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </div>
                                    <div className="col">
                                        <Form.Group controlId="numero">
                                            <Form.Label>Número</Form.Label>
                                            <Form.Control type="text" placeholder="(00) 00000-0000" value={telefone.numero} onChange={(event) =>
                                                setTelefones(telefones.map((t, i) => {
                                                    if (i === index) {
                                                        return {
                                                            ...t,
                                                            numero: event.target.value
                                                        }
                                                    }
                                                    return t;
                                                }))
                                            } />
                                        </Form.Group>
                                    </div>
                                    {
                                        telefones.length > 0 && index > 0 ? (
                                            <div className="col-1">
                                                <FaTrash style={{ color: 'red', fontSize: '20px' }} onClick={() => setTelefones(telefones.filter((t, i) => index !== i))} />
                                            </div>
                                        ) : (<div className="col-1"></div>)
                                    }
                                </div>
                            ))
                        }
                    </fieldset>

                    <fieldset className="border p-2 mt-3">
                        <legend className="w-auto">E-mails <FcPlus style={{ fontSize: '25px' }} onClick={() => setEmails([...emails, ''])} /></legend>
                        {
                            emails.map((email, index) => (
                                <div className="row align-items-center" key={index}>
                                    <div className="col">
                                        <Form.Group controlId="email">
                                            <Form.Control type="email" placeholder="email@email.com" value={email} onChange={(event) => {
                                                setEmails(emails.map((e, i) => {
                                                    if (index === i) {
                                                        return event.target.value
                                                    }
                                                    return e;
                                                }))
                                            }} />
                                        </Form.Group>
                                    </div>
                                    <div className="col-1">
                                        {
                                            emails.length > 1 ? (
                                                <FaTrash style={{ color: 'red', fontSize: '20px' }} onClick={() => setEmails(emails.filter((e, i) => i !== index))} />
                                            ) : (<div />)
                                        }
                                    </div>
                                </div>
                            ))
                        }
                    </fieldset>

                    <fieldset className="border p-2 mt-3">
                        <legend className="w-auto">Endereço</legend>
                        <div className="row">
                            <div className="col-2">
                                <Form.Group controlId="cep">
                                    <Form.Label>Cep</Form.Label>
                                    <Form.Control type="text" value={cep} onChange={(e) => setCep(e.target.value)} />
                                </Form.Group>
                            </div>
                            <div className="col-5">
                                <Form.Group controlId="logradouro">
                                    <Form.Label>Logradouro</Form.Label>
                                    <Form.Control type="text" value={logradouro} onChange={(e) => setLogradouro(e.target.value)} />
                                </Form.Group>
                            </div>
                            <div className="col-2">
                                <Form.Group controlId="bairro">
                                    <Form.Label>Bairro</Form.Label>
                                    <Form.Control type="text" value={bairro} onChange={(e) => setBairro(e.target.value)} />
                                </Form.Group>
                            </div>
                            <div className="col-1">
                                <Form.Group controlId="uf">
                                    <Form.Label>UF</Form.Label>
                                    <Form.Control type="text" value={uf} onChange={(e) => setUf(e.target.value)} />
                                </Form.Group>
                            </div>

                            <div className="col-2">
                                <Form.Group controlId="cidade">
                                    <Form.Label>Cidade</Form.Label>
                                    <Form.Control type="text" value={cidade} onChange={(e) => setCidade(e.target.value)} />
                                </Form.Group>
                            </div>
                        </div>
                    </fieldset>

                    <div className="mt-3">
                        <Button variant="primary" type="button" className="mr-3" onClick={salvar}>
                            Salvar
                    </Button>

                        <Button variant="secondary" type="button" onClick={limpar}>
                            Limpar
                    </Button>
                    </div>
                </Form>
            </Card>

        </div>
    );
}

export default ClienteForm;