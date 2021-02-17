import React from 'react';
import Button from 'react-bootstrap/Button';

import './styles.css'

import ClienteList from './cliente-list/index';

import history from '../../routes//history'

const Cliente = () => {
    return (
        <>
            <div className="actions">
                <Button variant="success" onClick={() => history.push('/novo')}>Adicionar</Button>
            </div>
            <div className="container">
                <ClienteList />
            </div>
        </>
    )
}

export default Cliente;