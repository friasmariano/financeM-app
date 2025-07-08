'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from '../../lib/hooks'
import { logout } from "@/lib/features/auth/store/auth-slice";
import { useState } from 'react';
import { changeSidebarStatus } from '../../lib/features/sidebar/store/sidebar-slice'
import { authService } from '@/services/authService';
import { useRouter } from 'next/navigation';

export default function NavbarNew() {
    const dispatch = useAppDispatch();
    const [isDropDownOpen, setDropdownStatus] = useState(false);

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

    return(
        loggedIn ? (<nav className="navbar">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: '10px', fontSize: '1.1rem' }}>
                    <button onClick={() => dispatch(changeSidebarStatus())}
                            style={{ cursor: 'pointer' }}>
                        <i className="bi bi-list md:hidden"></i>
                    </button>
                    <h1>FinanceM</h1>
                </div>
                <div></div>
                <div style={{ cursor: 'pointer', position: 'relative' }}
                     onClick={() => setDropdownStatus(prev => !prev)}>
                    John Doe
                    <FontAwesomeIcon icon={faChevronDown} style={{ margin: '0px 20px 0px 15px' }} />

                    {isDropDownOpen && (<ul className='dropdown'>
                        <li>Profile</li>
                        <li>Account Info</li>
                        <li>
                            <button onClick={handleLogout}>Logout</button>
                        </li>
                    </ul>)}
                </div>
            </div>
        </nav>) : <p></p>
    )
}