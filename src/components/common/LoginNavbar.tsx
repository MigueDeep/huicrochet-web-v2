

const LoginNavbar = () => {
    return (
        <div className="login-navbar d-flex align-items-center">
            <div className="login-navbar__logo">
                <img src="/logo.png" alt="logo" width={80} height={80} className="ms-4"/>
            </div>
            <div className="login-navbar__title">
                <h1 className="ms-2 text-wine" style={{fontSize: 18, fontWeight: "bold"}}>HUICROCHET</h1>
            </div>
        </div>
    )
}

export default LoginNavbar

