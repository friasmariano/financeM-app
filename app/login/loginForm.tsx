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

    const authenticate = async (values: { email: string; password: string }) => {
        try {
            const data = await authService.login(values);
            console.log("Login successful:", data);

            if (!data) {
                alert("Login failed. Please check your credentials.");
                return;
            }

            dispatch(login());
            router.push('/dashboard');

        } catch (error: any) {
            console.error("Login error:", error);
            alert("Login failed. Please check your credentials.");
        }
    };

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
                const data = await authService.login(values);
                console.log("Login successful:", data);

                if (!data) {
                    alert("Login failed. Please check your credentials.");
                    return;
                }

                dispatch(login());
                router.push('/dashboard');

            } catch (error: any) {
                console.error("Login error:", error);
                alert("Login failed. Please check your credentials.");

            } finally {
                setSubmitting(false);
            }
        }
    });

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
        </form>
    );
}
