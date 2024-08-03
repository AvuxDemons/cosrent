import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export const authUserSession = async () => {
    const data: any = await getServerSession(authOptions);
    return data?.session;
}