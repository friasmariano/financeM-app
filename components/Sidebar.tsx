'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
    const [links, setLinks] = useState([
        { href: '/', label: 'Overview', icon: 'bi-house', hoverIcon: 'bi-house-fill', hovered: false },
        { href: '/transactions', label: 'Transactions', icon: 'bi bi-clipboard-data', hoverIcon: 'bi bi-clipboard-data-fill', hovered: false },
        { href: '/budgets', label: 'Budgets', icon: 'bi-pie-chart', hoverIcon: 'bi bi-pie-chart-fill', hovered: false },
        { href: '/bills', label: 'Bills', icon: 'bi-file-earmark-break', hoverIcon: 'bi-file-earmark-break-fill', hovered: false },
    ])

    const pathname = usePathname();

    const setHover = (index: number, isHovering: boolean) => {
        setLinks((prev) =>
            prev.map((link, i) =>
                i === index ? { ...link, hovered: isHovering } : link
            )
        )
    }

    return (
        <section className="sidebar">
            <ul>
               {links.map((link, index) => (
                <li key={link.href}
                    style={{ padding: '10px 0px 10px 40px', margin: '0px 0px 12px 0px'}}
                    onMouseEnter={() => setHover(index, true)}
                    onMouseLeave={() => setHover(index, false)}
                    className={pathname === link.href ? 'sidebar-active-route' : ''}
                    >
                    <Link href={link.href}>
                        <i className={`bi ${link.hovered || pathname === link.href ? link.hoverIcon : link.icon} mr-2`}></i>
                        <span className='sidebar-text'>{link.label}</span>
                    </Link>
                </li>
               ))}
            </ul>
        </section>
    )
}