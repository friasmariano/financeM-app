import getAuthenticatedUser from "@/lib/auth";
import { redirect } from 'next/navigation';

export default async function BillsPage() {
    const user = await getAuthenticatedUser();

    if (!user) {
        redirect('/login');
    }

    return (
        <>
        </>
    );
}