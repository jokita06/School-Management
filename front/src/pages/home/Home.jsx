import './Home.css';
import Banner from '../../assets/Education.svg';
import Logo from '../../assets/react.svg'
import { FaHandHoldingHeart, FaEye } from "react-icons/fa";
import { TbTargetArrow } from "react-icons/tb";

export function Home() {
  return (
    <>
      <header className="header-banner">
        {/* Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi quidem accusamus, est, ducimus deleniti cumque exercitationem aliquam officiis perspiciatis, commodi sed dolor placeat dolorem quaerat necessitatibus libero temporibus culpa nobis. */}
        <img 
          src={Banner} 
          alt="Classroom banner" 
          className="banner-image"
        />
      </header>

      <main className='home-main'>

        {/* About us section */}
        <section className="about-section">
          <h2 className='services-title'>Sobre nós</h2>
          
          <div className='process-container'>
            <div className='process-line'></div>
            
            <div className='process-cards'>
              <div className='process-card'>
                <div className='process-icon'>
                  <TbTargetArrow className='icons'/>
                </div>
                <h3>Missão</h3>
                <p>Facilitar a administração escolar com tecnologia inovadora, tornando a gestão mais eficiente e organizada.</p>
              </div>
              
              <div className='process-card'>
                <div className='process-icon'>
                  <FaEye className='icons' />
                </div>
                <h3>Visão</h3>
                <p>Ser a referência na gestão educacional, promovendo inovação e excelência administrativa.</p>
              </div>
              
              <div className='process-card'>
                <div className='process-icon'>
                  <FaHandHoldingHeart className='icons'/>
                </div>
                <h3>Valores</h3>
                <p>Valorizamos a inovação e eficiência para otimizar a gestão educacional.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Services section */}
        <section className='services-section'>
          <h2 className='services-title'>Nossos Serviços</h2>
          <div className='services-container'>
            <div className='service-card'>
              <h3>Gestão de Funcionários</h3>
              <p>Facilite o gerenciamento de sua equipe escolar, acompanhando informações essenciais e pessoais.</p>
            </div>
            
            <div className='service-card'>
              <h3>Gestão de Disciplinas</h3>
              <p>Organize e otimize o planejamento das disciplinas oferecidas, garantindo uma grade curricular eficiente e equilibrada.</p>
            </div>
            
            <div className='service-card'>
              <h3>Gestão de Ambientes</h3>
              <p>Administre os espaços de ensino da sua instituição, assegurando um ambiente adequado para o aprendizado.</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}