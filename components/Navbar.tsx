'use client';

import { useAppDispatch } from '../lib/hooks'
import { useEffect } from 'react';
import { toggle } from '../lib/features/sidebar/store/sidebar-slice'

export default function Navbar() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const handleBackdropClick = () => {
            dispatch(toggle());

            window.addEventListener('sidebar:backdrop-click', handleBackdropClick);
            return () => {
                window.removeEventListener('sidebar:backdrop-click', handleBackdropClick);
            }
        }
    }, [dispatch]);

    return(
        <section className="navbar">
            <div style={{ padding: '0px', margin: '0px' }}>
                <div style={{ display: 'flex', padding: '0px', margin: '0px' }}>
                    <button
                        style={{ margin: '-2px 10px 20px 0px', fontSize: '1.5rem',
                                 cursor: 'pointer'}}
                        onClick={() => dispatch(toggle())}
                    >
                        ☰
                    </button>
                    <h1 style={{ fontSize: '1.3rem', fontWeight: '600'}}>
                        financeM
                    </h1>
                </div>
            </div>
        </section>
    );
}