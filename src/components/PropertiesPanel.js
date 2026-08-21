import React from 'react';
import './PropertiesPanel.css';

const PropertiesPanel = ({ element, onUpdate, onDelete }) => {
  if (!element) {
    return (
      <div className="properties-panel">
        <div className="properties-header">Propriedades</div>
        <div className="empty-state">Selecione um elemento</div>
      </div>
    );
  }

  return (
    <div className="properties-panel">
      <div className="properties-header">Propriedades</div>
      
      <div className="element-info">
        <div className="element-type">{element.type.toUpperCase()}</div>
      </div>

      <div className="property-group">
        <label>Posição X</label>
        <input
          type="number"
          value={Math.round(element.x)}
          onChange={(e) => onUpdate({ x: parseFloat(e.target.value) })}
        />
      </div>

      <div className="property-group">
        <label>Posição Y</label>
        <input
          type="number"
          value={Math.round(element.y)}
          onChange={(e) => onUpdate({ y: parseFloat(e.target.value) })}
        />
      </div>

      <div className="property-group">
        <label>Largura</label>
        <input
          type="number"
          value={Math.round(element.width)}
          onChange={(e) => onUpdate({ width: parseFloat(e.target.value) })}
        />
      </div>

      <div className="property-group">
        <label>Altura</label>
        <input
          type="number"
          value={Math.round(element.height)}
          onChange={(e) => onUpdate({ height: parseFloat(e.target.value) })}
        />
      </div>

      <div className="property-group">
        <label>Cor</label>
        <input
          type="color"
          value={element.color}
          onChange={(e) => onUpdate({ color: e.target.value })}
        />
      </div>

      <div className="property-group">
        <label>Rotação (°)</label>
        <input
          type="number"
          value={element.rotation || 0}
          onChange={(e) => onUpdate({ rotation: parseFloat(e.target.value) })}
        />
      </div>

      {element.type === 'text' && (
        <div className="property-group">
          <label>Texto</label>
          <input
            type="text"
            value={element.text || ''}
            onChange={(e) => onUpdate({ text: e.target.value })}
          />
        </div>
      )}

      <button className="btn-delete" onClick={onDelete}>
        🗑️ Deletar
      </button>
    </div>
  );
};

export default PropertiesPanel;
