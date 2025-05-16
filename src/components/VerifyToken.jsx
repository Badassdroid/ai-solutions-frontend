import axios from 'axios';
import { useState } from 'react';

function VerifyToken() {
  const [token, setToken] = useState('');
  const [result, setResult] = useState(null);

  const handleVerify = async () => {
    try {
      const res = await axios.post('https://ai-solutions-backend.onrender.com/verify-token', {
        token,
      });

      setResult(res.data);
    } catch (err) {
      setResult({
        error: err.response?.data?.message || 'Invalid token or server error',
      });
    }
  };

  return (
    <div style={{ padding: '1rem', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Verify Token</h2>
      <input
        type="text"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="Enter your token"
        style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
      />
      <button
        onClick={handleVerify}
        style={{
          padding: '0.5rem 1rem',
          cursor: 'pointer',
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
        }}
      >
        Verify
      </button>
      <pre style={{ marginTop: '1rem', backgroundColor: '#f4f4f4', padding: '1rem' }}>
        {result ? JSON.stringify(result, null, 2) : 'Result will appear here...'}
      </pre>
    </div>
  );
}

export default VerifyToken;
