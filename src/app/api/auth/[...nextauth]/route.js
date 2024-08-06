import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { upsertUser } from "@/lib/auth";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async jwt({ token }) {
            if (token) {
                const dbUser = await upsertUser(token);
                token.role = dbUser.role.id;
            }
            return token
        },
        async session({ session, token }) {
            if (session?.user) session.user.role = token.role
            return session
        },
        // https://next-auth.js.org/configuration/callbacks#redirect-callback
        // async signIn({ user, account, profile, email, credentials }) {
        //     const isAllowedToSignIn = true
        //     if (isAllowedToSignIn) {
        //         return true
        //     } else {
        //         // Return false to display a default error message
        //         return false
        //         // Or you can return a URL to redirect to:
        //         // return '/unauthorized'
        //     }
        // },
        async redirect({ url, baseUrl }) {
            return url.startsWith(baseUrl) ? url : baseUrl;
        },
    },
    pages: {
        signIn: "/auth/login",
        signOut: "/auth/logout",
        error: "/auth/error",
    },
    secret: process.env.NEXTAUTH_SECRET
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };