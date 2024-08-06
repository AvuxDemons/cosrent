import { insertRecord, searchRecord } from "@/lib/xata";
import { getServerSession, NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";

const upsertUser = async (user: any) => {
    const existingUser = await searchRecord('user', [{ attr: 'email', value: user.email }]);

    if (!existingUser) {
        const userRecord = await insertRecord('user', { email: user.email });
        return userRecord;
    }

    return existingUser;
}

interface DbUser {
    role: {
        id: string;
    };
}

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async jwt({ token }: { token: JWT }) {
            if (token) {
                const dbUser: DbUser = await upsertUser(token);
                token.role = dbUser.role.id;
            }
            return token;
        },
        async session({ session, token }: { session: any; token: JWT }) {
            if (session?.user) {
                session.user.role = token.role;
            }
            return session;
        },
        async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
            return url.startsWith(baseUrl) ? url : baseUrl;
        },
    },
    pages: {
        signIn: "/auth/login",
        signOut: "/auth/logout",
        error: "/auth/error",
    },
    secret: process.env.NEXTAUTH_SECRET,
};

export const getAuthSession = () => getServerSession(authOptions);