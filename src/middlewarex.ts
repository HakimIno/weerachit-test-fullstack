// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export function middleware(request: NextRequest) {
//     const url = request.nextUrl.clone();
//     const usernameCookie = request.cookies.get('username');

//     if (url.pathname === '/signin') {
//         return NextResponse.next();
//     }

//     if (usernameCookie) {
//         return NextResponse.next();
//     } else {
//         const redirectUrl = new URL('/signin', request.url);
//         return NextResponse.redirect(redirectUrl);
//     }
// }

// export const config = {
//     matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
// };
