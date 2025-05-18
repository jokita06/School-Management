import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Home } from '../Pages/home/Home';
import { Index } from '../Pages/index/Index';
import { Login } from '../Pages/login/Login';
import { AcessPage } from '../Pages/userPage/UserPage';
import { useEffect, useState } from 'react';

const RotaProtegida = ({cargo, redirecionamento = '/login'}) => {
    const [isLoading, setLoading] = useState(true);
    const [userCargo, setUserCargo] = useState(true);

    useEffect(() => {
        const cargo = localStorage.getItem('cargo');
        setUserCargo(cargo)
        setLoading(false)
    }, []);

    if (isLoading) {
        return <div>Carregando...</div>
    }

    return <Outlet />
}

// Rota para gestor
const GestorRota = () => {
    return <RotaProtegida cargo="G" />;
};

const ProfessorRota = () => {
    return <RotaProtegida cargo="P" />;
};

export function AppRoutes() {
    return (

        <Routes>
            // Rotas pública
            <Route path='/' element={<Index />}>
                <Route index element={<Home />} />
                <Route path='home' element={<Home />} />
                <Route path='login' element={<Login />} />
                
            </Route>

            // Rotas privadas
            <Route element={<GestorRota />}>
                <Route path='/gestor' element={<AcessPage />}/>
            </Route>

            <Route element={<ProfessorRota />}>
                <Route path='/professor' element={<AcessPage />}/>
            </Route>

            <Route path='/dashboard' element={
                localStorage.getItem('cargo') === 'G' ?
                <Navigate to = "/gestor" replace /> :
                <Navigate to = "/professor" replace />
            }/>
        </Routes>


    )
}