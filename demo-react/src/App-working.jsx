import React, { useEffect, useRef, useState } from 'react';

function App() {
  const [Framer, setFramer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    import('../../dist/framer.js')  
      .then(module => {
        const FramerLib = module.default;
        console.log('✓ Framer loaded:', FramerLib);
        console.log('✓ Framer.Layer:', FramerLib.Layer);
        console.log('✓ Framer.CurrentContext:', FramerLib.CurrentContext);
        console.log('✓ Framer.Loop:', FramerLib.Loop);
        
        // Ensure Framer is globally available
        window.Framer = FramerLib;
        
        // Make sure animation loop is running
        if (FramerLib.Loop && !FramerLib.Loop.isRunning) {
          console.log('Starting animation loop...');
          FramerLib.Loop.start();
        }
        
        setFramer(FramerLib);
        setLoading(false);
      })
      .catch(err => {
        console.error('✗ Failed to load Framer:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1>Loading Framer.js...</h1>
    </div>;
  }

  if (error) {
    return <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1>Error loading Framer</h1>
      <p style={{ color: 'red' }}>{error}</p>
    </div>;
  }

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', backgroundColor: '#0a0a0a', color: '#fff', minHeight: '100vh' }}>
      <header style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '48px', margin: '0 0 10px 0' }}>🎨 Framer.js Animation Showcase</h1>
        <p style={{ color: '#888', fontSize: '18px' }}>Modern ES6 build running in React 18 • Click any card to animate</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px', maxWidth: '1400px', margin: '0 auto' }}>
        <AnimationCard 
          Framer={Framer}
          title="1. Position Animation"
          description="Smooth horizontal movement"
          color="#667eea"
          animate={(layer) => {
            return layer.animate({
              properties: { x: 220 },
              curve: 'ease',
              time: 1
            });
          }}
        />

        <AnimationCard 
          Framer={Framer}
          title="2. Spring Physics"
          description="Bouncy spring effect"
          color="#764ba2"
          animate={(layer) => {
            layer.animate({
              properties: { y: 180 },
              curve: 'spring(300, 20, 0)',
              time: 2
            });
          }}
        />

        <AnimationCard 
          Framer={Framer}
          title="3. Rotation"
          description="360° spin animation"
          color="#f093fb"
          animate={(layer) => {
            layer.animate({
              properties: { rotation: 360 },
              curve: 'ease-in-out',
              time: 1.5
            });
          }}
        />

        <AnimationCard 
          Framer={Framer}
          title="4. Scale"
          description="Grow with spring"
          color="#4facfe"
          animate={(layer) => {
            layer.animate({
              properties: { scale: 1.8 },
              curve: 'spring(200, 15, 0)',
              time: 1.5
            });
          }}
        />

        <AnimationCard 
          Framer={Framer}
          title="5. Opacity Fade"
          description="Fade in and out"
          color="#43e97b"
          animate={(layer) => {
            layer.animate({
              properties: { opacity: 0.2 },
              curve: 'ease',
              time: 0.8
            });
            setTimeout(() => {
              layer.animate({
                properties: { opacity: 1 },
                curve: 'ease',
                time: 0.8
              });
            }, 800);
          }}
        />

        <AnimationCard 
          Framer={Framer}
          title="6. Combined Transform"
          description="Move, rotate, and scale"
          color="#30cfd0"
          animate={(layer) => {
            layer.animate({
              properties: { 
                x: 180,
                rotation: 180,
                scale: 1.4
              },
              curve: 'spring(250, 18, 0)',
              time: 2
            });
          }}
        />

        <AnimationCard 
          Framer={Framer}
          title="7. Elastic Bounce"
          description="Elastic spring curve"
          color="#a8edea"
          animate={(layer) => {
            layer.animate({
              properties: { x: 200 },
              curve: 'spring(150, 8, 0)',
              time: 2
            });
          }}
        />

        <AnimationCard 
          Framer={Framer}
          title="8. Sequential"
          description="Chained animations"
          color="#ff6b6b"
          animate={(layer) => {
            layer.animate({
              properties: { y: 140 },
              curve: 'ease',
              time: 0.5
            });
            setTimeout(() => {
              layer.animate({
                properties: { scale: 1.5 },
                curve: 'spring(200, 12, 0)',
                time: 0.8
              });
            }, 500);
          }}
        />

        <AnimationCard 
          Framer={Framer}
          title="9. Spin & Grow"
          description="720° rotation + scale"
          color="#fd79a8"
          animate={(layer) => {
            layer.animate({
              properties: { 
                rotation: 720,
                scale: 2
              },
              curve: 'ease-in-out',
              time: 2
            });
          }}
        />

        <AnimationCard 
          Framer={Framer}
          title="10. Bezier Curve"
          description="Custom easing"
          color="#ffeaa7"
          animate={(layer) => {
            layer.animate({
              properties: { x: 200 },
              curve: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
              time: 1.5
            });
          }}
        />

        <AnimationCard 
          Framer={Framer}
          title="11. Bounce Effect"
          description="Strong spring bounce"
          color="#a29bfe"
          animate={(layer) => {
            layer.animate({
              properties: { y: 170 },
              curve: 'spring(400, 25, 0)',
              time: 1.5
            });
          }}
        />

        <AnimationCard 
          Framer={Framer}
          title="12. Complex Multi"
          description="All properties animated"
          color="#00b894"
          animate={(layer) => {
            layer.animate({
              properties: { 
                x: 150,
                y: 120,
                rotation: 270,
                scale: 1.6,
                opacity: 0.8
              },
              curve: 'spring(200, 20, 0)',
              time: 2.5
            });
          }}
        />
      </div>
    </div>
  );
}

