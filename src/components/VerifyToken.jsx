import axios from 'axios';
import { useState } from 'react';

function VerifyToken({ token }) {
  const [result, setResult] = useState(null);

  const handleVerify = async () => {
    try {
      const res = await axios.post('http://localhost:5000/verify-token', { token });
      setResult(res.data);
    } catch (err) {
      setResult({ error: err.response?.data?.message || 'Invalid token' });
    }
  };

  return (
    <div>
      <h2>Verify Token</h2>
      <button onClick={handleVerify}>Verify</button>
      <pre>{result ? JSON.stringify(result, null, 2) : "Click to verify token"}</pre>
    </div>
  );
}

export default VerifyToken;
