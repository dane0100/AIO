"use client";
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to My Portfolio</h1>
      <p className="text-lg mb-8">Resume, Projects, and More</p>
      {session ? (
        <p>Logged in as {session.user?.name} ({session.user.role})</p>
      ) : (
        <Link href="/api/auth/signin" className="text-blue-500">Login</Link>
      )}
      <Link href="/projects" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">View Projects</Link>
      {/* Add resume section: e.g., <section>Experience: ...</section> */}
    </div>
  );
}