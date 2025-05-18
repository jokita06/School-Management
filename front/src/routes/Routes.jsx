import { Routes, Route } from 'react-router-dom';
import { Index } from '../pages/index';
import { Login } from '../pages/login/Login';
import { Home } from '../pages/home/Home';

export function AppRoutes() {
    return (
        <Routes>
            // Rotas pública
            <Route path='/' element={<Index />}>
                <Route path='home' element={<Home />} />
                <Route path='login' element={<Login />} />
            </Route>
        </Routes>
    )
}