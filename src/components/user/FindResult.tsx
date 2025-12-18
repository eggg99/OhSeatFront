import { Link, useLocation } from "react-router-dom";

export default function FindResult() {
  const { state } = useLocation();
  const email = state?.email;

  return (
    <div className="os_found_form_wrap">
      <div className="os_found_form">
        <h3><span>오싵 아이디 찾기</span></h3>

        <ul className="os_join_list">
          <li>
            <div className="found_result_wrap">
              <p>이메일 찾기가 완료되었습니다.</p>
              <p>회원님의 아이디는</p>
              <p><span>{email}</span> 입니다</p>
            </div>
          </li>
          <li>
            <Link to="/user/login">
              <button className="user_join_button">로그인 화면으로 이동하기</button>
            </Link>
          </li>
          <li>
            <Link to="/user/find-password">
              <button className="user_join_button">비밀번호 찾기</button>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}