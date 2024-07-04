import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import styled from 'styled-components';

interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
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

const Button = styled.button`
  padding: 10px;
  background-color: lightblue;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
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

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    navigate('/');
  }

  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://e-commerce-api-v2.academlo.tech/api/v1/users', formData);
      console.log('Registro exitoso:', response.data);
    } catch (error) {
      console.error('Error en el registro:', error);
    }
  };

  return (
    <Container>
      <FormWrapper>
        <h2>Register</h2>
        <Form onSubmit={handleSubmit}>
          <Input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required />
          <Input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required />
          <Input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <Input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <Input type="text" name="phone" placeholder="Phone" onChange={handleChange} required />
          <Button type="submit">Register</Button>
        </Form>
        <StyledLink to="/login">Ya tienes una cuenta? Logeate</StyledLink>
      </FormWrapper>
    </Container>
  );
};

export default Register;
