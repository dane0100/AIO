import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import path from 'path';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const n = searchParams.get('n') || '10';

  return new Promise((resolve) => {
    const execPath = path.join(process.cwd(), 'cpp_backend/fib');
    exec(`${execPath} ${n}`, (error, stdout, stderr) => {
      if (error || stderr) {
        return resolve(NextResponse.json({ error: 'Computation failed', details: stderr }, { status: 500 }));
      }
      resolve(NextResponse.json({ result: stdout.trim() }));
    });
  });
}