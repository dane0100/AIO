import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET() {
  try {
    const projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Fetch projects error:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const data = await request.json();
    const project = await prisma.project.create({ data });
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Fetch projects error:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}
