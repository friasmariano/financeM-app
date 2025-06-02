'use client';

import { useState } from 'react';
import { useAppDispatch } from "@/lib/hooks";
import { setLoginStatus } from "@/lib/features/auth/store/auth-slice";

export default function Login() {
    const dispatch = useAppDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const authenticate = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/auth/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username, password})
            })

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();

            console.log('Authentication successful:', data);
        }
        catch (error) {
            console.error('Authentication error:', error);
            alert('Login failed. Please check your credentials.');
        }

        // dispatch(setLoginStatus());
    }

    return(
        <section className="login-container">
            <div className="text-[1.3rem] font-bold mb-[25px]">
                financeM
            </div>

            <input type="text"
                   placeholder="username"
                   value={username}
                   onChange={(e) => setUsername(e.target.value)} />

            <input type="password"
                   placeholder="password"
                   value={password}
                   onChange={(e) => setPassword(e.target.value)} />

            <div style={{ marginTop: '50px', color: 'white', fontWeight: '500'}}>
                <button className="button is-green"
                        onClick={authenticate}>
                    <i className="bi bi-key" style={{ marginRight: '10px' }}></i>
                    <span style={{ marginRight: '12px', opacity: '0.5' }}>|</span>
                    <span>Login</span>
                </button>
            </div>
        </section>
    )
}