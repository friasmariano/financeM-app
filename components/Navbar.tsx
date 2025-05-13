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
        <section className="c-navbar">
            <div style={{ display: 'flex', padding: '0px', margin: '0px' }}>
                <div style={{ display: 'flex', padding: '0px', margin: '0px' }}>
                    <button
                        style={{ margin: '-4px 10px 20px 0px', fontSize: '1.5rem',
                                 cursor: 'pointer'}}
                        onClick={() => dispatch(toggle())}
                    >
                        <i className="bi bi-list block md:hidden" style={{ color: 'var(--foreground)' }}></i>
                    </button>
                    <h1 style={{ fontSize: '1.3rem', fontWeight: '600', color: 'var(--foreground)'}}>
                        financeM
                    </h1>
                </div>
                <div style={{ position: 'absolute',
                              top: '0px', right: '0px',
                              fontSize: '1rem',
                              padding: '15px 30px 0px 0px'
                }}>
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            John Doe
                        </button>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#">Action</a></li>
                            <li><a className="dropdown-item" href="#">Another action</a></li>
                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}