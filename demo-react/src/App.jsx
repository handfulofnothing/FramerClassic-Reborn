import React, { useEffect, useRef, useState } from 'react';
import Framer from '../../dist/framer.js';

function AnimationDemo({ title, description, animationFn }) {
  const canvasRef = useRef(null);
  const [status, setStatus] = useState('');
  const layersRef = useRef([]);

  useEffect(() => {
    if (canvasRef.current && !layersRef.current.length) {
      try {
        animationFn(canvasRef.current, Framer, layersRef);
        setStatus('✓ Ready - Click to animate');
      } catch (error) {
        setStatus(`✗ Error: ${error.message}`);
        console.error(`Error in ${title}:`, error);
      }
    }

    return () => {
      // Cleanup layers
      layersRef.current.forEach(layer => {
        try {
          layer.destroy?.();
        } catch (e) {
          // Ignore cleanup errors
        }
      });
      layersRef.current = [];
      if (canvasRef.current) {
        canvasRef.current.innerHTML = '';
      }
    };
  }, []);

  const runAnimation = () => {
    try {
      animationFn(canvasRef.current, Framer, layersRef);
      setStatus('✓ Animation running');
    } catch (error) {
      setStatus(`✗ ${error.message}`);
      console.error(`Error running ${title}:`, error);
    }
  };

  const reset = () => {
    layersRef.current.forEach(layer => {
      try {
        layer.destroy?.();
      } catch (e) {}
    });
    layersRef.current = [];
    if (canvasRef.current) {
      canvasRef.current.innerHTML = '';
    }
    setStatus('Reset');
  };

  return (
    <div className="demo-card">
      <h2>{title}</h2>
      <p>{description}</p>
      <div ref={canvasRef} className="demo-canvas" onClick={runAnimation} />
      <div className="controls">
        <button className="btn btn-primary" onClick={runAnimation}>
          Run Animation
        </button>
        <button className="btn" onClick={reset}>
          Reset
        </button>
      </div>
      {status && (
        <div className={`status ${status.includes('✗') ? 'error' : ''}`}>
          {status}
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <div className="container">
      <div className="header">
        <h1>Framer.js Animation Library</h1>
        <p>
          Comprehensive test of all animation features. Click any box to trigger the animation.
        </p>
      </div>

      <div className="demo-grid">
        {/* 1. Basic Layer Animation */}
        <AnimationDemo
          title="Basic Layer Animation"
          description="Simple layer with smooth position animation using bezier curve"
          animationFn={(container, Framer, layersRef) => {
            const layer = new Framer.Layer({
              parent: container,
              x: 50,
              y: 100,
              width: 100,
              height: 100,
              backgroundColor: '#667eea',
              borderRadius: 12
            });
            layersRef.current.push(layer);
            
            layer.animate({
              x: container.offsetWidth - 150,
              options: {
                curve: 'ease',
                time: 1
              }
            });
          }}
        />

        {/* 2. Spring Animation */}
        <AnimationDemo
          title="Spring Physics"
          description="Natural spring physics animation with bounce effect"
          animationFn={(container, Framer, layersRef) => {
            const layer = new Framer.Layer({
              parent: container,
              x: container.offsetWidth / 2 - 50,
              y: 50,
              width: 100,
              height: 100,
              backgroundColor: '#764ba2',
              borderRadius: 50
            });
            layersRef.current.push(layer);
            
            layer.animate({
              y: container.offsetHeight - 150,
              options: {
                curve: 'spring(150,10,0)',
                time: 1
              }
            });
          }}
        />

        {/* 3. Rotation Animation */}
        <AnimationDemo
          title="Rotation & Scale"
          description="Combined rotation and scale animation"
          animationFn={(container, Framer, layersRef) => {
            const layer = new Framer.Layer({
              parent: container,
              x: container.offsetWidth / 2 - 50,
              y: container.offsetHeight / 2 - 50,
              width: 100,
              height: 100,
              backgroundColor: '#2ed573',
              borderRadius: 12
            });
            layersRef.current.push(layer);
            
            layer.animate({
              rotation: 360,
              scale: 1.5,
              options: {
                curve: 'ease-in-out',
                time: 2
              }
            });
          }}
        />

        {/* 4. Opacity Animation */}
        <AnimationDemo
          title="Fade In/Out"
          description="Smooth opacity transitions with color change"
          animationFn={(container, Framer, layersRef) => {
            const layer = new Framer.Layer({
              parent: container,
              x: container.offsetWidth / 2 - 75,
              y: container.offsetHeight / 2 - 75,
              width: 150,
              height: 150,
              backgroundColor: '#ffa502',
              borderRadius: 75,
              opacity: 0.2
            });
            layersRef.current.push(layer);
            
            layer.animate({
              opacity: 1,
              backgroundColor: '#ff6348',
              options: {
                curve: 'ease',
                time: 1.5
              }
            });
          }}
        />

        {/* 5. Path Animation */}
        <AnimationDemo
          title="Path Animation"
          description="Animate along a complex path"
          animationFn={(container, Framer, layersRef) => {
            const layer = new Framer.Layer({
              parent: container,
              x: 50,
              y: container.offsetHeight / 2 - 25,
              width: 50,
              height: 50,
              backgroundColor: '#1e90ff',
              borderRadius: 25
            });
            layersRef.current.push(layer);
            
            const animations = [
              { x: container.offsetWidth - 100, y: 50 },
              { x: container.offsetWidth - 100, y: container.offsetHeight - 100 },
              { x: 50, y: container.offsetHeight - 100 },
              { x: 50, y: container.offsetHeight / 2 - 25 }
            ];
            
            let index = 0;
            const animateNext = () => {
              layer.animate({
                ...animations[index],
                options: {
                  curve: 'ease-in-out',
                  time: 0.5
                }
              }).on('end', () => {
                index = (index + 1) % animations.length;
                if (index > 0) animateNext();
              });
            };
            animateNext();
          }}
        />

        {/* 6. States & Transitions */}
        <AnimationDemo
          title="State Machine"
          description="Layer with multiple states and transitions"
          animationFn={(container, Framer, layersRef) => {
            const layer = new Framer.Layer({
              parent: container,
              x: container.offsetWidth / 2 - 60,
              y: container.offsetHeight / 2 - 30,
              width: 120,
              height: 60,
              backgroundColor: '#c44569',
              borderRadius: 30
            });
            layersRef.current.push(layer);
            
            layer.states = {
              stateA: { scale: 1, rotation: 0, backgroundColor: '#c44569' },
              stateB: { scale: 1.5, rotation: 180, backgroundColor: '#f8b500' },
              stateC: { scale: 0.8, rotation: 360, backgroundColor: '#0fbcf9' }
            };
            
            layer.animate('stateB', { curve: 'ease', time: 1 });
            setTimeout(() => {
              layer.animate('stateC', { curve: 'ease', time: 1 });
            }, 1200);
          }}
        />

        {/* 7. Draggable Layer */}
        <AnimationDemo
          title="Drag & Drop"
          description="Draggable layer with momentum (try dragging it!)"
          animationFn={(container, Framer, layersRef) => {
            const layer = new Framer.Layer({
              parent: container,
              x: container.offsetWidth / 2 - 50,
              y: container.offsetHeight / 2 - 50,
              width: 100,
              height: 100,
              backgroundColor: '#ff6b81',
              borderRadius: 12
            });
            layersRef.current.push(layer);
            
            layer.draggable.enabled = true;
            layer.draggable.momentum = true;
          }}
        />

        {/* 8. Text Animation */}
        <AnimationDemo
          title="Text Layer"
          description="Animated text with styling"
          animationFn={(container, Framer, layersRef) => {
            const text = new Framer.TextLayer({
              parent: container,
              text: 'Hello Framer!',
              fontSize: 32,
              fontWeight: 700,
              color: '#fff',
              textAlign: 'center',
              x: 0,
              y: container.offsetHeight / 2 - 20,
              width: container.offsetWidth,
              opacity: 0,
              scale: 0.5
            });
            layersRef.current.push(text);
            
            text.animate({
              opacity: 1,
              scale: 1,
              options: {
                curve: 'spring(200,20,0)',
                time: 1
              }
            });
          }}
        />

        {/* 9. Multiple Layers */}
        <AnimationDemo
          title="Animation Group"
          description="Orchestrate multiple animations together"
          animationFn={(container, Framer, layersRef) => {
            const colors = ['#667eea', '#764ba2', '#2ed573', '#ffa502', '#ff6348'];
            
            colors.forEach((color, i) => {
              const layer = new Framer.Layer({
                parent: container,
                x: 30 + i * 60,
                y: container.offsetHeight / 2 - 25,
                width: 50,
                height: 50,
                backgroundColor: color,
                borderRadius: 25,
                opacity: 0,
                scale: 0
              });
              layersRef.current.push(layer);
              
              setTimeout(() => {
                layer.animate({
                  opacity: 1,
                  scale: 1,
                  y: container.offsetHeight / 2 - 100,
                  options: {
                    curve: 'spring(200,15,0)',
                    time: 0.5
                  }
                });
              }, i * 100);
            });
          }}
        />

        {/* 10. Size Animation */}
        <AnimationDemo
          title="Size & Position"
          description="Animate size and position together"
          animationFn={(container, Framer, layersRef) => {
            const layer = new Framer.Layer({
              parent: container,
              x: container.offsetWidth / 2 - 50,
              y: container.offsetHeight / 2 - 50,
              width: 100,
              height: 100,
              backgroundColor: '#9b59b6',
              borderRadius: 12
            });
            layersRef.current.push(layer);
            
            layer.animate({
              width: 200,
              height: 150,
              x: container.offsetWidth / 2 - 100,
              y: container.offsetHeight / 2 - 75,
              borderRadius: 75,
              options: {
                curve: 'ease-out',
                time: 1.5
              }
            });
          }}
        />

        {/* 11. Background Layer */}
        <AnimationDemo
          title="Background Animation"
          description="Animate background colors"
          animationFn={(container, Framer, layersRef) => {
            const bg = new Framer.Layer({
              parent: container,
              x: 0,
              y: 0,
              width: container.offsetWidth,
              height: container.offsetHeight,
              backgroundColor: '#667eea'
            });
            layersRef.current.push(bg);
            
            bg.animate({
              backgroundColor: '#2ed573',
              options: {
                curve: 'ease-in-out',
                time: 2
              }
            });
            
            setTimeout(() => {
              bg.animate({
                backgroundColor: '#ffa502',
                options: {
                  curve: 'ease-in-out',
                  time: 2
                }
              });
            }, 2000);
          }}
        />

        {/* 12. Combined Effects */}
        <AnimationDemo
          title="Combined Effects"
          description="Multiple properties animated simultaneously"
          animationFn={(container, Framer, layersRef) => {
            const layer = new Framer.Layer({
              parent: container,
              x: container.offsetWidth / 2 - 60,
              y: container.offsetHeight / 2 - 60,
              width: 120,
              height: 120,
              backgroundColor: '#e74c3c',
              borderRadius: 12,
              opacity: 0.3,
              scale: 0.5,
              rotation: 0
            });
            layersRef.current.push(layer);
            
            layer.animate({
              opacity: 1,
              scale: 1.2,
              rotation: 180,
              borderRadius: 60,
              backgroundColor: '#3498db',
              options: {
                curve: 'ease-in-out',
                time: 2
              }
            });
          }}
        />
      </div>
    </div>
  );
}

export default App;
