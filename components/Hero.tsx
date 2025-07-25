'use client';

import { usePathname } from 'next/navigation';
import { useAppSelector } from "@/lib/hooks";
import { useMemo } from 'react';
import Image from 'next/image';

export default function Hero() {
  const pathname = usePathname();
  const loggedIn = useAppSelector((state) => state.auth.data.loggedIn);

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
    loggedIn ? (
        <div
          className="h-[258px] flex flex-col gap-1 pl-[70px] pt-[75px] mx-auto
                      shadow-[4px_4px_20px_rgba(0,0,0,0.2)]"
                      style={{ boxShadow: 'var(--hero-glow)',
                               background: 'var(--hero-gradient)',
                               backdropFilter: 'blur(8px)',
                               overflow: 'hidden'
                       }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <h1 className="text-[2.6rem] font-bold text-foreground"
                    style={{ textShadow: '2px 3px 10px rgba(0, 0, 0, 0.2)' }}>{content.title}</h1>
                <h2 className="text-[1.23rem] text-muted-foreground">{content.subtitle}</h2>
              </div>

              {/* <div style={{ display: 'flex' }}>
                <Image
                  src="/Piggy.png"
                  alt="Hero Illustration"
                  width={800}
                  height={800}
                  style={{ margin: '-105px 0px 0px 0px',
                            opacity: '0.1',
                   }}
                />
              </div> */}
            </div>
          </div>)

        : null
    );
}
