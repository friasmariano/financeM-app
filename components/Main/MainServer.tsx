
import React from "react";
import MainClient from "./MainClient";
import Hero from "@/components/Hero";

export default async function Main({ children }: MainServerProps) {
    return (
        <MainClient>
            <Hero />

            <section className="bg-[var(--sidebar-gradient)] m-5
                                rounded-[15px] pb-[70px]
                                backdrop-blur-[30px] shadow-[0px_0px_18px_rgba(0,0,0,0.2)]">
                {children}
            </section>
        </MainClient>
    )
}