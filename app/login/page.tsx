'use client';

import { Button, Badge, HStack, Stack } from '@chakra-ui/react';
import { useState } from 'react';
import { useAppDispatch } from "@/lib/hooks";
import { setLoginStatus } from "@/lib/features/auth/store/auth-slice";
import { authService } from '@/services/authService';

import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function Login() {
    const dispatch = useAppDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const authenticate = async () => {
        try {
            const data = await authService.login({ username, password });

            console.log('Authentication successful:', data);
        }
        catch (error) {
            console.error('Authentication error:', error);
            alert('Login failed. Please check your credentials.');
        }

        // dispatch(setLoginStatus());
    }

    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        onSubmit: (values, actions) => {
            authenticate();
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .required('Username is required'),
            password: Yup.string()
                .required('Password is required')
        })
    })

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

                <HStack>
                    <Button>Click me</Button>
                    <Button>Click me</Button>
                </HStack>

                <Stack align="flex-start">
                    <Badge variant="solid" colorPalette="blue">
                        <i className="bi bi-star-fill"></i>
                        New
                    </Badge>
                    <Badge variant="solid" colorPalette="green">
                        New
                        <i className="bi bi-at"></i>
                    </Badge>
                </Stack>

            </div>
        </section>
    )
}