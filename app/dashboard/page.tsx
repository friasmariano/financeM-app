
import getAuthenticatedUser from "@/lib/auth";
import { redirect } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import Card from "@/components/Card";
import LabelTag from "@/components/LabelTag";
import { PieChart } from "@/components/charts/pie";
import { DonutChart } from "@/components/charts/DonutChart";
import { PieChart as PieChart2 } from "@/components/charts/pie";

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
      <div style={{ padding: '50px 20px 0px 90px', display: 'flex', gap: '20px', minWidth: '50vw', flexWrap: 'wrap' }}>
        <h1 className="text-4xl font-medium">Overview</h1>
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
      </div>

      {/* Pots... */}
      <div style={{ padding: '20px 20px 30px 80px', display: 'flex', gap: '20px', minWidth: '60vw', flexWrap: 'wrap' }}>
        <div className="card card-big neutral-card">
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between'}}>
            <div style={{ borderRadius: '30px 25px 25px 0px', width: '160px', height: '60px',
                          background: 'linear-gradient(0deg,rgb(180, 180, 180) 0%,rgb(231, 231, 231) 100%)',
                          padding: '17px 0px 20px 30px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'}}>
                  <p  style={{ fontSize: '1.4rem', fontWeight: '600' }}>
                    Pots
                  </p>
            </div>
            <div style={{ padding: '30px 30px 0px 0px', fontSize: '0.9rem', opacity: '.6'}}>
              See Details
              <FontAwesomeIcon icon={faCaretRight}
                style={{ marginLeft: '5px' }} />
            </div>
          </div>

          {/* Body */}
          <div style={{ display: 'flex',
                        height: '100px',
                        marginTop: '25px',
                        borderRadius: '30px'}}>
            <div style={{ display: 'flex',
                          background: 'linear-gradient(0deg,rgb(148, 148, 148) 0%,rgb(197, 197, 197) 100%)',
                          width: '160px', height: '67px',
                          margin: '20px 20px 20px 20px',
                          padding: '2px 20px 0px 15px',
                          borderRadius: '25px',
                          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'}}>
                <div style={{ display: 'flex'}}>
                  <div style={{ fontSize: '2.2rem', fontWeight: '600',
                                display: 'flex', margin: '7px 0px 0px 0px',
                                padding: '0px 0px 0px 3px', color: 'rgb(15, 145, 93)'}}>
                    $
                  </div>
                  <div style={{ width: '1px', height: '50px',
                                backgroundColor: 'grey',
                                margin: '10px 10px 0px 10px' }}>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0px', marginTop: '8px'}}>
                    <p style={{ fontSize: '0.85rem' }}>Total Saved</p>
                    <p style={{ fontSize: '1.75rem', fontWeight: '600', margin: '-6px 0px 0px 0px' }}>
                      850.00
                    </p>
                  </div>
                </div>
            </div>

            <div style={{ width: '500px', display: 'flex', flexWrap: 'wrap',
                          height: '170px', overflow: 'auto'}}>
              {/* 1 */}
              <div style={{ display: 'flex', margin: '15px', width: '105px' }}>
                <div style={{ width: '2.75px', height: '50px',
                              backgroundColor: ' #178178', borderRadius: '10px',
                              boxShadow: '0px 3px 20px rgba(0, 0, 0, 0.5)'}}>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', padding: '0px 0px 0px 10px'}}>
                  <p style={{ fontSize: '0.85rem' }}>
                    Savings
                  </p>
                  <p style={{ fontWeight: '600', fontSize: '1.30rem'}}>
                    $150.00
                  </p>
                </div>
              </div>

              {/* 2 */}
              <div style={{ display: 'flex', margin: '15px', width: '105px' }}>
                <div style={{ width: '2.75px', height: '50px',
                              backgroundColor: 'rgb(21, 176, 190)', borderRadius: '10px',
                              boxShadow: '0px 3px 20px rgba(0, 0, 0, 0.5)'}}>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', padding: '0px 0px 0px 10px'}}>
                  <p style={{ fontSize: '0.85rem' }}>
                    Gift
                  </p>
                  <p style={{ fontWeight: '600', fontSize: '1.30rem'}}>
                    $40.00
                  </p>
                </div>
              </div>

              {/* 3 */}
              <div style={{ display: 'flex', margin: '15px', width: '105px' }}>
                <div style={{ width: '2.75px', height: '50px',
                              backgroundColor: ' #AB1855', borderRadius: '10px',
                              boxShadow: '0px 3px 20px rgba(0, 0, 0, 0.5)'}}>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', padding: '0px 0px 0px 10px'}}>
                  <p style={{ fontSize: '0.85rem' }}>
                    Concert Ticket
                  </p>
                  <p style={{ fontWeight: '600', fontSize: '1.30rem'}}>
                    $40.00
                  </p>
                </div>
              </div>

              {/* 4 */}
              <div style={{ display: 'flex', margin: '15px', width: '105px' }}>
                <div style={{ width: '2.75px', height: '50px',
                              backgroundColor: ' #E26721', borderRadius: '10px',
                              boxShadow: '0px 3px 20px rgba(0, 0, 0, 0.5)'}}>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', padding: '0px 0px 0px 10px'}}>
                  <p style={{ fontSize: '0.85rem' }}>
                    New Laptop
                  </p>
                  <p style={{ fontWeight: '600', fontSize: '1.30rem'}}>
                    $40.00
                  </p>
                </div>
              </div>

              {/* 5 */}
              <div style={{ display: 'flex', margin: '15px', width: '105px' }}>
                <div style={{ width: '2.75px', height: '50px',
                              backgroundColor: ' #CC4444', borderRadius: '10px',
                              boxShadow: '0px 3px 20px rgba(0, 0, 0, 0.5)'}}>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', padding: '0px 0px 0px 10px'}}>
                  <p style={{ fontSize: '0.85rem' }}>
                    Vacations
                  </p>
                  <p style={{ fontWeight: '600', fontSize: '1.30rem'}}>
                    $40.00
                  </p>
                </div>
              </div>
            </div>

            <div style={{ border: '1px solid red',
                          width: '1px', height: '100px',
                          padding: '1px',
                          opacity: '0'}}>
            </div>
          </div>
        </div>
      </div>

      <Card
        title="Budgets"
        hasDetails={false}
        width="600px"
        height="390px">
          {/* <DonutChart /> */}
          <PieChart />
      </Card>

    </section>
  );
}
