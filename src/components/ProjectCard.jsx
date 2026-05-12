import React from 'react';
import './ProjectCard.css';

const ProjectCard = ({ title, description, tech, status, githubUrl, liveUrl, docsUrl }) => {
  const getStatusColor = (s) => {
    switch (s) {
      case 'UP': return 'var(--accent-green)';
      case 'DOWN': return '#ef4444';
      case 'PENDING': return 'var(--accent-blue)';
      default: return 'var(--text-secondary)';
    }
  };

  return (
    <div className="project-card">
      <div className="card-header">
        <h3 className="project-title">{title}</h3>
        {status === 'PENDING' ? (
          <span className="status-badge pending">COMING SOON</span>
        ) : (
          <div className="status-dot" style={{ backgroundColor: getStatusColor(status) }}></div>
        )}
      </div>
      <p className="project-desc">{description}</p>
      <div className="tech-stack">
        {tech.map((t, i) => (
          <span key={i} className="tech-badge">{t}</span>
        ))}
      </div>
      <div className="card-actions">
        {githubUrl && <a href={githubUrl} target="_blank" rel="noreferrer" className="btn btn-secondary">GitHub</a>}
        {docsUrl && <a href={docsUrl} target="_blank" rel="noreferrer" className="btn btn-secondary">API Docs</a>}
        {liveUrl && <a href={liveUrl} target="_blank" rel="noreferrer" className="btn btn-primary">Live Demo</a>}
      </div>
    </div>
  );
};

export default ProjectCard;
