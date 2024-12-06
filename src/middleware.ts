import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const config = {
  matcher: '/:path*',
}

export function middleware(request: NextRequest) {
  // Just pass through the request
  return NextResponse.next()
}

// Enable edge runtime for middleware
export const runtime = 'edge'; 