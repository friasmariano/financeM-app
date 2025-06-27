
import getAuthenticatedUser from "@/lib/auth";
import { redirect } from 'next/navigation';
import Card from "@/components/Card";
import LabelTag from "@/components/LabelTag";
import { DonutChart } from "@/components/charts/DonutChart";
import TotalTag from "@/components/TotalTag";

export default async function DashboardPage() {
  const user = await getAuthenticatedUser();

  if(!user) {
    redirect('/login');
  }

  const colors = [
    " #CC4444", // Red
    " #CC7744", // Orange
    " #CCCC44", // Yellow
    " #77CC44", // Yellow-Green
    " #44CC88", // Green-Cyan
    " #44CCCC", // Cyan
    " #4488CC", // Blue
    " #7744CC", // Indigo
    " #CC44CC", // Violet
    " #CC4477"  // Magenta
  ];


  return (
    <section>
      <div style={{ padding: '50px 20px 20px 90px', display: 'flex', gap: '20px', minWidth: '50vw', flexWrap: 'wrap' }}>
        <h1 className="font-bold" style={{ fontSize: '2.5rem' }}>Overview</h1>
      </div>

      {/* Balance, Income & Expenses */}
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

        <div className="card red-card">
              <div style={{ display: 'flex', flexDirection: 'column', padding: '32px 0px 0px 30px'}}>
                <h1  style={{ fontSize: '1.2rem' }}>Projects</h1>
                <p style={{ fontSize: '1.9rem', fontWeight: '600' }}>
                  $3,600.00
                </p>
            </div>
        </div>
      </div>

      {/* Cards */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }} className="pl-20">
        <Card
          title="Pots"
          hasDetails={true}
          width="630px"
          height="300px">
            <div className="grid grid-cols-2 gap-4 items-center pl-12 pt-1.5">
              <TotalTag />
              <div className="pl-3">
                <div style={{ display: 'flex', gap: '0px', flexWrap: 'wrap', maxHeight: '170px', overflow: 'scroll' }}>
                  <LabelTag
                    color={colors[0]}
                    title="Savings"
                    subtitle="$1,500.00" />
                  <LabelTag
                    color={colors[6]}
                    title="Gift"
                    subtitle="$1,500.00" />
                  <LabelTag
                    color={colors[0]}
                    title="Concert Tickets"
                    subtitle="$1,500.00" />
                  <LabelTag
                    color={colors[5]}
                    title="New Laptop"
                    subtitle="$1,500.00" />
                </div>
              </div>
            </div>
        </Card>

        <Card
          title="Recurring Bills"
          hasDetails={true}
          headerWidth="240px"
          width="630px"
          height="300px">
            <div style={{ display: 'flex', flexDirection: 'column',
                          padding: '0px 0px 0px 35px',
                          maxHeight: '170px', overflow: 'scroll' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <LabelTag
                    color={colors[0]}
                    title="Savings"
                    titleBold={true} />
                  <p style={{ padding: '30px 65px 0px 10px',}}>
                    $1,500.00
                  </p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <LabelTag
                  color={colors[6]}
                  title="Gift"
                  titleBold={true} />
                  <p style={{ padding: '30px 65px 0px 10px'}}>
                    $1,200.00
                  </p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <LabelTag
                  color={colors[9]}
                  title="Concert Tickets"
                  titleBold={true} />
                  <p style={{ padding: '30px 65px 0px 10px',}}>
                    $3,000.00
                  </p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <LabelTag
                  color={colors[2]}
                  title="New Laptop"
                  titleBold={true} />
                <p style={{ padding: '30px 65px 0px 10px',}}>
                    $4,000.00
                </p>
              </div>
            </div>
        </Card>
      </div>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }} className="pl-20">
        <Card
          title="Budgets"
          hasDetails={false}
          width="630px"
          height="390px">
            <div className="grid grid-cols-2 gap-4 items-center pl-12 pt-1.5">
              <DonutChart />
              <div className="pl-3">
                <LabelTag
                  color={colors[0]}
                  title="Total Budget"
                  subtitle="$1,500.00" />
                <LabelTag
                  color={colors[6]}
                  title="Total Budget"
                  subtitle="$1,500.00" />
              </div>
            </div>
        </Card>
        <Card
          title="Transactions"
          hasDetails={true}
          detailsText="View All"
          width="630px"
          height="390px"
          headerWidth="240px">
            <div style={{ display: 'flex', flexDirection: 'column',
                          gap: '20px', padding: '10px 0px 50px 55px',
                          maxHeight: '285px', overflow: 'scroll' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="flex">
                  <div className="w-18 h-18 rounded-full bg-gray-200"></div>
                  <p style={{ fontSize: '1rem', padding: '25px 0px 0px 20px' }}>Emma Richardson</p>
                </div>
                <div className="pr-10">
                  <p style={{ fontSize: '1.25rem', fontWeight: '600', color: 'green' }}>+$75.50</p>
                  <p style={{ fontSize: '0.9rem' }}>19 Febraury 2025</p>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="flex">
                  <div className="w-18 h-18 rounded-full bg-gray-200"></div>
                  <p style={{ fontSize: '1rem', padding: '25px 0px 0px 20px' }}>Savory Bites Bistro</p>
                </div>
                <div className="pr-10">
                  <p style={{ fontSize: '1.25rem', fontWeight: '600', color: 'rgb(71, 71, 71)' }}>-$50.05</p>
                  <p style={{ fontSize: '0.9rem' }}>19 Febraury 2025</p>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="flex">
                  <div className="w-18 h-18 rounded-full bg-gray-200"></div>
                  <p style={{ fontSize: '1rem', padding: '25px 0px 0px 20px' }}>Daniel Menendez</p>
                </div>
                <div className="pr-10">
                  <p style={{ fontSize: '1.25rem', fontWeight: '600', color: 'green' }}>+$125.20</p>
                  <p style={{ fontSize: '0.9rem' }}>19 Febraury 2025</p>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="flex">
                  <div className="w-18 h-18 rounded-full bg-gray-200"></div>
                  <p style={{ fontSize: '1rem', padding: '25px 0px 0px 20px' }}>Lynda Park</p>
                </div>
                <div className="pr-10">
                  <p style={{ fontSize: '1.25rem', fontWeight: '600', color: 'rgb(71, 71, 71)' }}>-$25.50</p>
                  <p style={{ fontSize: '0.9rem' }}>19 Febraury 2025</p>
                </div>
              </div>
            </div>
        </Card>
      </div>

    </section>
  );
}
