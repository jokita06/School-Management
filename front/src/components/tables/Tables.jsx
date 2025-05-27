import React, { useState, useEffect } from 'react';
import './Tables.css';
import api from '../../services/api';
import { Modal } from '../modal/Modal';
import { DisciplineForm, EmployeeForm, EnvironmentForm, ClassroomForm } from '../forms/Forms'
import { FaTrash } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";

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
    fields: ['sala_reservada', 'disciplina', 'dt_inicio', 'dt_termino', 'periodo', 'professor'],
    fieldNames: ['Sala', 'Disciplina', 'Data Início', 'Data Término', 'Período', 'Professor'],
    formatField: {
      periodo: (p) => ({ 'M': 'Manhã', 'T': 'Tarde', 'N': 'Noite' }[p] || p),
      professor: (prof) => prof || 'N/A',
      disciplina: (disc) => disc || 'N/A'
    }
  },
  funcionarios: {
    endpoint: 'funcionarios/',
    fields: ['NI', 'full_name', 'email', 'telefone', 'data_contratacao', 'cargo'],
    fieldNames: ['NI', 'Nome', 'Email', 'Telefone', 'Data de Contratação', 'Cargo'],
    formatField: {
      cargo: (value) => value === 'G' ? 'Gestor' : 'Professor'
    }
  },
  salas: {
    endpoint: 'salas/',
    fields: ['nome'],
    fieldNames: ['Nome'],
  },
};

export function Tables({ activeView, isGestor }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [action, setAction] = useState('create');

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
  }, [activeView, isModalOpen]);

  const handleCreate = () => {
    setAction('create');
    setCurrentItem(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item) => {
    setAction('edit');
    setCurrentItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      const config = fieldMappings[activeView];
      await api.delete(`${config.endpoint}${id}/`);
      // Atualiza os dados após deletar
      const response = await api.get(config.endpoint);
      setData(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || err.message || 'Erro ao deletar');
    }
  };

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
          if (config.formatField && config.formatField[field]) {
            return (
              <td key={colIndex}>
                {config.formatField[field](item[field])}
              </td>
            );
          }
          return <td key={colIndex}>{item[field] ?? 'N/A'}</td>;
        })}
        {isGestor && (
          <td className="actions">
            <button onClick={() => handleEdit(item)}>
              <span title='Editar'>

              </span>
              <MdModeEdit className='icons-table'/>
            </button>
            <button onClick={() => handleDelete(item.id)}>
              <span title='Excluir'>
                <FaTrash className='icons-table'/>
              </span>
            </button>
          </td>
        )}
      </tr>
    ));
  };

  const renderForm = () => {
    switch (activeView) {
      case 'disciplinas':
        return <DisciplineForm item={currentItem} action={action} onClose={() => setIsModalOpen(false)} />;
      case 'ambientes':
        return <EnvironmentForm item={currentItem} action={action} onClose={() => setIsModalOpen(false)} />;
      case 'funcionarios':
        return <EmployeeForm item={currentItem} action={action} onClose={() => setIsModalOpen(false)} />;
      case 'salas':
        return <ClassroomForm item={currentItem} action={action} onClose={() => setIsModalOpen(false)} />;
      default:
        return null;
    }
  };

  if (loading) return <div className="loading-message">Carregando...</div>;
  if (error) return <div className="error-message">Erro: {error}</div>;
  if (!activeView) return <div className="info-message">Selecione uma opção no menu</div>;

  return (
    <div className="table-container">
      {isGestor && (
        <div className="table-actions">
          <button onClick={handleCreate}>Cadastrar</button>
        </div>
      )}
      <table>
        <thead>
          <tr>
            {renderTableHeaders()}
            {isGestor && <th>Ações</th>}
          </tr>
        </thead>
        <tbody>
          {renderTableRows()}
        </tbody>
      </table>
      
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          {renderForm()}
        </Modal>
      )}
    </div>
  );
}