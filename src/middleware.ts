import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (
    !token &&
    !req.nextUrl.pathname.startsWith('/login') &&
    !req.nextUrl.pathname.startsWith('/onboarding') &&
    !req.nextUrl.pathname.startsWith('/verify-request') &&
    req.nextUrl.pathname !== '/'
  ) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
