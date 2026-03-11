import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "@/apis/api/user";
import { userStore } from "@/store/userStore";

export default function Login(){
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = userStore();

  const [inputValue, setInputValue] = useState({
    email: '',
    password: '',
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const value = e.target.value.replace(/ /g,"")
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await loginUser(inputValue);
    if (!response) {
      return;
    } else {
      alert('로그인이 완료되었습니다!');
      setUser({
        'userId': response.userId,
        'userNick': response.nickname,
        'userEmail': response.email,
        'token':response.token,
        'isAdmin' : response?.role.toLowerCase() === 'admin',
        'isLogin':true
      })
      const params = new URLSearchParams(location.search);
      const redirectPath = params.get('redirect');
      navigate(redirectPath || '/');
    }
  }

  useEffect(() => {
    const expiredMessage = sessionStorage.getItem('auth-expired-message');

    if (!expiredMessage) {
      return;
    }

    alert(expiredMessage);
    sessionStorage.removeItem('auth-expired-message');
  }, []);

  return (
    <div className="os_login_form_wrap">
      <form
        onSubmit={handleSubmit}
        className='os_login_form'
      >
        <h3><span>오싵 로그인</span></h3>

        <ul className="os_login_list">
          <li className="key">
            <span>아이디</span>
            <input
              type="text"
              name="email"
              value={inputValue.email}
              onChange={handleInput}
              required
              placeholder="아이디를 입력하세요"/>
          </li>
          <li className="password">
            <span>비밀번호</span>
            <input
              type="password"
              name="password"
              value={inputValue.password}
              onChange={handleInput}
              required
              placeholder="비밀번호를 입력하세요"/>
          </li>
          <li>
            <button type="submit" className="user_login_button">로그인</button>
          </li>
        </ul>
        <ul className="login_plus_list">
          <li><Link to="/user/join">회원가입</Link></li>
          <li><Link to="/user/find-email">아이디찾기</Link></li>
          <li><Link to="/user/find-password">비밀번호찾기</Link></li>
        </ul>
      </form>
    </div>
  )
}




