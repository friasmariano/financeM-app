
export default function TotalTag() {
    return (
        <section>
            <div style={{ display: 'flex',
                          background: 'var(--card-header-gradient)',
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
        </section>
    );
}