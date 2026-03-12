import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { changePassword } from "@/apis/api/user";
import { userStore } from "@/store/userStore";

export default function ChangePw(){
  const navigate = useNavigate();
  const { userId } = userStore();
  const [inputValue, setInputValue] = useState({
    password: '',           // 새로운 비밀번호
    password2: '',          // 새로운 비밀번호 확인

    validPassword : false,  // 비밀번호 정규식 충족 여부
  });

  const [errorMessages, setErrorMessages] = useState({
    password: "",
    password2: "",
  });

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=]).{8,16}$/;

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const value = e.target.value.replace(/ /g,"") // 공백 제거된 값

    setInputValue({
      ...inputValue,
      [name] : value,
    });

    switch(name) {
      case "password" :
        const isValid = passwordRegex.test(value);
        setInputValue(prev => ({
          ...prev,
          validPassword: isValid,
        }));

        setErrorMessages(prev => ({
          ...prev,
          password: isValid ? "" : "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요",
        }));
      case "password2" :
        setErrorMessages(prev => ({
          ...prev,
          password2: inputValue.password !== value ? "비밀번호와 비밀번호확인이 같지 않아요" : "",
        }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!inputValue.validPassword){
      alert("비밀번호를 확인해주세요");
      return false;
    }
    const response = await changePassword(inputValue);
    if(!response){
      // 비밀번호 변경이 실패한 경우 : 아무 동작 안함
      return;
    } else {
      alert('비밀번호 변경이 완료되었습니다!');

      if (userId) {
        navigate('/user/mypage'); // 로그인되어 있는 사용자
      } else {
        navigate('/user/login'); // 비밀번호 찾기로 온 사용자
      }
    }
  };

  return (
    <div className="os_found_form_wrap">
      <form
        onSubmit={handleSubmit}
        className="os_found_form"
      >
        <h3><span>오싵 비밀번호 변경</span></h3>

        <ul className="os_join_list">
          <li>
            <span>새로운 비밀번호</span>
            <input
              type="password"
              placeholder="새로운 비밀번호"
              name="password"
              value={inputValue.password}
              onChange={handleInput}
            />
            {errorMessages.password &&
              <p className="alert">{errorMessages.password}</p>
            }
          </li>
          <li>
            <span>새로운 비밀번호 확인</span>
            <input
              type="password"
              placeholder="새로운 비밀번호 확인"
              name="password2"
              value={inputValue.password2}
              onChange={handleInput}
            />
            {errorMessages.password2 &&
                <p className="alert">{errorMessages.password2}</p>
            }
          </li>

          <li>
            <button
              type="submit"
              className="user_join_button"
            >
              비밀번호 변경
            </button>
          </li>
        </ul>
      </form>
    </div>
  )
}
