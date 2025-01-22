import { NextResponse } from "next/server";


export function middleware(req) {
  const token = req.cookies.get('authToken');
  console.log('Middleware triggered for:', req.nextUrl.pathname);

  if (!token) {
      console.log('No token found, redirecting to /login');
      return NextResponse.redirect(new URL('/login', req.url));
  }

  console.log('Token found, proceeding');
  return NextResponse.next();
}


export const config = {
  matcher: ['/scan/:path*', '/', '/login/:path*'],
};
