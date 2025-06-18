import getAuthenticatedUser from "@/lib/auth";
import { redirect } from 'next/navigation';

export default function BudgetsPage() {
    const user = getAuthenticatedUser();

    if (!user) {
        redirect('/login');
    }

    return (
        <>
        </>
    );
}