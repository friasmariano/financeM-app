
'use client'

import { useEffect, useState} from 'react'
import { createPortal } from 'react-dom';

export default function DropdownPortal({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null;

    return createPortal(children, document.body);
}