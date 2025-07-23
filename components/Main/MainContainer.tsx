'use client'

import { useAppSelector } from "@/lib/hooks";

export default function MainContainer({ children }: MainServerProps) {

    const loggedIn = useAppSelector((state) => state.auth.data.loggedIn);

    if (!loggedIn) return <section>{children}</section>;

    return (
        <section className="bg-[var(--sidebar-gradient)] m-5 rounded-[15px] pb-[0px] backdrop-blur-[30px] shadow-[0px_0px_18px_rgba(0,0,0,0.2)]">
            {children}
        </section>
    );
}