import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  if (!token) {
    return new NextResponse(null, { status: 401 });
  }

  return new NextResponse(null, { status: 200 });
} 