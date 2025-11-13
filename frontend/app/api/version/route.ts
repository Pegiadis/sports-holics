import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    version: '2024-11-13-DEBUG',
    timestamp: new Date().toISOString(),
    branch: 'feature/fix-bugs',
    hasTestHero: true,
    message: 'If you see this, the new code is deployed!'
  });
}