function AnimationCard({ Framer, title, description, color, animate }) {
  const containerRef = useRef(null);
  const layerRef = useRef(null);
  const [status, setStatus] = useState('Ready');

  const runAnimation = () => {
    try {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }

      if (layerRef.current) {
        try {
          layerRef.current.destroy();
        } catch (e) {}
      }

      const layer = new Framer.Layer({
        x: 50,
        y: 50,
        width: 80,
        height: 80,
        backgroundColor: color,
        borderRadius: 12
      });

      console.log('✓ Layer created:', layer);
      console.log('  - Element:', layer._element);
      console.log('  - Position:', { x: layer.x, y: layer.y });
      console.log('  - Size:', { width: layer.width, height: layer.height });

      layerRef.current = layer;
      
      // Manually append to container since we're using a DOM element not a Framer parent
      containerRef.current.appendChild(layer._element);
      
      console.log('  - Appended to container');

      const animation = animate(layer);
      console.log('✓ Animation started:', animation);
      setStatus('✓ Animating');

      setTimeout(() => setStatus('Ready'), 2500);
    } catch (error) {
      setStatus('✗ Error: ' + error.message);
      console.error('Animation error:', error);
    }
  };

  useEffect(() => {
    return () => {
      if (layerRef.current) {
        try {
          layerRef.current.destroy();
        } catch (e) {}
      }
    };
  }, []);

  return (
    <div 
      onClick={runAnimation}
      style={{
        backgroundColor: '#1a1a1a',
        borderRadius: '16px',
        padding: '24px',
        cursor: 'pointer',
        border: '1px solid #333',
        transition: 'all 0.3s ease',
        ':hover': { borderColor: color }
      }}
      onMouseEnter={(e) => e.currentTarget.style.borderColor = color}
      onMouseLeave={(e) => e.currentTarget.style.borderColor = '#333'}
    >
      <h3 style={{ margin: '0 0 8px 0', fontSize: '20px', color: color }}>{title}</h3>
      <p style={{ margin: '0 0 20px 0', color: '#888', fontSize: '14px' }}>{description}</p>
      
      <div 
        ref={containerRef}
        style={{
          width: '100%',
          height: '280px',
          backgroundColor: '#0a0a0a',
          borderRadius: '12px',
          position: 'relative',
          overflow: 'hidden',
          marginBottom: '16px'
        }}
      />

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <button 
          onClick={(e) => { e.stopPropagation(); runAnimation(); }}
          style={{
            padding: '10px 20px',
            backgroundColor: color,
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold'
          }}
        >
          Run
        </button>
        <span style={{ 
          fontSize: '13px', 
          color: status.includes('✗') ? '#ff6b6b' : '#888' 
        }}>
          {status}
        </span>
      </div>
    </div>
  );
}

export default App;
