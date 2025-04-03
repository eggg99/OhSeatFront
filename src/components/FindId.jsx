export default function FindId() {
    return (
        <form className='login-form'>
            <h1 className='title'>아이디 찾기</h1>
            <div className='input-group'>
                <label htmlFor="name">이름</label>
                <input type="text" id="name" name="name" required />
            </div>
            <div className='input-group'>
                <label htmlFor="phone">핸드폰번호</label>
                <input type="text" id="phone" name="phone" required />
            </div>
            <button type="submit" className="btn btn-primary">아이디 찾기</button>
        </form>
    )
}