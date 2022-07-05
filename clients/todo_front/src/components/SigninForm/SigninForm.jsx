import React from 'react';
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { auth } from '../../features/applicationSlice';

import "./SigninForm.css";


const SigninForm = () => {
    const dispatch = useDispatch()

    const [login, setLogin] = useState();   
    const [password, setPassword] = useState();
  
    const signingIn = useSelector((state) => state.auth.signingIn)  //Ключ авторизации
    const error = useSelector((state) => state.auth.error)          //Ключ ошибки
   
    const handleChangeLogin = (e) => {
      setLogin(e.target.value);
    };
  
    const handleChangePassword = (e) => {
      setPassword(e.target.value);
    };
  
    const handleSubmit = () => {
      dispatch(auth({login, password}))
    }
  
    const handleForm = (e) => {
      e.preventDefault()
    }
  
    return (
      <div className='main'>
      <div className='error'>
        {error}
      </div>
      <>
      <Form onSubmit={handleForm} className="authForm">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={login}
            onChange={handleChangeLogin}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={handleChangePassword}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit} disabled={signingIn} className="authButton">
          Авторизоваться
        </Button>
      </Form>
      </>
      </div>
    );
};

export default SigninForm;