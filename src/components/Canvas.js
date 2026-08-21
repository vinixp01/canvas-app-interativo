import React, { useRef, useEffect, useState, forwardRef } from 'react';
import './Canvas.css';

const Canvas = forwardRef(({ elements, selectedElement, onElementClick, onElementUpdate }, ref) => {
  const canvasRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizing, setResizing] = useState(false);
  const [resizeHandle, setResizeHandle] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    
    // Limpar canvas
    ctx.fillStyle = '#3a3a3a';
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Desenhar grid
    drawGrid(ctx, rect.width, rect.height);

    // Desenhar elementos
    elements.forEach(element => {
      drawElement(ctx, element, selectedElement === element.id);
    });
  }, [elements, selectedElement]);

  const drawGrid = (ctx, width, height) => {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    const gridSize = 20;

    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  };

  const drawElement = (ctx, element, isSelected) => {
    ctx.save();
    ctx.translate(element.x + element.width / 2, element.y + element.height / 2);
    ctx.rotate((element.rotation * Math.PI) / 180);

    // Desenhar elemento
    if (element.type === 'circle') {
      ctx.fillStyle = element.color;
      ctx.beginPath();
      ctx.arc(0, 0, element.width / 2, 0, Math.PI * 2);
      ctx.fill();
    } else if (element.type === 'rectangle') {
      ctx.fillStyle = element.color;
      ctx.fillRect(-element.width / 2, -element.height / 2, element.width, element.height);
    } else if (element.type === 'text') {
      ctx.font = `bold ${element.width}px Arial`;
      ctx.fillStyle = element.color;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(element.text || 'E', 0, 0);
    }

    // Desenhar seleção
    if (isSelected) {
      ctx.strokeStyle = '#00ff00';
      ctx.lineWidth = 2;
      ctx.strokeRect(-element.width / 2, -element.height / 2, element.width, element.height);

      // Desenhar handles
      const handleSize = 6;
      ctx.fillStyle = '#00ff00';
      ctx.fillRect(
        -element.width / 2 - handleSize / 2,
        -element.height / 2 - handleSize / 2,
        handleSize,
        handleSize
      );
      ctx.fillRect(
        element.width / 2 - handleSize / 2,
        element.height / 2 - handleSize / 2,
        handleSize,
        handleSize
      );
    }

    ctx.restore();
  };

  const getElementAtPoint = (x, y) => {
    for (let i = elements.length - 1; i >= 0; i--) {
      const el = elements[i];
      if (
        x >= el.x &&
        x <= el.x + el.width &&
        y >= el.y &&
        y <= el.y + el.height
      ) {
        return el.id;
      }
    }
    return null;
  };

  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const elementId = getElementAtPoint(x, y);
    if (elementId) {
      onElementClick(elementId);
      const element = elements.find(el => el.id === elementId);
      setDragOffset({ x: x - element.x, y: y - element.y });
      setDragging(true);
    }
  };

  const handleMouseMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (dragging && selectedElement) {
      const element = elements.find(el => el.id === selectedElement);
      if (element) {
        onElementUpdate(selectedElement, {
          x: Math.max(0, x - dragOffset.x),
          y: Math.max(0, y - dragOffset.y),
        });
      }
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
    setResizing(false);
  };

  return (
    <div className="canvas-container">
      <canvas
        ref={canvasRef}
        className="canvas"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
    </div>
  );
});

export default Canvas;
