
export default function Sidebar() {
    return (
        <section className="sidebar">
            <div style={{ display: 'flex', padding: '30px 0px 30px 20px' }}>
                <h1 style={{ fontSize: '1.3rem', fontWeight: '600'}}>
                    financeM
                </h1>
            </div>

            <ul>
                <li style={{ padding: '15px 0px 20px 20px' }}>Overview</li>
                <li style={{ padding: '0px 0px 20px 20px' }}>Transactions</li>
                <li style={{ padding: '0px 0px 20px 20px' }}>Budgets</li>
                <li style={{ padding: '0px 0px 20px 20px' }}>Bills</li>
            </ul>
        </section>
    )
}