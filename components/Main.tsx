'use client';

import React from "react";
import { useAppSelector } from "../lib/hooks";

type MainProps = {
  children: React.ReactNode;
};

export default function Main({ children }: MainProps) {
    const loggedIn = useAppSelector((state) => state.auth.data.loggedIn);

    return (
         <main className={`main ${loggedIn ? "main-logged-in" : "main-logged-out"}`}>
            {children}
        </main>
    )
}