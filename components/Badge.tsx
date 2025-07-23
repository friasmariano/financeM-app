

export default function Badge({ count } : { count: number }) {
    return (
        <div>
            <div style={{ width: '200px', height: '60px',
                        background: 'var(--blue-card-gradient)',
                        borderRadius: '10px',
                        display: 'flex',
                        justifyContent: 'space-between'}}>
                <div style={{ display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center' }}>
                <p style={{ fontSize: '1.5rem',
                            padding: '0px 0px 0px 30px' }}>Total</p>
                </div>
                <div className="is-red"
                    style={{ width: '50px', height: '50px',
                            borderRadius: '50%',
                            margin: '-15px -10px 0px 0px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontWeight: '600',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
                {  count > 0 ? count : '0' }
                </div>
            </div>
            <div></div>
        </div>
    )
}