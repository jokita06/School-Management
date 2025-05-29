import React, { useState } from 'react';
import Teacher from '../../assets/Teacher.svg'
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './Login.css'
import { z } from "zod";

const schemaResolver = z.object({
  username: z
    .string()
    .min(1, 'Informe o username'),
  password: z
    .string()
    .min(1, 'Informe a senha')
});

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    try {
      schemaResolver.parse({ username, password });
      setErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMap = {};
        error.errors.forEach(err => {
          errorMap[err.path[0]] = err.message;
        });
        setErrors(errorMap);
        return;
      }
    }
    
    try {
      const response = await api.post('/login/', { 
        username, password 
      });
      
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      localStorage.setItem('user_cargo', response.data.funcionario.cargo);
      localStorage.setItem('user_id', response.data.funcionario.user_id);
      localStorage.setItem('user_name', response.data.funcionario.username);
      console.log(response.data.funcionario);
      
      // Redireciona conforme o tipo de usuário
      if (response.data.funcionario.cargo === 'G') {
        navigate('/gestor');
      } else if (response.data.funcionario.cargo === 'P') {
        navigate('/professor');
      }
    } catch (error) {
      alert('Informações inválidas!');
    }
  };

  return (
    <main className="login-page">
      <form className='login-form' onSubmit={handleSubmit}>
        <h1 className='login-title'>Entre na sua conta</h1>
        <div className="input-container">
          <input
            className={`login-input ${errors.username ? 'error' : ''} ${!errors.username && username ? 'success' : ''}`}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Usuário"
          />
          {errors.username && <span className="error-message">{errors.username}</span>}
        </div>

        <div className="input-container">
          <input
            className={`login-input ${errors.password ? 'error' : ''} ${!errors.password && password ? 'success' : ''}`}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
          />
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>
        <div>
          <button className={"default-buttons " + "login-button"} type="submit">Entrar</button>
        </div>
      </form>

      <div className='login-image-container'>
        <img src={Teacher} alt="Professor" className='login-image' />
      </div>
    </main>
  );
}