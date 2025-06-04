'use client';

import { Input } from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { authService } from '@/services/authService';
import { useAppDispatch } from "@/lib/hooks";
import { setLoginStatus } from "@/lib/features/auth/store/auth-slice";

export default function LoginForm() {
    const dispatch = useAppDispatch();

    const authenticate = async (values: any) => {
        try {
            const data = await authService.login(values);
            console.log("Login successful:", data);
            dispatch(setLoginStatus());
        } catch (error: any) {
            console.error("Login error:", error);
            alert("Login failed. Please check your credentials.");
        }
    };

    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Username is required'),
            password: Yup.string().required('Password is required')
        }),
        onSubmit: (values) => {
            authenticate(values);
        }
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <label htmlFor="username">Username</label>
                <Input id="username" {...formik.getFieldProps('username')} />
            </div>

            <div>
                <label htmlFor="password">Password</label>
                <Input id="password" type="password" {...formik.getFieldProps('password')} />
            </div>

            <div style={{ marginTop: '50px', color: 'white', fontWeight: '500' }}>
                <button className="button is-green" type="submit">
                    <i className="bi bi-key" style={{ marginRight: '10px' }}></i>
                    <span style={{ marginRight: '12px', opacity: '0.5' }}>|</span>
                    <span>Login</span>
                </button>
            </div>
        </form>
    );
}
