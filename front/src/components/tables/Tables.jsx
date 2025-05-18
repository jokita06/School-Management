import React, { useState, useEffect } from 'react';
import './Tables.css';
import api from '../../services/api';

const fieldMappings = {
  disciplinas: {
    endpoint: 'disciplinas/',
    fields: ['nome', 'carga_horaria', 'descricao', 'professor'],
    fieldNames: ['Nome', 'Carga Horária', 'Descrição', 'Professor'],
    formatField: {
      professor: (prof) => prof || 'N/A'
    }
  },
  ambientes: {
    endpoint: 'ambientes/',
    fields: ['dt_inicio', 'dt_termino', 'sala_reservada', 'periodo', 'professor', 'disciplina'],
    fieldNames: ['Data Início', 'Data Término', 'Sala', 'Período', 'Professor', 'Disciplina'],
    formatField: {
      periodo: (p) => ({ 'M': 'Manhã', 'T': 'Tarde', 'N': 'Noite' }[p] || p),
      professor: (prof) => prof?.username || 'N/A',
      disciplina: (disc) => disc?.nome || 'N/A'
    }
  },
  funcionarios: {
    endpoint: 'funcionarios/',
    fields: ['NI', 'full_name', 'email', 'cargo'],
    fieldNames: ['NI', 'Nome', 'Email', 'Cargo'],
    formatField: {
      cargo: (value) => value === 'G' ? 'Gestor' : 'Professor'
    }
  }
};

export function Tables({ activeView }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!activeView) return;
        
        setLoading(true);
        setError(null);
        
        const config = fieldMappings[activeView];
        if (!config) {
          throw new Error(`Visualização ${activeView} não configurada`);
        }

        const response = await api.get(config.endpoint);
        setData(response.data);
      } catch (err) {
        setError(err.response?.data?.detail || err.message || 'Erro ao carregar dados');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeView]);

  const renderTableHeaders = () => {
    const config = fieldMappings[activeView];
    if (!config) return null;
    
    return config.fieldNames.map((name, index) => (
      <th key={index}>{name}</th>
    ));
  };

  const renderTableRows = () => {
    const config = fieldMappings[activeView];
    if (!config) return null;
    
    return data.map((item, rowIndex) => (
      <tr key={rowIndex}>
        {config.fields.map((field, colIndex) => {
          // Formatação especial se existir
          if (config.formatField && config.formatField[field]) {
            return (
              <td key={colIndex}>
                {config.formatField[field](item[field])}
              </td>
            );
          }
          
          // Valor padrão se não existir
          return <td key={colIndex}>{item[field] ?? 'N/A'}</td>;
        })}
      </tr>
    ));
  };

  if (loading) return <div className="loading-message">Carregando...</div>;
  if (error) return <div className="error-message">Erro: {error}</div>;
  if (!activeView) return <div className="info-message">Selecione uma opção no menu</div>;

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {renderTableHeaders()}
          </tr>
        </thead>
        <tbody>
          {renderTableRows()}
        </tbody>
      </table>
    </div>
  );
}