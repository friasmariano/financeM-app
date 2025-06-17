
import getAuthenticatedUser from "@/lib/auth";
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const user = await getAuthenticatedUser();

  if(!user) {
    redirect('/login');
  }

  return (
    <section>
      <div style={{ padding: '50px 20px 0px 90px', display: 'flex', gap: '20px', minWidth: '50vw', flexWrap: 'wrap' }}>
        <h1 className="text-4xl font-medium">Overview</h1>
      </div>

      <div style={{ padding: '60px 20px 30px 80px', display: 'flex', gap: '20px', minWidth: '50vw', flexWrap: 'wrap' }}>
        <div className="card blue-card">
            <div style={{ display: 'flex', flexDirection: 'column', padding: '32px 0px 0px 30px'}}>
                <h1  style={{ fontSize: '1.2rem' }}>Current Balance</h1>
                <p style={{ fontSize: '1.9rem', fontWeight: '600' }}>
                  $4,836.00
                </p>
            </div>
        </div>
        <div className="card green-card">
            <div style={{ display: 'flex', flexDirection: 'column', padding: '32px 0px 0px 30px', color: '#61E0AC'}}>
                <h1  style={{ fontSize: '1.2rem' }}>Income</h1>
                <p style={{ fontSize: '1.9rem', fontWeight: '600' }}>
                  $3,814.25
                </p>
            </div>
        </div>
        <div className="card orange-card">
              <div style={{ display: 'flex', flexDirection: 'column', padding: '32px 0px 0px 30px', color: '#F48D44'}}>
                <h1  style={{ fontSize: '1.2rem' }}>Expenses</h1>
                <p style={{ fontSize: '1.9rem', fontWeight: '600' }}>
                  $1,700.50
                </p>
            </div>
        </div>

      </div>
    </section>
  );
}
