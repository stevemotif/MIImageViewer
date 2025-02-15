import { NextResponse } from "next/server";


export function middleware(req) {
  console.log('Middleware triggered for:', req.nextUrl.pathname);

  const token = req.cookies.get('authToken');
  if (!token) {
    console.log('No token found. Redirecting to /login');
    return NextResponse.redirect(new URL('/account/login', req.url));
  }

  console.log('Token found. Proceeding to the next handler.');
  return NextResponse.next();
}


export const config = {
  matcher: ['/account/scan/:path*', '/account/scan'],
};
