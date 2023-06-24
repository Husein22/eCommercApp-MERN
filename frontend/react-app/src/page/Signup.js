import React, { useState } from 'react';
import { Container, Row, Col, Form, Button,Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Signup.css';
import { useSignupMutation } from '../services/appApi'; 
function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState("");
const [signup,{error,isLoading,isError}]=useSignupMutation();

  function handleSignup(e) {
    e.preventDefault();
    signup({name,email,password})
    

  }

  return (
    <Container>
      <Row>
        <Col md={6} className='signup__form--container'>
          <Form style={{ width: '100%' }} onSubmit={handleSignup}>
            <h1>Napravi račun</h1>
            {isError && <Alert variand="danger"  >{error.data}</Alert>}
           


           
<Form.Group>
                            <Form.Label>Ime</Form.Label>
                            <Form.Control type="text" placeholder="Your name" value={name} required onChange={(e) => setName(e.target.value)} />
                        </Form.Group>


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
            <Form.Group>
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
              <Button type='submit'>Prijavi se</Button>
            </Form.Group>




            <p>
              Vec imate racun? <Link to='/login'>Login</Link>{" "}
            </p>
          </Form>
        </Col>
        <Col md={6} className='signup__image-container'></Col>
      </Row>
    </Container>
  );
}

export default Signup;
