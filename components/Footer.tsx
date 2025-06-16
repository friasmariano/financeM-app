'use client';

import { useAppSelector } from "../lib/hooks";

export default function Footer() {
    const loggedIn = useAppSelector((state) => state.auth.data.loggedIn);

    return (
        <footer className={`footer ${loggedIn ? "footer-logged-in" : "footer-logged-out"}`}>
            <p>© 2025 FinanceM </p>
        </footer>
    )
}