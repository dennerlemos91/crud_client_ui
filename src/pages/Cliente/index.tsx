import React, { useState } from 'react';
import { Modal, Navbar } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom';

import './styles.css'

import tokenService from '../../services/token.service';
import ClienteList from './cliente-list/index';



const Cliente = () => {
    const [autheticated, setAutheticated] = useState(true)

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handlerLogout = () => {
        tokenService.removeToken();
        setAutheticated(false)
    }

    return (
        autheticated ? (
            <>
                <Navbar bg="primary" variant="dark">
                    <Navbar.Brand href="#home" className="mr-auto">Crud cliente</Navbar.Brand>
                    <Button variant="outline-light" onClick={() => handlerLogout()}>Logout</Button>
                </Navbar>
                <div className="actions">
                    <Button variant="success" onClick={handleShow}>Adicionar</Button>
                </div>
                <div className="container">
                    <ClienteList />
                </div>
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>

            </>
        ) : (
                <Redirect to='/' />
            )
    )
}

export default Cliente;