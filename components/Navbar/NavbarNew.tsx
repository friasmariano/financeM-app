'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from '../../lib/hooks'
import { logout } from "@/lib/features/auth/store/auth-slice";
import { useEffect, useState } from 'react';
import { changeSidebarStatus } from '../../lib/features/sidebar/store/sidebar-slice'
import { authService } from '@/services/authService';
import { useRouter } from 'next/navigation';

export default function NavbarNew({ isAuthenticated }: { isAuthenticated: Boolean }) {
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
            <nav className="navbar relative" style={{ zIndex: '10900' }}>
                <div className="flex justify-between items-center">
                    {/* Left */}
                    <div className="flex gap-2 text-[1.2rem] items-center">
                        <button
                            onClick={() => dispatch(changeSidebarStatus())}
                            className="cursor-pointer md:hidden"
                        >
                            <i className="bi bi-list"></i>
                        </button>
                        <h1>FinanceM</h1>
                    </div>

                    {/* Spacer */}
                    <div
                        className="flex-1 h-full w-full"
                        style={{ height: '10px', width: '100%'}}
                        onMouseEnter={() => setDropdownStatus(false)}>
                    </div>

                    {/* Right */}
                    <div
                        className="relative pr-5 cursor-pointer select-none flex items-center"
                        onClick={() => setDropdownStatus(prev => !prev)}>
                        <span className="mx-[13px] mr-5 text-[1.1rem]">
                            {user?.person?.firstName}
                        </span>
                        <FontAwesomeIcon icon={isDropDownOpen ? faChevronUp : faChevronDown} />

                        <div>
                            {isDropDownOpen && (
                                <ul
                                    className="dropdown slideDown absolute right-0 bg-white shadow-lg rounded-md w-40 z-50"
                                    style={{ height: '195px',
                                             top: '22px', padding: '20px 0px 0px 25px',
                                             zIndex: '0' }}
                                    onMouseLeave={() => setDropdownStatus(false)}>

                                    <li className="rounded p-2"
                                        style={{ fontWeight: '500', fontSize: '1.2rem', marginBottom: '10px' }}>Profile</li>
                                    <li className="cursor-pointer rounded p-2"
                                        style={{ fontSize: '1rem' }}>
                                        Account Info
                                    </li>
                                    <li className='cursor-pointer'>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left cursor-pointer rounded"
                                            style={{ fontSize: '1rem' }}>
                                            <i className="bi bi-box-arrow-right"
                                                        style={{ marginRight: '10px' }}></i>Logout
                                        </button>
                                    </li>
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        ) : <p></p>
    )
}