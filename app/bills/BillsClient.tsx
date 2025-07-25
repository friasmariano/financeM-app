'use client'

import { useSessionGuard } from "@/hooks/useSessionGuard"

export default function BillsClient({ isAuthenticated } : { isAuthenticated: boolean }) {
    useSessionGuard(isAuthenticated);

    return (
        <>
            <h1>Bills Client</h1>
        </>
    )
}