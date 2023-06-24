import React, { useState } from 'react'
import {Container,Row,Col,Form, Button,Alert} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Signup.css';
import { useLoginMutation } from '../services/appApi';
function Login() {
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const [login, { isError, isLoading, error }] = useLoginMutation();
    function handleLogin(e) {
        e.preventDefault();
        login({ email, password });
    }
  return (
    <Container>
    <Row>
      <Col md={6} className='login__form--container'>
        <Form style={{ width: '100%' }} onSubmit={handleLogin}>
          <h1>Prijavi se na račun</h1>
          {isError && <Alert variant="danger">{error.data}</Alert>}
          <Form.Group>
            <Form.Label>Email Adresa</Form.Label>
            <Form.Control
              type='email'
              placeholder='Unesite email'
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Šifra</Form.Label>
            <Form.Control
              type='password'
              placeholder='Unesite šifru'
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
                            <Button type="submit" disabled={isLoading}>
                                Prijavi se
                            </Button>
                        </Form.Group>
          <p className="pt-3 text-center">
            Nemate račun? <Link to='/signup'>Create account</Link>{" "}
          </p>
        </Form>
      </Col>
      <Col md={6} className='login__image-container'></Col>
    </Row>
  </Container>
  )
}

export default Login