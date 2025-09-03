'use client';
import { useEffect, useState } from 'react';

interface Project {  // Improved: Use interface for better TS
  id: string;
  title: string;
  description: string;
  tags: string[];
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[] | null>(null);  // Allow null initially
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);  // Add error state

  useEffect(() => {
    fetch('/api/projects')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch');
        }
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setProjects(data);
        } else {
          setError('Invalid data format');
        }
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-8">Loading...</p>;
  if (error) return <p className="p-8 text-red-500">Error: {error}</p>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Projects</h2>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {projects?.map(p => (  // Optional chaining for safety
          <li key={p.id} className="p-4 bg-white rounded shadow">
            <h3 className="font-bold">{p.title}</h3>
            <p>{p.description}</p>
            <span className="text-sm text-gray-500">{p.tags.join(', ')}</span>
          </li>
        )) || <p>No projects found.</p>}
      </ul>
    </div>
  );
}