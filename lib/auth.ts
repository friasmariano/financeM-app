
import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";

export default async function getAuthenticatedUser() {
    const cookieStore = await cookies();
    const token = cookieStore.get("jwt")?.value;

    if (!token) return null;

    try {
        return verify(token, process.env.JWT_SECRET!);
    } catch {
        return null;
    }
}