import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/Loading/LoadingSpinner';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
`;

const FormWrapper = styled.div`
  background: #f9f9f9;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const StyledLink = styled(Link)`
  display: block;
  margin-top: 10px;
  color: #007bff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const LoginButton = styled.button`
  background: lightblue;
  padding: 10px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, isLoadingLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/'); // Redirigir a la página principal o a la página deseada después del login
    } catch (error) {
      console.error('Error en el login:', error);
    }
  };

  return (
    <Container>
      <FormWrapper>
        <h2>Login</h2>
        <Form onSubmit={handleSubmit}>
          <Input type="email" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
          <Input type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
          <LoginButton type="submit" disabled={isLoadingLogin}>
            <span>Login</span> { isLoadingLogin && <LoadingSpinner width='10px' height='10px'/> }
          </LoginButton>
        </Form>
        <StyledLink to="/register">No tienes cuenta? Registrate</StyledLink>
      </FormWrapper>
    </Container>
  );
};

export default Login;
