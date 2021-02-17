import React, { useContext, useState } from 'react';
import { Modal, Navbar } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

import './styles.css'

import ClienteList from './cliente-list/index';
import { AuthContext } from '../../hooks/AuthContext';



const Cliente = () => {
    const { handleLogout } = useContext(AuthContext);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handlerLogout = () => {
        handleLogout()
    }

    return (
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
    )
}

export default Cliente;