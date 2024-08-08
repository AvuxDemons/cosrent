import { withAuth, NextRequestWithAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"
import { getPermissions } from "@/lib/permissions";

export default withAuth(
    async function middleware(request: NextRequestWithAuth) {
        const { pathname } = request.nextUrl;
        const role: string = request.nextauth.token?.role || 'user';

        const moduleName = `page-${(pathname as any).split('/').pop()}`;
        const permissions = await getPermissions(role, moduleName);
        if (!permissions.canRead) {
            return NextResponse.rewrite(new URL('/404', request.url));
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token
        },
    }
)

export const config = { matcher: ["/admin"] }