import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "./ThemeProvider";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "./fontawesome.config";
import StoreProvider from "./StoreProvider";
import Sidebar from "@/components/Sidebar";
import Main from "@/components/Main";
import Footer from "@/components/Footer";
import 'bootstrap-icons/font/bootstrap-icons.css';
import Navbar from "@/components/Navbar";
import { Provider } from '@/components/ui/provider';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FinanceM",
  description: "Financial Management App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Provider>
          <StoreProvider>
          <Navbar />
          <Sidebar />
          <Main>
            {children}
          </Main>
          <Footer />
          <ThemeProvider />
          </StoreProvider>
        </Provider>
      </body>
    </html>
  );
}
