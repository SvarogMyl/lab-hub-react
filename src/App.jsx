import React, { useState, useEffect } from 'react';
import ProjectCard from './components/ProjectCard';
import './App.css';

function App() {
  const [statuses, setStatuses] = useState([]);
  const [dbProjects, setDbProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('history');

  // API Configuration
  const MONITOR_API = 'https://monitor.165.1.125.187.nip.io/api/status';
  const PROJECTS_API = 'https://api.165.1.125.187.nip.io/projects';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statusRes, projectsRes] = await Promise.all([
          fetch(MONITOR_API),
          fetch(PROJECTS_API)
        ]);

        const statusData = await statusRes.json();
        const projectsData = await projectsRes.json();

        setStatuses(statusData);
        setDbProjects(projectsData);
      } catch (error) {
        console.error('Error fetching ecosystem data, using fallback...', error);
        try {
          const fallbackRes = await fetch('/fallback_projects.json');
          if (fallbackRes.ok) {
            const fallbackData = await fallbackRes.json();
            setDbProjects(fallbackData);
          }
        } catch (fbErr) {
          console.error('Error fetching fallback data', fbErr);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  // Map and Sort
  const processedProjects = dbProjects.map(p => {
    const monitorInfo = statuses.find(s => 
      s.url === p.live_url || 
      s.name.toLowerCase().includes(p.title.toLowerCase())
    );

    return {
      title: p.title,
      description: p.description_es,
      tech: p.tech_stack || [],
      githubUrl: p.repo_url,
      liveUrl: p.live_url,
      docsUrl: p.docs_url,
      category: p.category || 'OTHER',
      hosting: p.hosting || 'None',
      status: p.status === 'ARCHIVED' ? 'ARCHIVED' : (monitorInfo ? monitorInfo.status : 'UNKNOWN')
    };
  });

  // Grouping logic
  const categories = [...new Set(processedProjects.map(p => p.category))].sort();
  const groupedProjects = categories.map(cat => ({
    name: cat,
    projects: processedProjects.filter(p => p.category === cat)
  }));

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
          
          {loading && dbProjects.length === 0 ? (
            <div className="loading">Cargando ecosistema...</div>
          ) : (
            <div className="categories-container">
              {groupedProjects.map((group, idx) => (
                <div key={idx} className="category-group">
                  <h3 className="category-label">{group.name}</h3>
                  <div className="project-grid">
                    {group.projects.map((p, i) => (
                      <ProjectCard key={i} {...p} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section id="infra" className="section alternate">
        <div className="container">
          <h2 className="section-title">Infraestructura & Tech Stack</h2>
          <div className="infra-grid">
            <div className="infra-card">
              <h3>Cloud Providers</h3>
              <ul>
                <li><strong>Cloudflare:</strong> Hosting principal de Frontends (Edge Runtime).</li>
                <li><strong>Render:</strong> Hosting de Backends (Java, Node, Go).</li>
                <li><strong>Vercel:</strong> Despliegue secundario de Frontends.</li>
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
