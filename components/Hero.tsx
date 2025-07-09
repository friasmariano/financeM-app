'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

export default function Hero({ isAuthenticated }: { isAuthenticated: boolean }) {
  const pathname = usePathname();

  const content = useMemo(() => {
    switch (pathname) {
      case '/dashboard':
        return { title: 'Overview', subtitle: 'Start saving today' };
      case '/bills':
        return { title: 'Bills', subtitle: 'Your receipts here' };
      case '/budgets':
        return { title: 'Budgets', subtitle: 'Your financial projection here' };
      case '/pots':
        return {
          title: 'Pots',
          subtitle: 'Easily create and manage pots to budget, save & more',
        };
      case '/transactions':
        return {
          title: 'Transactions',
          subtitle: 'Review and manage your cashflow!',
        };
      default:
        return {
          title: 'FinanceM',
          subtitle: 'Be the master of your finances',
        };
    }
  }, [pathname]);

  return (
    isAuthenticated ? (
        <div
        className="h-[258px] flex flex-col gap-1 pl-[70px] pt-[75px] mx-auto
                    bg-[var(--sidebar-gradient)] backdrop-blur-[40px]
                    shadow-[4px_4px_20px_rgba(0,0,0,0.2)]">
        <h1 className="text-[2.6rem] font-bold text-foreground">{content.title}</h1>
        <h2 className="text-[1.23rem] text-muted-foreground">{content.subtitle}</h2>
        </div>)

        : (<div></div>)
    );
}
