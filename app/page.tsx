import Image from "next/image";
import Link from "next/link";
import getAuthenticatedUser from "@/lib/auth";
import { redirect } from 'next/navigation';

export default async function Home() {
  const user = await getAuthenticatedUser();

  console.log("User in login page:", user);

    if(user) {
      redirect('/dashboard');
  }

  return (
    <section style={{ minHeight: '95vh'}}>
      <div className="flex items-center justify-center p-2 mb-4.5">
        {/* <Image
          alt="FinanceM Logo"
          src={"/logo.png"}
          width={50}
          height={50}
        /> */}
        <div style={{ display: 'flex', flexDirection: 'column',
                      alignItems: 'center', justifyContent: 'center',
                      padding: '10px 0px 10px 0px' }}>
          <h1 className="ml-2 drop-shadow font-semibold drop-shadow"
              style={{ fontSize: '1.7rem',
                       textShadow: '0px 5px 20px rgba(0, 0, 0, 0.2)'
               }}>
              FinanceM
          </h1>

          <p className="text-center mx-auto px-[20vw] pt-[2vw] pb-[1vw] drop-shadow">
            Take control of your finances by making it easy to manage your bills, set and track your budget, and monitor all your transactions in one place. This app provides everything you need to achieve your financial goals.
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Image
          alt="Dashboard Image"
          src={"/image.png"}
          width={900}
          height={900}
        />

        <p className="mt-6 mb-5">
            To get started, you can log in or register using the links below.
        </p>

        <div className="flex gap-2 drop-shadow mb-25">
          <Link href="/login"
                style={{ background: 'var(--button-background)',
                         color: 'var(--button-foreground)' }} className="button">Login</Link>
          <Link href="/register"
                style={{ background: 'var(--button-background)',
                         color: 'var(--button-foreground)'
                 }} className="button">Register</Link>
        </div>
      </div>
    </section>
  );
}