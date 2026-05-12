import React, { useState, useEffect } from 'react';
import ProjectCard from './components/ProjectCard';
import './App.css';

function App() {
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('history');

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch('https://lab-monitor-service.onrender.com/api/status');
        const data = await response.json();
        setStatuses(data);
      } catch (error) {
        console.error('Error fetching monitor status:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const projects = [
    {
      title: "Lab Hub (Next.js)",
      description: "Nueva versión del portal central con diseño Holo y alto rendimiento. Desplegado en Cloudflare.",
      tech: ["Next.js 15", "Cloudflare", "TypeScript"],
      githubUrl: "https://github.com/SvarogMyl/lab-hub-nextjs",
      liveUrl: "https://lab-hub-nextjs.yannickvalderasm.workers.dev/",
      status: 'UP'
    },
    {
      title: "Holo Template",
      description: "Plantilla reutilizable con sistema de diseño premium, i18n y componentes de investigación.",
      tech: ["Next.js", "CSS Tokens", "OSS"],
      githubUrl: "https://github.com/SvarogMyl/lab-template-holo",
      status: 'UP'
    },
    {
      title: "Lab Frontend (Legacy)",
      description: "Versión inicial del catálogo de medicamentos y dashboard de gestión.",
      tech: ["Next.js", "Vercel", "React"],
      githubUrl: "https://github.com/SvarogMyl/lab-frontend-nextjs",
      liveUrl: "https://lab-frontend-nextjs.vercel.app/",
      status: statuses.find(s => s.name.includes('Frontend'))?.status || 'UNKNOWN'
    },
    {
      title: "Backend Core",
      description: "Servicio principal encargado de la gestión de ítems y catálogo. Conectado a Supabase y PostgreSQL.",
      tech: ["Java", "Spring Boot", "PostgreSQL", "JWT"],
      githubUrl: "https://github.com/SvarogMyl/lab-spring-postgres",
      liveUrl: "https://lab-spring-postgres.onrender.com/health",
      docsUrl: "https://lab-spring-postgres.onrender.com/swagger-ui/index.html",
      status: statuses.find(s => s.name.includes('Backend'))?.status || 'UNKNOWN'
    },
    {
      title: "Lab Monitor",
      description: "Vigilante del ecosistema. Realiza health-checks periódicos y mantiene los servicios despiertos.",
      tech: ["Node.js", "Express", "Docker", "GH Actions"],
      githubUrl: "https://github.com/SvarogMyl/lab-monitor-service",
      liveUrl: "https://lab-monitor-service.onrender.com/",
      status: 'UP'
    },
    {
      title: "Data Service",
      description: "Pipeline automatizado que sincroniza datos desde Excel Maestro a JSON para el catálogo.",
      tech: ["Python", "Pandas", "GitHub Actions"],
      githubUrl: "https://github.com/SvarogMyl/lab-data-service",
      status: 'UP'
    },
    {
      title: "Auth Service (Go)",
      description: "Microservicio de alta disponibilidad para gestión de identidad y permisos.",
      tech: ["Go", "Gin", "Redis"],
      status: 'PENDING'
    }
  ];

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="container nav-content">
          <div className="logo">LAB<span>HUB</span></div>
          <div className="nav-links">
            <a href="#projects">Proyectos</a>
            <a href="#roadmap">Roadmap</a>
            <a href="#infra">Infraestructura</a>
          </div>
        </div>
      </nav>

      <header className="hero">
        <div className="container">
          <h1 className="hero-title">Laboratorio de <span>Ingeniería Modular</span></h1>
          <p className="hero-subtitle">Visualización dinámica del ecosistema de microservicios y pipelines automatizados.</p>
        </div>
      </header>

      <section id="projects" className="section">
        <div className="container">
          <h2 className="section-title">Ecosistema Actual</h2>
          <div className="project-grid">
            {projects.map((p, i) => (
              <ProjectCard key={i} {...p} />
            ))}
          </div>
        </div>
      </section>

      <section id="infra" className="section alternate">
        <div className="container">
          <h2 className="section-title">Infraestructura & Tech Stack</h2>
          <div className="infra-grid">
            <div className="infra-card">
              <h3>Cloud Providers</h3>
              <ul>
                <li><strong>Render:</strong> Hosting de Backends (Java, Node, Go).</li>
                <li><strong>Vercel:</strong> Despliegue de Frontends React/NextJS.</li>
                <li><strong>Supabase:</strong> Base de Datos Relacional Gestionada.</li>
              </ul>
            </div>
            <div className="infra-card">
              <h3>Tecnologías Core</h3>
              <div className="tech-tags">
                <span>Java 21</span>
                <span>Node.js 20</span>
                <span>Go 1.22</span>
                <span>Python 3.10</span>
                <span>PostgreSQL</span>
                <span>Docker</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="roadmap" className="section">
        <div className="container">
          <h2 className="section-title">Evolución del Proyecto</h2>
          
          <div className="roadmap-tabs">
            <button 
              className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
              onClick={() => setActiveTab('history')}
            >
              Hitos Logrados
            </button>
            <button 
              className={`tab-btn ${activeTab === 'future' ? 'active' : ''}`}
              onClick={() => setActiveTab('future')}
            >
              Ambiciones Futuras
            </button>
          </div>

          <div className="roadmap-timeline">
            {activeTab === 'history' ? (
              <>
                <div className="timeline-item completed">
                  <div className="time">Q1 2026</div>
                  <div className="content">
                    <h3>Foundation</h3>
                    <p>Estructura base en Spring Boot, base de datos en Supabase y despliegue inicial en Render.</p>
                  </div>
                </div>
                <div className="timeline-item completed">
                  <div className="time">Q2 2026</div>
                  <div className="content">
                    <h3>Observability</h3>
                    <p>Implementación del Monitor Service en Node.js y Dashboard de salud en tiempo real.</p>
                  </div>
                </div>
                <div className="timeline-item active">
                  <div className="time">NOW</div>
                  <div className="content">
                    <h3>Holo Hub & Next.js</h3>
                    <p>Implementación del Holo Design System, migración a Next.js y despliegue en Cloudflare Edge.</p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="timeline-item pending">
                  <div className="time">Q3 2026</div>
                  <div className="content">
                    <h3>Hyper-Performance</h3>
                    <p>Reescritura de cuellos de botella en <strong>Rust</strong> e implementación de caché distribuida con <strong>Redis</strong>.</p>
                  </div>
                </div>
                <div className="timeline-item pending">
                  <div className="time">Q4 2026</div>
                  <div className="content">
                    <h3>Intelligent Ecosystem</h3>
                    <p>Integración de agentes inteligentes (LLMs) para análisis predictivo y búsqueda semántica en el catálogo.</p>
                  </div>
                </div>
                <div className="timeline-item pending">
                  <div className="time">2027</div>
                  <div className="content">
                    <h3>Global Scale & Blockchain</h3>
                    <p>Despliegue multi-región, aplicación móvil nativa y trazabilidad inmutable de medicamentos con Blockchain.</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2026 Lab Ecosystem - Diseñado para la escalabilidad.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
