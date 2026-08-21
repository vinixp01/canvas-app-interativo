import React, { useState, useRef } from 'react';
import './App.css';
import Canvas from './components/Canvas';
import Toolbar from './components/Toolbar';
import PropertiesPanel from './components/PropertiesPanel';

function App() {
  const [elements, setElements] = useState([
    {
      id: 1,
      type: 'circle',
      x: 150,
      y: 150,
      width: 100,
      height: 100,
      color: '#E91E63',
      rotation: 0,
    },
  ]);
  const [selectedElement, setSelectedElement] = useState(1);
  const [tool, setTool] = useState('select');

  const addElement = (type) => {
    const newElement = {
      id: Date.now(),
      type: type,
      x: 200,
      y: 200,
      width: type === 'text' ? 20 : 100,
      height: type === 'text' ? 20 : 100,
      color: '#E91E63',
      rotation: 0,
      text: type === 'text' ? 'Texto' : undefined,
    };
    setElements([...elements, newElement]);
    setSelectedElement(newElement.id);
  };

  const updateElement = (id, updates) => {
    setElements(elements.map(el => el.id === id ? { ...el, ...updates } : el));
  };

  const deleteElement = (id) => {
    setElements(elements.filter(el => el.id !== id));
    setSelectedElement(null);
  };

  const handleCanvasClick = (elementId) => {
    setSelectedElement(elementId);
  };

  const handleToolClick = (toolType) => {
    if (toolType === 'select') {
      setTool('select');
    } else {
      addElement(toolType);
      setTool('select');
    }
  };

  return (
    <div className="app">
      <Toolbar 
        tool={tool} 
        setTool={setTool}
        onToolClick={handleToolClick}
      />
      <div className="main-content">
        <Canvas
          elements={elements}
          selectedElement={selectedElement}
          onElementClick={handleCanvasClick}
          onElementUpdate={updateElement}
          tool={tool}
        />
        <PropertiesPanel
          element={selectedElement ? elements.find(el => el.id === selectedElement) : null}
          onUpdate={(updates) => updateElement(selectedElement, updates)}
          onDelete={() => deleteElement(selectedElement)}
        />
      </div>
    </div>
  );
}

export default App;
