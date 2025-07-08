'use client';

import { useAppDispatch, useAppSelector } from '../../lib/hooks'
import { useEffect, useState } from 'react';
import { changeSidebarStatus } from '../../lib/features/sidebar/store/sidebar-slice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { logout } from "@/lib/features/auth/store/auth-slice";
import { useRouter } from 'next/navigation';
import { authService } from '@/services/authService';

export default function NavbarClient({ isAuthenticated }: { isAuthenticated: boolean }) {
    const dispatch = useAppDispatch();
    const [isDropDownOpen, setDropdownStatus] = useState(false);

    const loggedIn = useAppSelector((state) => state.auth.data.loggedIn);
    const user = useAppSelector((state) => state.auth.data.user);
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
        if (!isAuthenticated && loggedIn) {
            dispatch(logout());

            router.refresh();
        }

    }, [isAuthenticated]);

    return (
        loggedIn ? (
            <nav className="navbar">
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', padding: '0px', margin: '0px' }}>
                    {/* Left */}
                    <div style={{ display: 'flex', alignItems: 'center', padding: '0px', margin: '0px' }}>
                        <button
                            style={{ margin: '-11px 10px 20px 0px', fontSize: '1.5rem',
                                     cursor: 'pointer'}}
                            onClick={() => dispatch(changeSidebarStatus())}
                        >
                            <i className="bi bi-list md:hidden"
                               style={{ position: 'absolute', color: 'var(--foreground)'}}></i>
                        </button>
                        <h1 style={{ fontSize: '1.3rem', fontWeight: '700',
                                    color: 'var(--foreground)',
                                    margin: '0px 20px 0px 25px'}}>
                            financeM
                        </h1>
                    </div>

                    {/* Spacer */}
                    <div
                        onMouseEnter={() => setDropdownStatus(false)}
                    />

                    {/* Right */}
                    <div style={{ position: 'relative'}}>
                        <div
                            onClick={() => setDropdownStatus(prev => !prev)}
                            style={{
                                cursor: 'pointer',
                                fontWeight: '500',
                                color: 'var(--foreground)',
                                padding: '0.5rem 1.3rem 0px 0',
                                borderRadius: '4px'
                            }}>
                                <span style={{ margin: '0px 20px 0px 13px' }}>
                                    {user?.person?.firstName} {user?.person?.lastName}
                                </span>
                                <FontAwesomeIcon icon={isDropDownOpen ? faChevronUp : faChevronDown} />
                        </div>

                        {isDropDownOpen && (
                            <div
                                 onMouseLeave={() => setDropdownStatus(false)}>
                                <ul className="dropdown">
                                    <li className="font-semibold cursor-pointer p-2 rounded">Profile</li>
                                    <hr className="my-1 border-gray-300 opacity-50" />
                                    <li className="cursor-pointer rounded">Account Info</li>
                                    <li>
                                        <button onClick={handleLogout} className="cursor-pointer rounded w-full text-left">
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        ) : <p></p>
    );
}