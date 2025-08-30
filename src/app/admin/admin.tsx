'use client';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import ProjectForm from '@/components/ProjectForm';

export default function Admin() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') return <p className="p-8">Loading...</p>;
  if (!session || session.user.role !== 'admin') {
    signIn();
    return null;
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <ProjectForm />
      {/* Add list of existing projects with edit/delete */}
    </div>
  );
}