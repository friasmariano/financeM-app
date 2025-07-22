'use client'

import { ToastContainer } from "react-toastify";
import { useAppSelector } from "@/lib/hooks";
import 'react-toastify/dist/ReactToastify.css'

export default function ClientLayout() {
    const isDark = useAppSelector((state) => state.theme.data.isDark);

    return <ToastContainer theme={isDark ? 'dark' : 'light'} />;
}