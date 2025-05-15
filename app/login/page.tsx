
export default function Login() {
    return(
        <section className="login-container">
            <div style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '25px' }}>
                financeM
            </div>

            <input type="text" placeholder="username" />
            <input type="password" placeholder="password" />

            <div style={{ marginTop: '50px', color: 'white', fontWeight: '500'}}>
                <button className="button is-green">
                    <i className="bi bi-key" style={{ marginRight: '10px' }}></i>
                    <span style={{ marginRight: '12px', opacity: '0.5' }}>|</span>
                    <span>Login</span>
                </button>
            </div>
        </section>
    )
}