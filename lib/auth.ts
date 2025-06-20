
import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";

export default async function getAuthenticatedUser() {
    const cookieStore = await cookies();
    const token = cookieStore.get("jwt")?.value;
    let decoded: any = null;

    if (!token) {
        return null;
    }

    try {
        decoded = verify(token, process.env.JWT_PUBLIC_KEY!);
        return decoded;
    } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
            console.log("JWT verification failed:", error);
        }
        return null;
    }
}
