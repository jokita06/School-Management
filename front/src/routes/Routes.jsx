import { Routes, Route } from 'react-router-dom';
import { Index } from '../pages/index';
import { Login } from '../pages/login/Login';

export function AppRoutes() {
    return (
        <Routes>
            // Rotas pública
            <Route path='/' element={<Index />}>
                <Route path='login' element={<Login />} />
            </Route>
        </Routes>
    )
}