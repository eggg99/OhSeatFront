import TextField from '@mui/material/TextField';
import '../styles/login.scss';
function Login(){
    return(
        <main className="App_main">
            <div className='login-wrapper'>
                <form className='login-form'>
                    <h1 className='title'>로그인</h1>
                    <TextField
                        required
                        id="standard-required"
                        label="아이디"
                        variant="outlined"
                    />
                    <button type="submit" className="btn">Login</button>
                </form>
            </div>
        </main>
    )
}

export default Login;