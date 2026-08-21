import React from 'react';
import './Toolbar.css';

const Toolbar = ({ tool, setTool, onToolClick }) => {
  const tools = [
    { id: 'select', label: 'Selecionar', icon: '⬅' },
    { id: 'circle', label: 'Círculo', icon: '●' },
    { id: 'rectangle', label: 'Retângulo', icon: '■' },
    { id: 'text', label: 'Texto', icon: 'A' },
  ];

  return (
    <div className="toolbar">
      <div className="logo">🎨 Canvas App</div>
      <div className="tools">
        {tools.map(t => (
          <button
            key={t.id}
            className={`tool-btn ${tool === t.id ? 'active' : ''}`}
            onClick={() => {
              setTool(t.id);
              onToolClick(t.id);
            }}
            title={t.label}
          >
            {t.icon}
          </button>
        ))}
      </div>
      <div className="actions">
        <span className="version">v0.1.0</span>
      </div>
    </div>
  );
};

export default Toolbar;
