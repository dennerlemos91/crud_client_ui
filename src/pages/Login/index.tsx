import React, { useCallback, useContext, useState } from "react";
import './styles.css'

import { AuthContext } from "../../hooks/AuthContext";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { handleLogin } = useContext(AuthContext);

    const handleSubmit = useCallback(async () => {
        await handleLogin({ username, password });
    }, [handleLogin, username, password]);

    return (
        <div className="container">
            <div id="from-login">
                <Form>
                    <h4 style={{ marginBottom: '15px' }}>Login</h4>
                    <Form.Group controlId="usuario">
                        <Form.Label>Usuário</Form.Label>
                        <Form.Control type="text" placeholder="Digite seu usuário"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control type="password" placeholder="Digite sua senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <Button variant="primary" type="button" onClick={() => handleSubmit()} disabled={username.trim() === '' && password.trim() === ''}>
                        Entrar
                </Button>
                </Form>
            </div>
        </div>)
};

export default Login;
