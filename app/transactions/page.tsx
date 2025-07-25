import getAuthenticatedUser from "@/lib/auth";
import { redirect } from 'next/navigation';
import TransactionsClient from "./TransactionsClient";

export default async function TransactionsPage() {
    const user = await getAuthenticatedUser();

    if (!user) {
        redirect('/login');
    }

    return (
        <section>
            <TransactionsClient isAuthenticated={user ? true : false} />
        </section>
    );
}