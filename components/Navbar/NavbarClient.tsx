'use client';

import { useAppDispatch, useAppSelector } from '../../lib/hooks'
import { useEffect, useState } from 'react';
import { toggle } from '../../lib/features/sidebar/store/sidebar-slice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { logout, login } from "@/lib/features/auth/store/auth-slice";
import { useRouter } from 'next/navigation';
import { authService } from '@/services/authService';
import { useRef } from 'react';

export default function NavbarClient({ isAuthenticated }: { isAuthenticated: boolean }) {
    const dispatch = useAppDispatch();
    const [isDropDownOpen, setDropDownOpen] = useState(false);

    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [currentScrollPos, setCurrentScrollPos] = useState(0);
    const [translateYPos, setTranslateYPos] = useState("");
    const [isDescending, setIsDescending] = useState(true);
    const lastScrollY = useRef(0);

    const loggedIn = useAppSelector((state) => state.auth.data.loggedIn);
    const router = useRouter();

    const navbarRef = useRef<HTMLElement>(null);

    const handleLogout = async () => {
        try {
            await authService.logout();
            dispatch(logout());
        } catch (error) {
            console.log("Logout failed:", error);
        } finally {
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

    useEffect(() => {
        if (!isAuthenticated && loggedIn) {
            dispatch(logout());
        }

    }, [isAuthenticated]);

    // useEffect(() => {
    //     const handleScroll = () => {
    //     const currentScrollY = window.scrollY;
    //     if (currentScrollY > lastScrollY.current && currentScrollY > 60) {
    //         setTranslateYPos('-80px');
    //     } else {
    //         setTranslateYPos('0px');
    //     }
    //     lastScrollY.current = currentScrollY;
    //     };

    //     window.addEventListener('scroll', handleScroll);
    //     return () => window.removeEventListener('scroll', handleScroll);
    // }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                navbarRef.current &&
                !navbarRef.current.contains(event.target as Node)
            ) {
                setDropDownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setDropDownOpen(false);
            }
        };

        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, []);

    return (
        loggedIn ? (
            <nav ref={navbarRef} className="navbar" style={{ transform: `translateY(${translateYPos})` }}>
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
                        <h1 style={{ fontSize: '1.3rem', fontWeight: '700',
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
                    <div style={{ position: 'relative' }}
                         onMouseLeave={() => setDropDownOpen(false)}>
                        <ul className="dropdown transition-all duration-200 ease-in-out bg-white shadow-md rounded p-2 z-50 absolute right-0 mt-2 w-48">
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
            </nav>
        ) : <p></p>
    );
}