import getAuthenticatedUser from "@/lib/auth";
import getSession from "@/lib/authSession";
import { redirect } from 'next/navigation';

export default async function BillsPage() {
    const user = await getAuthenticatedUser();
    const session = await getSession();

    console.log("session:", session);

    if (!user) {
        redirect('/login');
    }

    return (
        <>
        </>
    );
}