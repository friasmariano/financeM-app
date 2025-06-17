'use client';

import { useAppDispatch, useAppSelector } from '../lib/hooks'
import { useEffect, useState } from 'react';
import { toggle } from '../lib/features/sidebar/store/sidebar-slice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { logout } from "@/lib/features/auth/store/auth-slice";
import { useRouter } from 'next/navigation';
import { authService } from '@/services/authService';

export default function Navbar() {
    const dispatch = useAppDispatch();
    const [isDropDownOpen, setDropDownOpen] = useState(false);

    const loggedIn = useAppSelector((state) => state.auth.data.loggedIn);
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await authService.logout();
        } catch (error) {
            console.log("Logout failed:", error);
        } finally {
            dispatch(logout());
            router.push('/login');
        }
    }

    useEffect(() => {
        const handleBackdropClick = () => {
            dispatch(toggle());
        };

        window.addEventListener('sidebar:backdrop-click', handleBackdropClick);
        return () => {
            window.removeEventListener('sidebar:backdrop-click', handleBackdropClick);
        };
    }, [dispatch]);

    return (
        loggedIn ? (
            <section className="navbar">
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', padding: '0px', margin: '0px' }}>
                    {/* Left */}
                    <div style={{ display: 'flex', alignItems: 'center', padding: '0px', margin: '0px' }}
                         onMouseLeave={() => setDropDownOpen(false)}>
                        <button
                            style={{ margin: '-11px 10px 20px 0px', fontSize: '1.5rem',
                                    cursor: 'pointer'}}
                            onClick={() => dispatch(toggle())}
                        >
                            <i className="bi bi-list block md:hidden"
                            style={{ position: 'absolute', color: 'var(--foreground)'}}></i>
                        </button>
                        <h1 style={{ fontSize: '1.3rem', fontWeight: '600',
                                    color: 'var(--foreground)',
                                    margin: '0px 20px 0px 25px'}}>
                            financeM
                        </h1>
                    </div>

                    {/* Spacer */}
                    <div
                        style={{ flex: 1 }}
                        onMouseEnter={() => setDropDownOpen(false)}
                    />

                    {/* Right */}
                    <div style={{ position: 'relative'}}>
                        <div
                            onClick={() => setDropDownOpen(prev => !prev)}
                            style={{
                                cursor: 'pointer',
                                fontWeight: '500',
                                color: 'var(--foreground)',
                                padding: '0.5rem 1.3rem 0px 0',
                                borderRadius: '4px'
                            }}>
                                <span style={{ margin: '0px 20px 0px 13px', userSelect: 'none'}}>John Doe</span>
                                <FontAwesomeIcon icon={isDropDownOpen ? faChevronUp : faChevronDown} />
                        </div>
                    </div>
                </div>
                {isDropDownOpen && (
                    <div
                        style={{ position: 'relative' }}
                        onMouseLeave={() => setDropDownOpen(false)}
                        onMouseEnter={() => setDropDownOpen(true)}
                    >
                        <ul className="dropdown">
                            <li className="font-semibold">Profile</li>
                            <hr className="my-1 border-gray-300 opacity-50" />
                            <li>Account Info</li>
                            <li>
                                <button onClick={handleLogout} className="cursor-pointer">
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
            </section>
        ) : <p></p>
    );
}