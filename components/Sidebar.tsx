
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSun } from '@fortawesome/free-solid-svg-icons';

export default function Sidebar() {
    return (
        <section className="sidebar">
            <div style={{ display: 'flex', padding: '30px 0px 30px 20px' }}>
                <h1 style={{ fontSize: '1.3rem', fontWeight: '600'}}>
                    financeM
                </h1>
            </div>

            <ul>
                <li style={{ padding: '15px 0px 20px 20px' }}>
                    <i className="bi bi-house"
                       style={{ marginRight: '10px' }}></i>
                    Overview
                </li>
                <li style={{ padding: '0px 0px 20px 20px' }}>
                    <i className="bi bi-arrow-left-right"
                       style={{ marginRight: '10px' }}></i>
                    Transactions
                </li>
                <li style={{ padding: '0px 0px 20px 20px' }}>
                    <i className="bi bi-pie-chart"
                       style={{ marginRight: '10px' }}></i>
                    Budgets
                </li>
                <li style={{ padding: '0px 0px 20px 20px' }}>
                    <i className="bi bi-file-earmark-break"
                       style={{ marginRight: '10px' }}></i>
                    Bills
                </li>
            </ul>
        </section>
    )
}