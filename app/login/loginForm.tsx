'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { authService } from '@/services/authService';
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { logout } from "@/lib/features/auth/store/auth-slice";
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { login } from "@/lib/features/auth/store/auth-slice";
import { useRouter } from 'next/navigation';
import UserResponse from '@/types/responses/UserResponse';
import { ApiDefaultResponse } from '@/types/ApiDefaultResponse';
import User from '@/types/User';

export default function LoginForm({ isAuthenticated }: { isAuthenticated: boolean }) {

    const dispatch = useAppDispatch();
    const loggedIn = useAppSelector((state) => state.auth.data.loggedIn);

    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
                        .email('Invalid email address')
                        .required('Email is required'),
            password: Yup.string().required('Password is required')
        }),
        validateOnMount: true,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const userResponse: ApiDefaultResponse<UserResponse> = await authService.login(values);

                if (!userResponse) {
                    toast.error('Login failed. Check your credentials.');
                    return;
                }

                const user: User = {
                    id: userResponse.data.id,
                    username: userResponse.data.username,
                    person: userResponse.data.person
                };

                dispatch(login(user));
                router.push('/dashboard');

            } catch (error: any) {
                const errorMessage =
                    error?.response?.message ||
                    error?.message ||
                    'Login failed. Please check your credentials.';

                toast.error(errorMessage);
            } finally {
                setSubmitting(false);
            }
        }
    });

    useEffect(() => {
        if (!isAuthenticated) {
            const handleLogout = async () => {
                try {
                    await authService.logout();
                } catch (error) {
                    console.log("Logout failed:", error);
                } finally {
                    dispatch(logout());
                }
            }

            handleLogout();

            setTimeout(() => router.refresh(), 100);
        }
    }, [isAuthenticated]);

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-col items-center gap-3">
                <input
                    id="email"
                    type="email"
                    placeholder="email"
                    {...formik.getFieldProps('email')}
                />
                <div className="text-sm text-red-400">
                    {!!formik.errors.email && formik.touched.email && (<p>{formik.errors.email}</p>)}
                </div>

                <input
                    id="password"
                    type="password"
                    placeholder="password"
                    {...formik.getFieldProps('password')}
                />
                <div className="text-sm text-red-400">
                    {!!formik.errors.password && formik.touched.password && (<p>{formik.errors.password}</p>)}
                </div>
            </div>

            <div className="flex flex-col items-center gap-3 mt-9">
                               <button
                    className={`button is-green text-center cursor-pointer ${!formik.isValid ? 'opacity-50' : ''}`}
                    type="submit"
                    disabled={!formik.isValid || formik.isSubmitting}>
                    Login
                </button>
            </div>

            <ToastContainer />
        </form>
    );
}
