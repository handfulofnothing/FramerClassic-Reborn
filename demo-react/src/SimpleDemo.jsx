import React, { useEffect, useRef, useState } from 'react';

function SimpleDemo() {
  const containerRef = useRef(null);
  const [status, setStatus] = useState('Initializing Framer...');
  const [Framer, setFramer] = useState(null);
  const layerRef = useRef(null);

  useEffect(() => {
    // Dynamically import Framer to ensure proper initialization
    import('framerjs')
      .then(module => {
        const FramerLib = module.default;
        console.log('Framer loaded:', FramerLib);
        console.log('Framer.Layer:', FramerLib.Layer);
        setFramer(FramerLib);
        setStatus('Ready! Click button to test animation');
      })
      .catch(err => {
        console.error('Failed to load Framer:', err);
        setStatus(`Failed to load: ${err.message}`);
      });

    return () => {
      // Cleanup on unmount
      if (layerRef.current) {
        try {
          layerRef.current.destroy();
        } catch (e) {}
      }
    };
  }, []);

  const testAnimation = () => {
    if (!Framer) {
      setStatus('Framer not loaded yet!');
      return;
    }

    try {
      // Clear container
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }

      // Clean up previous layer
      if (layerRef.current) {
        try {
          layerRef.current.destroy();
        } catch (e) {}
      }

      console.log('Creating layer with Framer.Layer:', Framer.Layer);

      // Create a Framer layer
      const layer = new Framer.Layer({
        x: 50,
        y: 50,
        width: 100,
        height: 100,
        backgroundColor: '#667eea',
        borderRadius: 20
      });

      console.log('Layer created:', layer);
      layerRef.current = layer;

      // Add to DOM
      if (layer._element) {
        containerRef.current.appendChild(layer._element);
        console.log('Layer element appended to DOM');
      }

      // Animate it
      layer.animate({
        properties: { 
          x: 250,
          rotation: 360,
          scale: 1.5
        },
        curve: 'spring(200, 20, 0)',
        time: 2
      });

      setStatus('✓ Animation running! The box should move, rotate, and scale.');
    } catch (error) {
      setStatus(`✗ Error: ${error.message}`);
      console.error('Animation error:', error);
      console.error('Stack:', error.stack);
    }
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1>🎨 Framer.js Test in React</h1>
      <p style={{ color: '#666' }}>
        This demonstrates Framer.js working in a React application with animations.
      </p>

      <button 
        onClick={testAnimation}
        disabled={!Framer}
        style={{
          padding: '12px 24px',
          fontSize: '16px',
          backgroundColor: Framer ? '#667eea' : '#ccc',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: Framer ? 'pointer' : 'not-allowed',
          marginBottom: '20px'
        }}
      >
        Run Animation
      </button>

      <div 
        style={{
          marginTop: '10px',
          padding: '10px',
          backgroundColor: status.includes('✗') ? '#fee' : '#f0f0f0',
          borderRadius: '4px',
          color: status.includes('✗') ? '#c00' : '#000'
        }}
      >
        {status}
      </div>

      <div 
        ref={containerRef}
        style={{
          marginTop: '30px',
          width: '100%',
          height: '300px',
          backgroundColor: '#1a1a1a',
          borderRadius: '12px',
          position: 'relative',
          overflow: 'hidden'
        }}
      />

      <div style={{ marginTop: '30px', color: '#999', fontSize: '14px' }}>
        <h3>What's happening?</h3>
        <ul>
          <li>✓ Framer.js is imported as an ES6 module</li>
          <li>✓ Layer is created using Framer.Layer</li>
          <li>✓ Animation uses spring physics (bounce effect)</li>
          <li>✓ Multiple properties animated simultaneously (position, rotation, scale)</li>
        </ul>
        {Framer && (
          <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#e8f5e9', borderRadius: '4px' }}>
            <strong>✓ Framer loaded successfully!</strong>
            <br />
            Available: {Object.keys(Framer).slice(0, 10).join(', ')}...
          </div>
        )}
      </div>
    </div>
  );
}

export default SimpleDemo;
