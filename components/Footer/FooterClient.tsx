'use client';

import { useAppSelector } from "../../lib/hooks";

export default function Footer() {
    const loggedIn = useAppSelector((state) => state.auth.data.loggedIn);

    return (
        <footer className={`footer ${loggedIn ? "footer-logged-in" : "footer-logged-out"} mt-19 mb-10`}>
            <p>© 2025 FinanceM </p>
        </footer>
    )
}