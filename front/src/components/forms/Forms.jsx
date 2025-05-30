import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './Forms.css'
import { z } from "zod";

export function DisciplineForm({ item, action, onClose }) {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    nome: '',
    carga_horaria: '',
    descricao: '',
    professor: '',
  });
  const [professores, setProfessores] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      
      const response = await api.get('funcionarios/');
      const professoresFiltrados = response.data.filter(
        (funcionario) => funcionario.cargo === 'P'
      );

      setProfessores(professoresFiltrados);
  
      if (item) {
        setFormData({
          nome: item.nome || '',
          carga_horaria: item.carga_horaria || '',
          descricao: item.descricao || '',
          professor: item.professor?.id || '',
        });
      }
    };
  
    fetchData();
  }, [item]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (action === 'create') {
        await api.post('disciplinas/', formData);
      } else {
        await api.put(`disciplinas/${item.id}/`, formData);
      }
      onClose();
    } catch (error) {
      console.error('Erro ao salvar disciplina:', error);
    }
  };

  return (
    <form  className='form-dashboard' onSubmit={handleSubmit}>
      <h2>{action === 'create' ? 'Adicionar' : 'Editar'} Disciplina</h2>
      <div>
        <label>Nome:</label>
        <input
          type="text"
          value={formData.nome}
          onChange={(e) => setFormData({...formData, nome: e.target.value})}
          required
        />
      </div>
      <div>
        <label>Carga Horária:</label>
        <input
          type="number"
          value={formData.carga_horaria}
          onChange={(e) => setFormData({...formData, carga_horaria: e.target.value})}
          required
        />
      </div>
      <div>
        <label>Descrição:</label>
        <textarea
          value={formData.descricao}
          onChange={(e) => setFormData({...formData, descricao: e.target.value})}
          required
        />
      </div>
      <div>
        <label>Professor:</label>
        <select
          value={formData.professor}
          onChange={(e) => setFormData({...formData, professor: e.target.value})}
          required
        >
          <option value="">Selecione um professor</option>
          {professores.map(prof => (
            <option key={prof.id} value={prof.id}>
              {prof.full_name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Salvar</button>
    </form>
  );
}

export function ClassroomForm({ item, action, onClose }) {
  const [formData, setFormData] = useState({
    nome: '',
  });

  useEffect(() => {
    if (item) {
      setFormData({
        nome: item.nome || '',
      });
    }
  }, [item]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (action === 'create') {
        await api.post('salas/', formData);
      } else {
        await api.put(`salas/${item.id}/`, formData);
      }
      onClose();
    } catch (error) {
      console.error('Erro ao salvar sala de aula:', error);
    }
  };

  return (
    <form className='form-dashboard' onSubmit={handleSubmit}>
      <h2>{action === 'create' ? 'Adicionar' : 'Editar'} Sala</h2>
      <div>
        <label>Nome da Sala:</label>
        <input 
          type="text" 
          value={formData.nome}
          onChange={(e) => setFormData({...formData, nome: e.target.value})}
          required
        />
      </div>
      <button type='submit'>Salvar</button>
    </form>
  );
}

export function EmployeeForm({ item, action, onClose }) {
  const [formData, setFormData] = useState({
    NI: '',
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    telefone: '',
    dt_nascimento: '',
    data_contratacao: '',
    cargo: 'P',
    password: '',
  });

  useEffect(() => {
    if (item) {
      
      setFormData({
        NI: item.NI || '',
        username: item.username || '',
        first_name: item.first_name || '',
        last_name : item.last_name || '',
        email: item.email || '',
        telefone: item.telefone || '',
        dt_nascimento: item.dt_nascimento || '',
        data_contratacao: item.data_contratacao || '',
        cargo: item.cargo || 'P',
        password: item.password || '',
      });
    }
  }, [item]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (action === 'create') {
        await api.post('funcionarios/', formData);

      } else {
        await api.put(`funcionarios/${item.id}/`, formData);
      }
      onClose();
    } catch (error) {
      console.error('Erro ao salvar funcionário:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='form-dashboard'>
      <h2>{action === 'create' ? 'Adicionar' : 'Editar'} Funcionário</h2>
      <div>
        <label>NI:</label>
        <input
          type="number"
          value={formData.NI}
          onChange={(e) => setFormData({...formData, NI: e.target.value})}
          required
        />
      </div>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={formData.username}
          onChange={(e) => setFormData({...formData, username: e.target.value})}
          required
        />
      </div>
      <div>
        <label>Nome:</label>
        <input
          type="text"
          value={formData.first_name}
          onChange={(e) => setFormData({...formData, first_name: e.target.value})}
          required
        />
      </div>

      <div>
        <label>Sobrenome:</label>
        <input
          type="text"
          value={formData.last_name}
          onChange={(e) => setFormData({...formData, last_name: e.target.value})}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          required
        />
      </div>
      <div>
        <label>Telefone:</label>
        <input
          type="text"
          value={formData.telefone}
          onChange={(e) => setFormData({...formData, telefone: e.target.value})}
          placeholder="(00)00000-0000"
          required
        />
      </div>
      <div>
        <label>Data de Nascimento:</label>
        <input
          type="date"
          value={formData.dt_nascimento}
          onChange={(e) => setFormData({...formData, dt_nascimento: e.target.value})}
          required
        />
      </div>
      <div>
        <label>Data de Contratação:</label>
        <input
          type="date"
          value={formData.data_contratacao}
          onChange={(e) => setFormData({...formData, data_contratacao: e.target.value})}
          required
        />
      </div>
      <div>
        <label>Cargo:</label>
        <select
          value={formData.cargo}
          onChange={(e) => setFormData({...formData, cargo: e.target.value})}
          required
        >
          <option value="P">Professor</option>
          <option value="G">Gestor</option>
        </select>
      </div>

      <div>
        <label>Senha:</label>
        <input
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          required
        />
      </div>
      <button type="submit">Salvar</button>
    </form>
  );
}

export function EnvironmentForm({ item, action, onClose }) {
  const [formData, setFormData] = useState({
    sala_reservada: '',
    disciplina: '',
    dt_inicio: '',
    dt_termino: '',
    periodo: 'M',
    professor: ''
  });
  const [salas, setSalas] = useState([]);
  const [disciplinas, setDisciplinas] = useState([]);
  const [professores, setProfessores] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [salasRes, disciplinasRes, professoresRes] = await Promise.all([
        api.get('salas/'),
        api.get('disciplinas/'),
        api.get('funcionarios/')
      ]);

      const professoresFiltrados = professoresRes.data.filter(
        (funcionario) => funcionario.cargo === 'P'
      )
      setSalas(salasRes.data);
      setDisciplinas(disciplinasRes.data);
      setProfessores(professoresFiltrados);
    };
    fetchData();

    if (item) {
      setFormData({
        sala_reservada: item.sala_reservada?.id || '',
        disciplina: item.disciplina?.id || '',
        dt_inicio: item.dt_inicio || '',
        dt_termino: item.dt_termino || '',
        periodo: item.periodo || 'M',
        professor: item.professor?.id || ''
      });
    }
  }, [item]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (action === 'create') {
        await api.post('ambientes/', formData);
      } else {
        await api.put(`ambientes/${item.id}/`, formData);
      }
      onClose();
    } catch (error) {
      console.error('Erro ao salvar ambiente:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='form-dashboard'>
      <h2>{action === 'create' ? 'Adicionar' : 'Editar'} Ambiente de Aula</h2>
      <div>
        <label>Sala:</label>
        <select
          value={formData.sala_reservada}
          onChange={(e) => setFormData({...formData, sala_reservada: e.target.value})}
          required
        >
          <option value="">Selecione uma sala</option>
          {salas.map(sala => (
            <option key={sala.id} value={sala.id}>
              {sala.nome}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Disciplina:</label>
        <select
          value={formData.disciplina}
          onChange={(e) => setFormData({...formData, disciplina: e.target.value})}
          required
        >
          <option value="">Selecione uma disciplina</option>
          {disciplinas.map(disc => (
            <option key={disc.id} value={disc.id}>
              {disc.nome}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Professor:</label>
        <select
          value={formData.professor}
          onChange={(e) => setFormData({...formData, professor: e.target.value})}
          required
        >
          <option value="">Selecione um professor</option>
          {professores.map(prof => (
            <option key={prof.id} value={prof.id}>
              {prof.full_name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Data Início:</label>
        <input
          type="date"
          value={formData.dt_inicio}
          onChange={(e) => setFormData({...formData, dt_inicio: e.target.value})}
          required
        />
      </div>
      <div>
        <label>Data Término:</label>
        <input
          type="date"
          value={formData.dt_termino}
          onChange={(e) => setFormData({...formData, dt_termino: e.target.value})}
          required
        />
      </div>
      <div>
        <label>Período:</label>
        <select
          value={formData.periodo}
          onChange={(e) => setFormData({...formData, periodo: e.target.value})}
          required
        >
          <option value="M">Manhã</option>
          <option value="T">Tarde</option>
          <option value="N">Noite</option>
        </select>
      </div>
      <button type="submit">Salvar</button>
    </form>
  );
}
