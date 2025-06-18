import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verify } from "jsonwebtoken";

const PUBLIC_PATHS = ['/', '/login'];

export function middleware(request: NextRequest) {
    const token = request.cookies.get("jwt")?.value;

    const isPublic = PUBLIC_PATHS.some(path => request.nextUrl.pathname.startsWith(path));

    if (isPublic)
        return NextResponse.next();

    if (!token)
        return NextResponse.redirect(new URL('/login', request.url));

    try {
        verify(token, process.env.JWT_PUBLIC_KEY!);
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
        '/transactions/:path*'
    ]
}