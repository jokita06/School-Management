import React, { useState, useEffect } from 'react';
import { Tables } from '../../components/tables/Tables';
import { FaHome, FaBook, FaChalkboardTeacher, FaUsers, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './UserPage.css'

export function AcessPage() {
    const [username, setUsername] = useState('');
    const [userCargo, setUserCargo] = useState(''); 
    const [activeView, setActiveView] = useState('disciplinas'); // Estado para controlar a view ativa

    useEffect(() => {
        const storedUsername = localStorage.getItem('user_name');
        const storedCargo = localStorage.getItem('user_cargo'); 
        
        if (storedUsername) {
            setUsername(storedUsername);
        }
        
        if (storedCargo) {
            setUserCargo(storedCargo.toUpperCase()); 
        }
    }, []);

    const isGestor = () => {
        return userCargo === 'G';
    };

    const handleViewChange = (view) => {
        setActiveView(view);
    };

    return (
        <main className='main-login'>
            <div className='sideBar'>
                <div className='acoes'>
                    <div className='item'>                        
                        <FaHome style={{ marginRight: '10px' }} />
                        <Link to='/home' className='home-link'>Home</Link>
                    </div>
                    
                    <div className='item' onClick={() => handleViewChange('disciplinas')}>
                        <FaBook style={{ marginRight: '10px' }} />
                        Disciplinas
                    </div>
                    
                    <div className='item' onClick={() => handleViewChange('ambientes')}>
                        <FaChalkboardTeacher style={{ marginRight: '10px' }} />
                        Ambiente de Aula
                    </div>
                    
                    {isGestor() && (
                        <div className='item' onClick={() => handleViewChange('funcionarios')}>
                            <FaUsers style={{ marginRight: '10px' }} />
                            Funcionários
                        </div>
                    )}
                </div>
                
                <div className='user-info'>
                    <FaUser style={{ marginRight: '10px' }} />
                    <span className='user'>{username}</span>
                </div>
            </div>

            <div className='table-container'>
                <h1 className='title-function'>
                    {activeView === 'disciplinas' && 'Disciplinas'}
                    {activeView === 'ambientes' && 'Ambientes de Aula'}
                    {activeView === 'funcionarios' && 'Funcionários'}
                </h1>
                <Tables activeView={activeView} isGestor={isGestor()} />
            </div>
        </main>
    );
}