import getAuthenticatedUser from "@/lib/auth";
import { redirect } from 'next/navigation';
import BillsClient from "./BillsClient";

export default async function BillsPage() {
    const user = await getAuthenticatedUser();

    if (!user) {
        redirect('/login');
    }

    return (
        <section>
            <div style={{ margin: '20px 0px 0px 30px' }}>
                <BillsClient isAuthenticated={ user ? true: false } />
            </div>
        </section>
    );
}