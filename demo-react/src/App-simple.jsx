import React from 'react';

function App() {
  const [status, setStatus] = React.useState('Loading...');

  React.useEffect(() => {
    try {
      // Test 1: Check if module loads
      import('framerjs')
        .then(module => {
          const Framer = module.default || module;
          console.log('Framer loaded:', Framer);
          console.log('Available APIs:', Object.keys(Framer).slice(0, 20));
          setStatus('Framer loaded successfully! APIs: ' + Object.keys(Framer).slice(0, 15).join(', ') + '...');
          
          // Test creating a simple layer
          try {
            const testDiv = document.getElementById('test-container');
            if (testDiv && Framer.Layer) {
              const layer = new Framer.Layer({
                parent: testDiv,
                width: 100,
                height: 100,
                backgroundColor: '#00AAFF',
                borderRadius: 10
              });
              console.log('✓ Layer created successfully:', layer);
            }
          } catch (err) {
            console.error('Layer creation error:', err);
          }
        })
        .catch(err => {
          console.error('Failed to load Framer:', err);
          setStatus('Error loading Framer: ' + err.message);
        });
    } catch (error) {
      console.error('Error:', error);
      setStatus('Error: ' + error.message);
    }
  }, []);

  return (
    <div style={{ 
      padding: '40px', 
      fontFamily: 'monospace', 
      backgroundColor: '#0a0a0a', 
      color: '#fff',
      minHeight: '100vh' 
    }}>
      <h1>Framer.js Test</h1>
      <p>Status: {status}</p>
      <div id="test-container" style={{
        width: '400px',
        height: '400px',
        backgroundColor: '#1a1a1a',
        marginTop: '20px',
        position: 'relative'
      }} />
    </div>
  );
}

export default App;
