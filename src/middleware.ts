import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { getPermissions } from "@/lib/permissions";

export default withAuth(
    async function middleware(request: NextRequestWithAuth) {
        const { pathname } = request.nextUrl;
        const token = request.nextauth.token;

        if (!token) {
            console.error("Token missing in production");
            return NextResponse.redirect(new URL('/login', request.url));
        }

        const role: string = token.role || 'user';

        try {
            const moduleName = `page-${pathname.split('/').pop()?.replaceAll('/', '-')}`;
            const permissions = await getPermissions(role, moduleName);

            if (!permissions.canRead) {
                return NextResponse.rewrite(new URL('/404', request.url));
            }
        } catch (error) {
            console.error("Error in middleware:", error);
            return NextResponse.redirect(new URL('/login', request.url));
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => {
                return !!token;
            }
        },
    }
);

export const config = { matcher: ["/admin"] };
