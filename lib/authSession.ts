import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";
import { DateTime } from "luxon";
import { SessionResult } from "@/types/SessionResult";

export default async function getSession(): Promise<SessionResult> {
    const cookieStore = await cookies();
    const token = cookieStore.get("jwt")?.value;

    if (!token) {
        return {
            user: null,
            active: false
        }
    }

    try {
        const data: any = verify(token, process.env.JWT_PUBLIC_KEY!);

        if (!data.exp) {
            return {
                user: data,
                active: false
            }
        }

        const expiration = DateTime.fromSeconds(data.exp).setZone('America/Caracas');
        const now = DateTime.now().setZone('America/Caracas');

        const isActive = expiration > now;

        return {
            user: data,
            active: isActive
        };
    } catch(error) {
        if (process.env.NODE_ENV !== 'production') {
            console.error("JWT verification failed:", error);
        }
        return {
            user: null,
            active: false
        };
    }
}
