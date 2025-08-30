'use client';
import { useState } from 'react';

export default function ProjectForm() {
  const [formData, setFormData] = useState({ title: '', description: '', tags: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const tagsArray = formData.tags.split(',').map(t => t.trim());
    const response = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, tags: tagsArray }),
    });
    if (!response.ok) {
      setError('Failed to submit');
    } else {
      setFormData({ title: '', description: '', tags: '' });  // Reset
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Title"
        value={formData.title}
        onChange={e => setFormData({ ...formData, title: e.target.value })}
        className="block w-full p-2 border"
        required
      />
      <textarea
        placeholder="Description"
        value={formData.description}
        onChange={e => setFormData({ ...formData, description: e.target.value })}
        className="block w-full p-2 border"
        required
      />
      <input
        type="text"
        placeholder="Tags (comma-separated)"
        value={formData.tags}
        onChange={e => setFormData({ ...formData, tags: e.target.value })}
        className="block w-full p-2 border"
      />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Add Project</button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}