'use client';
import { useState } from 'react';

export default function FibDemo() {
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const compute = async () => {
    try {
      const res = await fetch('/api/fib?n=40');
      if (!res.ok) throw new Error('Failed');
      const data = await res.json();
      setResult(data.result);
      setError('');
    } catch {
      setError('Computation error');
    }
  };

  return (
    <div className="p-4">
      <button onClick={compute} className="bg-blue-500 text-white p-2 rounded">Compute Fib(40) via C++</button>
      <p>Result: {result}</p>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}