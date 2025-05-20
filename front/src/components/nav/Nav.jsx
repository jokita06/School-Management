import './Nav.css';
import { Link } from 'react-router-dom';
import react from '../../assets/react.svg'

export function Nav() {
    return (
        <div className='container'>

            <div className='conteudo-nav'>
                <img className='Logo' src={react} alt="" />

                <nav className='navbar' aria-label='Navegação principal'>
                    <ul className='nav-list'>
                        <li className='nav-item'>
                            <Link to='/home' className='nav-link'>Home</Link>
                        </li>
                        
                        <li className='nav-link'>
                            Sobre nós
                        </li>
                        
                        <li className='nav-link'>Nossos serviços</li>
                    </ul>
                </nav>

                <button className={"default-buttons " + "btn-login"}>
                    <Link className='btn-login-link' to='/login'>Login</Link>
                </button>
            </div>
        
        </div>
        
    );
}