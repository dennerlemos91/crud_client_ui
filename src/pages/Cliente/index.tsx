import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';

import './styles.css'

import ClienteList from './cliente-list/index';

import history from '../../routes//history'
import { AuthContext } from '../../hooks/AuthContext';

const Cliente = () => {
    const { possuiPermissao } = useContext(AuthContext)

    return (
        <>
            {possuiPermissao('ROLE_ADMIN') && (
                <div className="actions">
                    <Button variant="success" onClick={() => history.push('/novo')}>Adicionar</Button>
                </div>
            )}
            <div className="container mt-3">
                <ClienteList />
            </div>
        </>
    )
}

export default Cliente;