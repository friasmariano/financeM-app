'use client'

import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { authService } from "@/services";
import { logout } from "@/lib/features/auth/store/auth-slice";

export function useSessionGuard(isAuthenticated: boolean) {
    const dispatch = useAppDispatch();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            const handleLogout = async () => {
                try {
                    await authService.logout();
                } catch (error) {
                    console.log('Logout failed:', error);
                } finally {
                    dispatch(logout());
                    setTimeout(() => router.refresh(), 100);
                }
            }

            handleLogout();
        }

    }, [isAuthenticated, dispatch, router]);
}