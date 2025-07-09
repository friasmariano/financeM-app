
import React from "react";
import getAuthenticatedUser from "@/lib/auth";
import Hero from "@/components/Hero";

export default async function Main({ children }: MainServerProps) {
  const user = await getAuthenticatedUser();

    return (
        <main className={`main ${user ? "main-logged-in" : "main-logged-out"}`}>
            <Hero isAuthenticated={user ? true : false} />
            {children}
        </main>
    )
}