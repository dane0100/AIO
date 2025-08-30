'use client';
import { useEffect, useState } from 'react';

type Project = { id: string; title: string; description: string; tags: string[] };

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-8">Loading...</p>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Projects</h2>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {projects.map(p => (
          <li key={p.id} className="p-4 bg-white rounded shadow">
            <h3 className="font-bold">{p.title}</h3>
            <p>{p.description}</p>
            <span className="text-sm text-gray-500">{p.tags.join(', ')}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}