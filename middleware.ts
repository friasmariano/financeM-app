import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verify } from "jsonwebtoken";

const PUBLIC_PATHS = ['/', '/login'];
const PUBLIC_ONLY_PATHS = ['/', '/login'];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get("jwt")?.value;

    const isPublic = PUBLIC_PATHS.some(path => request.nextUrl.pathname.startsWith(path));
    const isPublicOnly = PUBLIC_ONLY_PATHS.includes(pathname);

    if (isPublic && !token)
        return NextResponse.next();

    if (!token)
        return NextResponse.redirect(new URL('/login', request.url));

    try {
        verify(token, process.env.JWT_PUBLIC_KEY!);

        if (isPublicOnly) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }

        return NextResponse.next();
    } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
            console.error("JWT verification failed:", error);
        }

        return NextResponse.redirect(new URL('/login', request.url));
    }

}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/bills/:path*',
        '/budgets/:path*',
        '/transactions/:path*',
        '/login',
        '/'
    ]
}