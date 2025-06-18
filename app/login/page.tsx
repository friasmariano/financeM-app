import getAuthenticatedUser from "@/lib/auth";
import { redirect } from 'next/navigation';
import LoginForm from "./loginForm";

export default async function LoginPage() {
    const user = await getAuthenticatedUser();

    console.log("User in login page:", user);

      if(user) {
        redirect('/dashboard');
    }

    return(
        <section className="login-container">
            <div className="text-[1.3rem] font-bold mb-[25px]">
                financeM
            </div>
            <LoginForm />
        </section>
    )
}