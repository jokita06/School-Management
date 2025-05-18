import './Footer.css'
import { FaGithub, FaLinkedin, FaHeart } from 'react-icons/fa'

export function Footer() {
    return (
        <footer className="site-footer">
            <div className="footer-wave"></div>
            <div className="footer-content">
                <div className="footer-main">
                    <div className="footer-brand">
                        <p className="footer-text">
                            Desenvolvido por Joyce Kelly
                        </p>
                        <p className="footer-subtext">Projeto Formativa</p>
                    </div>
                    
                    <div className="footer-social">
                        <a href="https://github.com/jokita06" 
                           target="_blank" 
                           rel="noopener noreferrer"
                           className="social-link">
                            <FaGithub className="social-icon" />
                            <span>GitHub</span>
                        </a>
                        <a href="https://www.linkedin.com/in/joyce-kelly-de-souza-santos-7bb077264/" 
                           target="_blank" 
                           rel="noopener noreferrer"
                           className="social-link">
                            <FaLinkedin className="social-icon" />
                            <span>LinkedIn</span>
                        </a>
                    </div>
                </div>
                
                <div className="footer-bottom">
                    <p>© 2025 Todos os direitos reservados</p>
                </div>
            </div>
        </footer>
    )
}