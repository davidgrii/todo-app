import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const token = req.cookies.get('token')

  if (token) {
    if (pathname === '/login' || pathname === '/register') {
      return NextResponse.redirect(new URL('/todolist', req.url))
    }
  }

  if (!token) {
    if (pathname === '/todolist') {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  if (pathname === '/') {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/login', '/register', '/todolist', '/']
}
