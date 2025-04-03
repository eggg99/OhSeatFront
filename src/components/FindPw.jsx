export default function FindPw(){
    return (
        <form className='login-form'>
            <h1 className='title'>비밀번호 찾기</h1>
            <div className='input-group'>
                <label htmlFor="name">이름</label>
                <input type="text" id="name" name="name" required />
            </div>
            <div className='input-group'>
                <label htmlFor="phone">핸드폰번호</label>
                <input type="text" id="phone" name="phone" required />
            </div>
            <div className='input-group'>
                <label htmlFor="email">이메일</label>
                <div id="container">
                    <input type="text" id="email" name="email" required />
                    <button>전송</button>
                </div>
            </div>
            <div className='input-group'>
                <label htmlFor="email_otp">인증번호</label>
                <div id="container">
                    <input type="text" id="email_otp" name="email_otp" required />
                    <button>전송</button>
                </div>
            </div>
            <button type="submit" className="btn btn-primary">비밀번호 찾기</button>
        </form>
    )
}