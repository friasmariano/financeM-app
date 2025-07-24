import getAuthenticatedUser from "@/lib/auth";
import { redirect } from 'next/navigation';
import { BudgetsClient } from "./BudgetsClient";

export default function BudgetsPage() {
    const user = getAuthenticatedUser();

    if (!user) {
        redirect('/login');
    }

    return (
        <section>
            <div style={{ margin: '20px 0px 0px 30px' }}>
                <BudgetsClient />
            </div>
        </section>
    );
}