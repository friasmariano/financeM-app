'use client';

import React from "react";
import { useAppSelector } from "@/lib/hooks";

export default function MainClient({ children }: MainClientProps) {
  const loggedIn = useAppSelector((state) => state.auth.data.loggedIn);

  return (
    <main className={`main ${loggedIn ? "main-logged-in" : "main-logged-out"}`}>
      {children}
    </main>
  );
}
