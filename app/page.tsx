import Image from "next/image";
import Link from "next/link"; // Add this import

export default function Home() {
  return (
    <section>
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

        <div className="flex flex-col items-center"
             style={{ marginBottom: '30px'}}>
          <p>
            To get started, you can log in or register using the links below.
          </p>

          <div className="flex justify-center gap-4 pt-5">
          <Link href="/login" className="cursor-pointer font-semibold px-6 py-3 rounded shadow transition">
            Login
          </Link>

          <Link href="/login" className="cursor-pointer font-semibold px-6 py-3 rounded shadow transition">
            Register
          </Link>

          </div>
        </div>
      </div>
    </section>
  );
}