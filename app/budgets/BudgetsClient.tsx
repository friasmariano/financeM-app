'use client'

import { useSessionGuard } from "@/hooks/useSessionGuard"

export default function BudgetsClient({ isAuthenticated }: { isAuthenticated: boolean }) {
    useSessionGuard(isAuthenticated);

    return(
        <div style={{ padding: '20px 50px 0px 20px', maxHeight: '72vh', overflow: 'scroll'}}>
            Lorem Ipsum dolor sit amet, consectetur adipiscing elit.
        </div>
    )
}