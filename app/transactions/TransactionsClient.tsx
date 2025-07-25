'use client';

import { useSessionGuard } from "@/hooks/useSessionGuard";

export default function TransactionsClient({ isAuthenticated } : { isAuthenticated: boolean }) {
    useSessionGuard(isAuthenticated);

    return(
        <div style={{ padding: '20px 50px 0px 20px', maxHeight: '72vh', overflow: 'scroll'}}>
            <h1>Transactions</h1>
        </div>
    )

}