import { Role } from '@prisma/client'
import { NextRequestWithAuth, withAuth } from "next-auth/middleware"
import NextAuth from 'next-auth/next'
import { NextResponse } from 'next/server'

export default withAuth(
    function middleware(req: NextRequestWithAuth) {
        if (
            // !req.nextauth.token?.isActive && (!req.nextUrl.pathname.startsWith("/about"))
            (req.nextUrl.pathname.startsWith("/admin") && req.nextauth.token?.role !== Role.ADMIN)
            || (req.nextUrl.pathname.startsWith("/receptionist") && req.nextauth.token?.role !== Role.RECEPTIONIST)
            || (req.nextUrl.pathname.startsWith("/lab/supervisor") && req.nextauth.token?.role !== Role.LAB_SUPERVISOR)
            || (req.nextUrl.pathname.startsWith("/lab/technician") && req.nextauth.token?.role !== Role.LAB_ASSISTANT)
            || (req.nextUrl.pathname.startsWith("/all-tests") &&
                (req.nextauth.token?.role !== Role.LAB_ASSISTANT
                    && req.nextauth.token?.role !== Role.LAB_SUPERVISOR))
            || (req.nextUrl.pathname.startsWith("/tests-history") &&
                (req.nextauth.token?.role !== Role.DOCTOR
                    && req.nextauth.token?.role !== Role.RECEPTIONIST))

        ) {
            return NextResponse.rewrite(new URL('/unauthorized?message=You are not authorized to acces the page you requested', req.url))
        }

        return NextResponse.next()
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,

        }
    }
)


export const config = {
    matcher: ['/lab/:path*', '/receptionist', '/admin/:path*', '/all-tests', '/tests-history']
    // matcher: ['/:path*']
}