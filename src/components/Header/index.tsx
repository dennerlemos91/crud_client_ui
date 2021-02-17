import React, { useContext } from 'react';
import { Navbar } from 'react-bootstrap';

import Button from 'react-bootstrap/Button';
import { AuthContext } from '../../hooks/AuthContext';

const Header: React.FC = () => {
    const { authenticated, handleLogout } = useContext(AuthContext);

    const logout = () => {
        handleLogout()
    }
    return authenticated ? (
        <Navbar bg="primary" variant="dark">
            <Navbar.Brand href="#home" className="mr-auto">Crud cliente</Navbar.Brand>
            <Button variant="outline-light" onClick={() => logout()}>Logout</Button>
        </Navbar>
    ) : (<div />);
}

export default Header;