import { Routes, Route } from 'react-router-dom';
import { Index } from '../pages/index';

export function AppRoutes() {
    return (
        <Routes>
            // Rotas pública
            <Route path='/' element={<Index />}>
                
            </Route>
        </Routes>
    )
}