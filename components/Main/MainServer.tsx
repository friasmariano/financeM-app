
import React from "react";
import MainClient from "./MainClient";
import Hero from "@/components/Hero";
import MainContainer from "./MainContainer";

export default async function Main({ children }: MainServerProps) {
    return (
        <MainClient>
            <Hero />

            <MainContainer>
                {children}
            </MainContainer>
        </MainClient>
    )
}