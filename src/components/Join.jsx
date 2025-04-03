export default function Join(){
    return(
        <form className='login-form'>
            <h1 className='title'>회원가입</h1>
            <div className='input-group'>
                <label htmlFor="name">이름</label>
                <input type="text" id="name" name="name" required />
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
            <div className='input-group'>
                <label htmlFor="nickname">닉네임</label>
                <div id="container">
                    <input type="text" id="nickname" name="nickname" required />
                    <button>전송</button>
                </div>
            </div>
            <div className='input-group'>
                <label htmlFor="password">비밀번호</label>
                <input type="password" id="password" name="password" required />
            </div>
            <div className='input-group'>
                <label htmlFor="password-confirm">비밀번호 확인</label>
                <input type="password" id="password-confirm" name="password-confirm" required />
            </div>
            <div className='input-group'>
                <label htmlFor="phone">핸드폰번호</label>
                <input type="text" id="phone" name="phone" required />
            </div>
            <div className="input-group">
                <label htmlFor="phone">프로필사진</label>
                <input type="file" id="profile" name="profile" accept="image/*" />
                <p className="note">*jpg, png, gif 파일만 업로드 가능합니다.</p>
            </div>
            <button type="submit" className="btn btn-primary">회원가입</button>
        </form>
    )
}
