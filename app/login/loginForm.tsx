'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { authService } from '@/services/authService';
import { useAppDispatch } from "@/lib/hooks";
import { login } from "@/lib/features/auth/store/auth-slice";
import { useRouter } from 'next/navigation';

export default function LoginForm() {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const authenticate = async (values: any) => {
        try {
            const data = await authService.login(values);
            dispatch(login());
            router.push('/');
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
        <form onSubmit={e => {
            if (!formik.isValid) {
                e.preventDefault();
                return;
            }
            formik.handleSubmit(e);
        }}>
            <div className="flex flex-col items-center gap-3">
                <input
                    id="username"
                    type="text"
                    placeholder="username"
                    {...formik.getFieldProps('username')}
                />
                <div className="text-sm text-red-400">
                    {!!formik.errors.username && formik.touched.username && (<p>{formik.errors.username}</p>)}
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
        </form>
    );
}
