
import Loginform from "../../components/auth/LoginForm"
import LoginNavbar from "../../components/common/LoginNavbar"


const LoginPage = () => {
    return (
        <>
            <LoginNavbar></LoginNavbar>
            <div style={styles.container}>
                <div className="row" style={styles.row}>
                    <div>
                        <Loginform />
                    </div>
                    <div>
                        <img src="/crochet-login.png" alt="crochet" width={800} height={200} style={{ borderRadius: 18 }} />
                    </div>
                </div>
            </div>
        </>

    )
}

export default LoginPage

const styles = {
    container: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
    },
    row: {
        display: 'grid',
        gridTemplateColumns: '0.6fr 1fr',
        gap: '1rem'
    },
}