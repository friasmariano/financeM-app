'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useAppDispatch, useAppSelector} from '../lib/hooks';
import { toggle } from '../lib/features/sidebar/store/sidebar-slice'

export default function Sidebar() {
    const dispatch = useAppDispatch();

    const isOpened = useAppSelector((state) => state.sidebar.data.isOpened);
    const loggedIn = useAppSelector((state) => state.auth.data.loggedIn);

    const [links, setLinks] = useState([
        { href: '/dashboard', label: 'Overview', icon: 'bi-house', hoverIcon: 'bi-house-fill', hovered: false },
        // { href: '/transactions', label: 'Transactions', icon: 'bi bi-clipboard-data', hoverIcon: 'bi bi-clipboard-data-fill', hovered: false },
        // { href: '/budgets', label: 'Budgets', icon: 'bi-pie-chart', hoverIcon: 'bi bi-pie-chart-fill', hovered: false },
        // { href: '/bills', label: 'Bills', icon: 'bi-file-earmark-break', hoverIcon: 'bi-file-earmark-break-fill', hovered: false },
    ]);

    const [isMobile, setIsMobile] = useState(false);

    const pathname = usePathname();

    const setHover = (index: number, isHovering: boolean) => {
        setLinks((prev) =>
            prev.map((link, i) =>
                i === index ? { ...link, hovered: isHovering } : link
            )
        )
    }

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [])

    const handleBackdropClick = () => {
        dispatch(toggle());
    };

    return (
        loggedIn ? (
        <section>
            {isMobile && isOpened && (
                <div className="sidebar-backdrop" onClick={handleBackdropClick}></div>
            )}
            <div className={`fixed top-0 left-0 h-screen w-[255px] md:w-[100px] lg:w-[255px]
                                 z-[1000] p-[100px_20px_0_0] shadow-[4px_4px_20px_rgba(0,0,0,0.2)]
                                 transition-transform duration-300 ease-in-out
                                ${isMobile ? (isOpened ? 'translate-x-0' : '-translate-x-full') : ''}`}
                     style={{ background: 'var(--sidebar-gradient)'}}>
                <ul style={{ padding: '0px', margin: '0px', listStyleType: 'none'}}>
                {links.map((link, index) => (
                    <li key={link.href}
                        style={{ padding: '10px 0px 10px 40px', margin: '0px 0px 12px 0px'}}
                        onMouseEnter={() => setHover(index, true)}
                        onMouseLeave={() => setHover(index, false)}
                        className={pathname === link.href ? 'sidebar-active-route' : ''}>
                        <Link href={link.href} style={{ }}>
                            <i className={`bi ${link.hovered || pathname === link.href ? link.hoverIcon : link.icon} mr-2`}></i>
                            <span className='sidebar-text'>{link.label}</span>
                        </Link>
                    </li>
                ))}
                </ul>
            </div>
        </section>) : (<p></p>)
    )
}