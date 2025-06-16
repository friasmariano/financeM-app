import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section style={{ border: '1px solid red', display: 'flex', flexDirection: 'column' }}>
      <div className="flex items-center justify-center p-2">
        <Image
          alt="FinanceM Logo"
          src={"/logo.png"}
          width={50}
          height={50}
        />
        <h1 className="text-xl ml-2 drop-shadow font-semibold">FinanceM</h1>
      </div>

      <div className="flex flex-col items-center">
        <p className="text-center mx-[20vw] mt-5">
          Take control of your finances by making it easy to manage your bills, set and track your budget, and monitor all your transactions in one place. This app provides everything you need to achieve your financial goals.
        </p>
        <Image
          className="mt-5"
          alt="Dashboard Image"
          src={"/image.png"}
          width={1000}
          height={1000}
        />

        <div
             style={{ marginBottom: '30px'}}>
          <p>
            To get started, you can log in or register using the links below.
          </p>

          <div>
            <Link href="/login" className="cursor-pointer font-semibold px-6 py-3">
              Login
            </Link>

            <Link href="/login" className="cursor-pointer font-semibold px-6 py-3">
              Register
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}